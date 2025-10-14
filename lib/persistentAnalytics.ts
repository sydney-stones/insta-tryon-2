/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

const API_URL = '/api/analytics';

export interface PersistentTryOnEvent {
  timestamp: number;
  outfitId: string;
  outfitName: string;
  date: string;
}

export interface PersistentAnalyticsSummary {
  totalTryOns: number;
  uniqueOutfits: number;
  mostPopularOutfits: Array<{
    outfitId: string;
    outfitName: string;
    tryOnCount: number;
    lastTryOn: number;
  }>;
  tryOnsByDate: Record<string, number>;
  recentEvents: PersistentTryOnEvent[];
}

/**
 * Log a try-on event to the persistent backend
 */
export const logPersistentTryOnEvent = async (outfitId: string, outfitName: string): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ outfitId, outfitName }),
    });

    if (!response.ok) {
      console.error('Failed to log try-on event to backend');
    }
  } catch (error) {
    console.error('Error logging try-on event:', error);
    // Don't throw - we don't want to break the user experience if analytics fails
  }
};

/**
 * Get persistent analytics summary from backend
 */
export const getPersistentAnalyticsSummary = async (): Promise<PersistentAnalyticsSummary | null> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error('Failed to fetch analytics from backend');
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
};
