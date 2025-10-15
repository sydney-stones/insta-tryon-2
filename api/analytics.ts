/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

const ANALYTICS_KEY = 'analytics:events';

// Type for analytics event
interface AnalyticsEvent {
  timestamp: number;
  outfitId: string;
  outfitName: string;
  date: string;
}

// Fallback in-memory storage when KV is not available
let memoryStorage: AnalyticsEvent[] = [];

// Check if KV is available
async function getKV() {
  try {
    const { kv } = await import('@vercel/kv');
    // Test if KV is properly configured
    await kv.ping();
    return kv;
  } catch (error) {
    console.log('KV not available, using in-memory storage');
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
      const { outfitId, outfitName } = req.body;

      if (!outfitId || !outfitName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const event: AnalyticsEvent = {
        timestamp: Date.now(),
        outfitId,
        outfitName,
        date: new Date().toISOString().split('T')[0]
      };

      const kvStore = await getKV();

      if (kvStore) {
        // Use KV storage (persistent)
        const existingEvents = await kvStore.get<AnalyticsEvent[]>(ANALYTICS_KEY) || [];
        existingEvents.push(event);

        // Keep only last 10000 events to prevent storage issues
        if (existingEvents.length > 10000) {
          existingEvents.splice(0, existingEvents.length - 10000);
        }

        await kvStore.set(ANALYTICS_KEY, existingEvents);
      } else {
        // Use in-memory storage (fallback)
        memoryStorage.push(event);

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
      const kvStore = await getKV();
      let events: AnalyticsEvent[];

      if (kvStore) {
        // Use KV storage (persistent)
        events = await kvStore.get<AnalyticsEvent[]>(ANALYTICS_KEY) || [];
      } else {
        // Use in-memory storage (fallback)
        events = memoryStorage;
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

      return res.status(200).json({
        totalTryOns,
        uniqueOutfits: outfitMap.size,
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
