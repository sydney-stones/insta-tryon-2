/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

const ANALYTICS_STORAGE_KEY = 'tryOnAnalytics';

export interface TryOnEvent {
  timestamp: number; // Unix timestamp
  outfitId: string;
  outfitName: string;
  date: string; // YYYY-MM-DD format for easy grouping
}

export interface OutfitAnalytics {
  outfitId: string;
  outfitName: string;
  tryOnCount: number;
  lastTryOn: number; // timestamp
}

export interface AnalyticsSummary {
  totalTryOns: number;
  uniqueOutfits: number;
  mostPopularOutfits: OutfitAnalytics[];
  tryOnsByDate: Record<string, number>; // date -> count
  recentEvents: TryOnEvent[];
}

/**
 * Get all analytics data from localStorage
 */
const getAnalyticsData = (): TryOnEvent[] => {
  try {
    const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading analytics:', e);
  }
  return [];
};

/**
 * Save analytics data to localStorage
 */
const saveAnalyticsData = (events: TryOnEvent[]): void => {
  try {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Error saving analytics:', e);
  }
};

/**
 * Get today's date in YYYY-MM-DD format
 */
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Log a try-on event
 */
export const logTryOnEvent = (outfitId: string, outfitName: string): void => {
  const events = getAnalyticsData();
  const newEvent: TryOnEvent = {
    timestamp: Date.now(),
    outfitId,
    outfitName,
    date: getTodayDate()
  };
  events.push(newEvent);
  saveAnalyticsData(events);
};

/**
 * Get comprehensive analytics summary
 */
export const getAnalyticsSummary = (): AnalyticsSummary => {
  const events = getAnalyticsData();

  // Total try-ons
  const totalTryOns = events.length;

  // Group by outfit
  const outfitMap = new Map<string, OutfitAnalytics>();
  events.forEach(event => {
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

  // Unique outfits
  const uniqueOutfits = outfitMap.size;

  // Most popular outfits (sorted by count)
  const mostPopularOutfits = Array.from(outfitMap.values())
    .sort((a, b) => b.tryOnCount - a.tryOnCount);

  // Try-ons by date
  const tryOnsByDate: Record<string, number> = {};
  events.forEach(event => {
    tryOnsByDate[event.date] = (tryOnsByDate[event.date] || 0) + 1;
  });

  // Recent events (last 20)
  const recentEvents = events.slice(-20).reverse();

  return {
    totalTryOns,
    uniqueOutfits,
    mostPopularOutfits,
    tryOnsByDate,
    recentEvents
  };
};

/**
 * Get analytics for a specific date range
 */
export const getAnalyticsForDateRange = (startDate: string, endDate: string): TryOnEvent[] => {
  const events = getAnalyticsData();
  return events.filter(event => event.date >= startDate && event.date <= endDate);
};

/**
 * Get try-ons for the last N days
 */
export const getRecentTryOns = (days: number): Record<string, number> => {
  const events = getAnalyticsData();
  const result: Record<string, number> = {};
  const now = new Date();

  // Initialize last N days
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result[dateStr] = 0;
  }

  // Count events
  events.forEach(event => {
    if (result.hasOwnProperty(event.date)) {
      result[event.date]++;
    }
  });

  return result;
};

/**
 * Clear all analytics data (for testing)
 */
export const clearAnalytics = (): void => {
  localStorage.removeItem(ANALYTICS_STORAGE_KEY);
};

/**
 * Get average try-ons per day
 */
export const getAverageTryOnsPerDay = (): number => {
  const events = getAnalyticsData();
  if (events.length === 0) return 0;

  const dates = new Set(events.map(e => e.date));
  return events.length / dates.size;
};
