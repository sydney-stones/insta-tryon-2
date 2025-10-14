/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

const STORAGE_KEY = 'virtualTryOnUsage';
const MODEL_STORAGE_KEY = 'userGeneratedModel';
const DAILY_LIMIT = 5; // Max try-ons per day

interface TryOnUsage {
  date: string; // Format: YYYY-MM-DD
  count: number;
}

/**
 * Get today's date in YYYY-MM-DD format
 */
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Get current usage from localStorage
 */
const getUsage = (): TryOnUsage => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const usage: TryOnUsage = JSON.parse(stored);
      const today = getTodayDate();

      // Reset count if it's a new day
      if (usage.date !== today) {
        return { date: today, count: 0 };
      }

      return usage;
    }
  } catch (e) {
    console.error('Error reading try-on usage:', e);
  }

  // Default to today with 0 count
  return { date: getTodayDate(), count: 0 };
};

/**
 * Save usage to localStorage
 */
const saveUsage = (usage: TryOnUsage): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  } catch (e) {
    console.error('Error saving try-on usage:', e);
  }
};

/**
 * Check if user can perform another try-on
 */
export const canUseTryOn = (): boolean => {
  const usage = getUsage();
  return usage.count < DAILY_LIMIT;
};

/**
 * Get remaining try-ons for today
 */
export const getRemainingTryOns = (): number => {
  const usage = getUsage();
  return Math.max(0, DAILY_LIMIT - usage.count);
};

/**
 * Get total daily limit
 */
export const getDailyLimit = (): number => {
  return DAILY_LIMIT;
};

/**
 * Increment try-on usage count
 */
export const incrementTryOnUsage = (): void => {
  const usage = getUsage();
  usage.count += 1;
  saveUsage(usage);
};

/**
 * Check if user has reached the limit
 */
export const hasReachedLimit = (): boolean => {
  return !canUseTryOn();
};

/**
 * Reset usage (for testing purposes)
 */
export const resetUsage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Save the generated model for reuse
 */
export const saveGeneratedModel = (modelImageUrl: string): void => {
  try {
    const data = {
      modelImageUrl,
      date: getTodayDate(),
      timestamp: Date.now()
    };
    localStorage.setItem(MODEL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving generated model:', e);
  }
};

/**
 * Get the saved model if it exists and is from today
 */
export const getSavedModel = (): string | null => {
  try {
    const stored = localStorage.getItem(MODEL_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      const today = getTodayDate();

      // Only return the model if it's from today
      if (data.date === today) {
        return data.modelImageUrl;
      } else {
        // Clear old model
        localStorage.removeItem(MODEL_STORAGE_KEY);
      }
    }
  } catch (e) {
    console.error('Error reading saved model:', e);
  }
  return null;
};

/**
 * Clear saved model
 */
export const clearSavedModel = (): void => {
  localStorage.removeItem(MODEL_STORAGE_KEY);
};
