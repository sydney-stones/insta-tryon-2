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
  sessionId?: string;
  userAgent?: string;
  referrer?: string;
}

export interface PersistentAnalyticsSummary {
  totalTryOns: number;
  uniqueOutfits: number;
  uniqueSessions: number;
  conversionRate: number;
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
 * Get or create a session ID
 */
const getSessionId = (): string => {
  const SESSION_KEY = 'analytics_session_id';
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      const { id, timestamp } = JSON.parse(stored);
      // Check if session is still valid
      if (Date.now() - timestamp < SESSION_DURATION) {
        // Update timestamp to extend session
        localStorage.setItem(SESSION_KEY, JSON.stringify({ id, timestamp: Date.now() }));
        return id;
      }
    }
  } catch (e) {
    // Ignore errors
  }

  // Create new session
  const newSessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: newSessionId, timestamp: Date.now() }));
  } catch (e) {
    // Ignore errors
  }
  return newSessionId;
};

/**
 * Log a try-on event to the persistent backend
 */
export const logPersistentTryOnEvent = async (outfitId: string, outfitName: string): Promise<void> => {
  try {
    const sessionId = getSessionId();

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ outfitId, outfitName, sessionId }),
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
