/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link
    const subject = encodeURIComponent('Demo Request from ' + name);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:mail@renderedfits.com?subject=${subject}&body=${body}`;
    setSent(true);

    // Reset form after a delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSent(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#444833] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a href="/" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            RENDERED FITS™
          </a>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-gray-900 mb-6 text-center">
            Book a Demo
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Get in touch with us to schedule a demo and see how virtual try-on can transform your e-commerce business.
          </p>

          {sent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center"
            >
              <p className="text-green-800 font-medium">
                Opening your email client... If it doesn't open automatically, please email us at{' '}
                <a href="mailto:mail@renderedfits.com" className="underline">
                  mail@renderedfits.com
                </a>
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl border border-gray-200">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#444833] focus:border-transparent transition-all"
                placeholder="John Smith"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#444833] focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#444833] focus:border-transparent transition-all resize-none"
                placeholder="Tell us about your business and what you'd like to learn about virtual try-on..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#444833] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#3a3d2d] transition-all"
            >
              Send Message
            </button>

            <p className="text-sm text-gray-500 text-center">
              Or email us directly at{' '}
              <a href="mailto:mail@renderedfits.com" className="text-[#444833] underline font-medium">
                mail@renderedfits.com
              </a>
            </p>
          </form>

          {/* Calendly Booking Option */}
          <div className="mt-10 bg-[#444833] rounded-2xl p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-serif italic text-white mb-3">
              Prefer to book directly?
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Skip the form and schedule a 15-minute call at a time that suits you.
            </p>
            <a
              href="https://calendly.com/mail-renderedfits/15-minute-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#444833] px-10 py-4 rounded-lg font-semibold text-base hover:bg-gray-100 transition-all"
            >
              Book a 15-Minute Meeting
            </a>
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
