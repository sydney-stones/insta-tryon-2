/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory storage for demo (will reset on each deployment)
// For production, you'd use Vercel KV, Upstash Redis, or a database
let analyticsData: {
  events: Array<{
    timestamp: number;
    outfitId: string;
    outfitName: string;
    date: string;
  }>;
} = {
  events: []
};

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

      const event = {
        timestamp: Date.now(),
        outfitId,
        outfitName,
        date: new Date().toISOString().split('T')[0]
      };

      analyticsData.events.push(event);

      // Keep only last 10000 events to prevent memory issues
      if (analyticsData.events.length > 10000) {
        analyticsData.events = analyticsData.events.slice(-10000);
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
      // Calculate summary
      const totalTryOns = analyticsData.events.length;

      // Group by outfit
      const outfitMap = new Map<string, { outfitId: string; outfitName: string; tryOnCount: number; lastTryOn: number }>();

      analyticsData.events.forEach(event => {
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
      analyticsData.events.forEach(event => {
        tryOnsByDate[event.date] = (tryOnsByDate[event.date] || 0) + 1;
      });

      // Recent events
      const recentEvents = analyticsData.events.slice(-20).reverse();

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
