/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { getPersistentAnalyticsSummary, PersistentAnalyticsSummary } from '../lib/persistentAnalytics';

const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<PersistentAnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load analytics data from persistent API
    const loadAnalytics = async () => {
      setLoading(true);
      const summary = await getPersistentAnalyticsSummary();
      setAnalytics(summary);
      setLoading(false);
    };

    loadAnalytics();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // Calculate average try-ons per day
  const dates = Object.keys(analytics.tryOnsByDate);
  const avgPerDay = dates.length > 0
    ? analytics.totalTryOns / dates.length
    : 0;

  // Get last 7 days of data for chart
  const last7Days: Record<string, number> = {};
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    last7Days[dateStr] = analytics.tryOnsByDate[dateStr] || 0;
  }

  // Calculate max for chart scaling
  const maxTryOns = Math.max(...Object.values(last7Days), 1);

  // Get sorted dates for chart
  const sortedDates = Object.keys(last7Days).sort();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your virtual try-on performance and engagement</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Try-Ons */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Try-Ons</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalTryOns}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">All-time virtual try-ons</p>
          </div>

          {/* Unique Outfits */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Unique Outfits</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.uniqueOutfits}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Different outfits tried</p>
          </div>

          {/* Average Per Day */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Average Per Day</p>
                <p className="text-3xl font-bold text-gray-900">{avgPerDay.toFixed(1)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Try-ons per active day</p>
          </div>
        </div>

        {/* Last 7 Days Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Last 7 Days Activity</h2>
          <div className="flex items-end justify-between gap-2 h-48">
            {sortedDates.map(date => {
              const count = last7Days[date];
              const height = maxTryOns > 0 ? (count / maxTryOns) * 100 : 0;
              const dateObj = new Date(date + 'T00:00:00');
              const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

              return (
                <div key={date} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex items-end justify-center mb-2" style={{ height: '150px' }}>
                    <div
                      className="w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600 relative group"
                      style={{ height: `${height}%`, minHeight: count > 0 ? '8px' : '0' }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {count} try-on{count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{dayName}</p>
                  <p className="text-xs text-gray-400">{dateObj.getDate()}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Most Popular Outfits */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Outfits</h2>
            {analytics.mostPopularOutfits.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No try-on data yet</p>
            ) : (
              <div className="space-y-3">
                {analytics.mostPopularOutfits.slice(0, 10).map((outfit, index) => {
                  const percentage = analytics.totalTryOns > 0
                    ? ((outfit.tryOnCount / analytics.totalTryOns) * 100).toFixed(1)
                    : '0';

                  return (
                    <div key={outfit.outfitId} className="flex items-center gap-3">
                      {/* Rank Badge */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-700' :
                        index === 1 ? 'bg-gray-200 text-gray-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>

                      {/* Outfit Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{outfit.outfitName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{percentage}%</span>
                        </div>
                      </div>

                      {/* Count */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-lg font-bold text-gray-900">{outfit.tryOnCount}</p>
                        <p className="text-xs text-gray-500">try-ons</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            {analytics.recentEvents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No activity yet</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {analytics.recentEvents.map((event, index) => {
                  const date = new Date(event.timestamp);
                  const timeAgo = getTimeAgo(event.timestamp);

                  return (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{event.outfitName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{timeAgo}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Empty State Message */}
        {analytics.totalTryOns === 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
            <svg className="w-16 h-16 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analytics Data Yet</h3>
            <p className="text-gray-600">
              Analytics will appear here once users start trying on outfits. Use the "Unlimited Try-On" feature to test!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Helper function to get human-readable time ago
 */
function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

export default AnalyticsDashboard;
