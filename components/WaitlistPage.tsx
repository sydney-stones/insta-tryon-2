/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const WaitlistPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            Turn Your Style Into Sales
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-4">
            Calling all fashion creators - want to boost your affiliate revenue by 3x?
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            This virutal try on platform seemlessly integrates with LikeToKnow.it, ShopMy, and all major affiliate platforms
          </p>
          <div className="flex justify-center">
            <a
              href="https://tally.so/r/mV2g4g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 transition-all hover:scale-105 shadow-xl"
            >
              Join the Waitlist
            </a>
          </div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Benefit 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Boost Conversion Rates
            </h3>
            <p className="text-gray-600 leading-relaxed">
              When your followers can see themselves wearing your curated outfits, they're <strong>3x more likely to click your affiliate links</strong> and make a purchase.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Increase Affiliate Revenue
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Higher engagement + better conversion = <strong>more affiliate commissions</strong>. Turn your styling expertise into consistent income.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Build Deeper Engagement
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Create an <strong>interactive shopping experience</strong> that keeps your audience coming back. Stand out from other influencers.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Easy Integration
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Works seamlessly with <strong>LikeToKnow.it, ShopMy</strong>, and all major affiliate platforms. No technical skills required.
            </p>
          </div>

          {/* Benefit 5 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AI-Powered Technology
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Cutting-edge AI creates <strong>realistic virtual try-ons</strong> in seconds. Your followers will love the experience.
            </p>
          </div>

          {/* Benefit 6 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Own Your Brand
            </h3>
            <p className="text-gray-600 leading-relaxed">
              <strong>Your custom domain, your branding.</strong> Create a professional shopping destination that's uniquely yours.
            </p>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-900 rounded-3xl p-8 sm:p-12 mb-16 text-white"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Upload Your Outfits</h3>
              <p className="text-gray-300">
                Add photos of your styled looks with your affiliate links
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Followers Try On</h3>
              <p className="text-gray-300">
                Your audience uploads a selfie and sees themselves in your outfits
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Earn Commissions</h3>
              <p className="text-gray-300">
                They love what they see and click your affiliate links to purchase
              </p>
            </div>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 max-w-3xl">
            <p className="text-2xl sm:text-3xl font-serif text-gray-900 mb-4">
              "Virtual try-on is the future of fashion e-commerce"
            </p>
            <p className="text-gray-600">
              Join the waitlist and be among the first influencers to offer this game-changing experience to your followers
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              Ready to Transform Your Influence?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Limited spots available for our beta launch. Join the waitlist today and get early access + exclusive founding member benefits.
            </p>

            <a
              href="https://tally.so/r/mV2g4g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
            >
              Join the Waitlist
            </a>

            <p className="text-sm text-gray-500 mt-6">
              Early bird pricing for waitlist members
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default WaitlistPage;
