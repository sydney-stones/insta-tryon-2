/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';

const ANALYTICS_KEY = 'analytics:events';

// Type for analytics event
interface AnalyticsEvent {
  timestamp: number;
  outfitId: string;
  outfitName: string;
  date: string;
  sessionId?: string;
  userAgent?: string;
  referrer?: string;
}

// Fallback in-memory storage when Redis is not available
let memoryStorage: AnalyticsEvent[] = [];

// Redis client singleton
let redisClient: any = null;

// Get or create Redis connection
async function getRedis() {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  try {
    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
      console.log('REDIS_URL not configured, using in-memory storage');
      return null;
    }

    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 3) return new Error('Max reconnection attempts reached');
          return Math.min(retries * 100, 3000);
        }
      }
    });

    redisClient.on('error', (err: any) => {
      console.error('Redis Client Error:', err);
    });

    await redisClient.connect();
    console.log('Connected to Redis successfully');
    return redisClient;
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    redisClient = null;
    return null;
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // Log a new try-on event
    try {
      const { outfitId, outfitName, sessionId } = req.body;

      if (!outfitId || !outfitName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const event: AnalyticsEvent = {
        timestamp: Date.now(),
        outfitId,
        outfitName,
        date: new Date().toISOString().split('T')[0],
        sessionId: sessionId || undefined,
        userAgent: req.headers['user-agent'] || undefined,
        referrer: req.headers['referer'] || undefined
      };

      const redis = await getRedis();

      if (redis) {
        try {
          // Use Redis storage (persistent)
          const existingData = await redis.get(ANALYTICS_KEY);
          const existingEvents: AnalyticsEvent[] = existingData ? JSON.parse(existingData) : [];
          existingEvents.push(event);

          // Keep only last 10000 events to prevent storage issues
          if (existingEvents.length > 10000) {
            existingEvents.splice(0, existingEvents.length - 10000);
          }

          await redis.set(ANALYTICS_KEY, JSON.stringify(existingEvents));
          console.log('Event saved to Redis:', event.outfitName);
        } catch (redisError) {
          console.error('Redis operation failed, falling back to memory:', redisError);
          // Fallback to memory storage
          memoryStorage.push(event);
          if (memoryStorage.length > 10000) {
            memoryStorage = memoryStorage.slice(-10000);
          }
        }
      } else {
        // Use in-memory storage (fallback)
        memoryStorage.push(event);
        console.log('Event saved to memory (Redis unavailable):', event.outfitName);

        // Keep only last 10000 events
        if (memoryStorage.length > 10000) {
          memoryStorage = memoryStorage.slice(-10000);
        }
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error logging event:', error);
      return res.status(500).json({ error: 'Failed to log event' });
    }
  }

  if (req.method === 'GET') {
    // Get analytics data
    try {
      const redis = await getRedis();
      let events: AnalyticsEvent[] = [];

      if (redis) {
        try {
          // Use Redis storage (persistent)
          const data = await redis.get(ANALYTICS_KEY);
          events = data ? JSON.parse(data) : [];
          console.log(`Retrieved ${events.length} events from Redis`);
        } catch (redisError) {
          console.error('Redis get failed, falling back to memory:', redisError);
          events = memoryStorage;
        }
      } else {
        // Use in-memory storage (fallback)
        events = memoryStorage;
        console.log(`Retrieved ${events.length} events from memory`);
      }

      // Calculate summary
      const totalTryOns = events.length;

      // Group by outfit
      const outfitMap = new Map<string, { outfitId: string; outfitName: string; tryOnCount: number; lastTryOn: number }>();

      events.forEach((event: AnalyticsEvent) => {
        const existing = outfitMap.get(event.outfitId);
        if (existing) {
          existing.tryOnCount++;
          existing.lastTryOn = Math.max(existing.lastTryOn, event.timestamp);
        } else {
          outfitMap.set(event.outfitId, {
            outfitId: event.outfitId,
            outfitName: event.outfitName,
            tryOnCount: 1,
            lastTryOn: event.timestamp
          });
        }
      });

      // Sort by count
      const mostPopularOutfits = Array.from(outfitMap.values())
        .sort((a, b) => b.tryOnCount - a.tryOnCount);

      // Try-ons by date
      const tryOnsByDate: Record<string, number> = {};
      events.forEach((event: AnalyticsEvent) => {
        tryOnsByDate[event.date] = (tryOnsByDate[event.date] || 0) + 1;
      });

      // Recent events
      const recentEvents = events.slice(-20).reverse();

      // Calculate unique sessions
      const uniqueSessions = new Set(events.filter(e => e.sessionId).map(e => e.sessionId)).size;

      // Calculate conversion rate (try-ons / sessions)
      const conversionRate = uniqueSessions > 0 ? (totalTryOns / uniqueSessions) : 0;

      return res.status(200).json({
        totalTryOns,
        uniqueOutfits: outfitMap.size,
        uniqueSessions,
        conversionRate,
        mostPopularOutfits,
        tryOnsByDate,
        recentEvents
      });
    } catch (error) {
      console.error('Error getting analytics:', error);
      return res.status(500).json({ error: 'Failed to get analytics' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
