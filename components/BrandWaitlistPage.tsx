/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const BrandWaitlistPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full">
              For Shopify E-Commerce Brands
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Virtual Try-On That
            <span className="block text-indigo-400">Converts Browsers Into Buyers</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Reduce returns by ~40%. Increase conversions by 30%. Give your customers confidence before they click "buy".
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://tally.so/r/mOOqZ7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-indigo-700 transition-all hover:scale-105 shadow-xl"
            >
              Join the Waitlist
            </a>
            <a
              href="/demo"
              className="inline-block border-2 border-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition-colors"
            >
              See How It Works
            </a>
          </div>
        </motion.div>
      </div>

      {/* Statistics Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-800/50 border-y border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-indigo-400 mb-2">30%</p>
              <p className="text-gray-300">Higher conversion rate with virtual try-on</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-400 mb-2">20%</p>
              <p className="text-gray-300">Reduction in product returns</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-400 mb-2">20%</p>
              <p className="text-gray-300">Increase in average order value</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* The Problem Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
            The Problem With Online Fashion
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your customers are hesitant to buy because they can't see how your products look on them.
            This leads to abandoned carts, high return rates, and lost revenue.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-8"
          >
            <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">High Return Rates</h3>
            <p className="text-gray-400">
              30-40% of online fashion purchases are returned because items don't fit or look as expected
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-8"
          >
            <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Purchase Hesitation</h3>
            <p className="text-gray-400">
              Customers abandon carts because they're unsure how products will look on their body type
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-8"
          >
            <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Lost Revenue</h3>
            <p className="text-gray-400">
              Returns cost retailers billions annually in shipping, processing, and lost sales
            </p>
          </motion.div>
        </div>
      </div>

      {/* The Solution Section */}
      <div className="bg-gradient-to-b from-indigo-900/20 to-transparent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
              Introducing AI-Powered Virtual Try-On
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let your customers see themselves wearing your products before they buy.
              Build confidence, reduce returns, and boost your bottom line.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8"
            >
              <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Results</h3>
              <p className="text-gray-400">
                Customers upload a photo and see realistic try-on results in seconds using advanced AI
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8"
            >
              <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Integration</h3>
              <p className="text-gray-400">
                Works seamlessly with Shopify, WooCommerce, Magento, and custom platforms via simple API
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8"
            >
              <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">White-Label Solution</h3>
              <p className="text-gray-400">
                Fully customizable to match your brand identity. Your logo, your colors, your domain
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8"
            >
              <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Analytics Dashboard</h3>
              <p className="text-gray-400">
                Track engagement, conversion rates, and ROI with comprehensive analytics and reporting
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8"
            >
              <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-gray-400">
                Customer photos are processed securely and never stored. GDPR and CCPA compliant
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8"
            >
              <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Proven ROI</h3>
              <p className="text-gray-400">
                Our clients see an average 30% increase in conversion rates and 40% decrease in returns
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get up and running in minutes, not months
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-2xl font-bold mb-4">Integrate</h3>
            <p className="text-gray-400">
              Add our plugin to your e-commerce platform or integrate via API. Takes less than an hour.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-2xl font-bold mb-4">Customize</h3>
            <p className="text-gray-400">
              Configure branding, upload product images, and customize the user experience to match your brand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-2xl font-bold mb-4">Launch & Grow</h3>
            <p className="text-gray-400">
              Go live and watch your conversions soar. Monitor performance with real-time analytics.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-gray-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
              Perfect For
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">👗</div>
              <h3 className="text-lg font-bold mb-2">Fashion Retailers</h3>
              <p className="text-gray-400 text-sm">Clothing, accessories, footwear</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-lg font-bold mb-2">Marketplaces</h3>
              <p className="text-gray-400 text-sm">Multi-brand platforms</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🏋️</div>
              <h3 className="text-lg font-bold mb-2">Activewear</h3>
              <p className="text-gray-400 text-sm">Sportswear, athleisure</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 sm:p-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold mb-6">
            Ready to Transform Your E-Commerce?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join leading fashion brands using virtual try-on to boost conversions and reduce returns.
            Limited beta spots available.
          </p>
          <a
            href="https://tally.so/r/mOOqZ7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
          >
            Join the Waitlist
          </a>
          <p className="text-sm text-indigo-200 mt-6">
            Early adopter pricing • Priority onboarding
          </p>
        </motion.div>
      </div>

      {/* Footer Spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default BrandWaitlistPage;
