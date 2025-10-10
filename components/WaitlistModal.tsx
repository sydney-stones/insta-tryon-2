/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const handleJoinWaitlist = () => {
    window.open('https://rendered-fits.notion.site/Join-The-Waitlist-288b13a8912780d89d3ff88f3085ba22?pvs=74', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Demo Limit Reached
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                You've used all 3 demo generations. Want unlimited virtual try-on?
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 text-left">
                  <svg className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">Unlimited generations</p>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <svg className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">Advanced features & customization</p>
                </div>
                <div className="flex items-start gap-3 text-left">
                  <svg className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-gray-700">Priority support & early access</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleJoinWaitlist}
                  className="w-full px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Join the Waitlist
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-8 py-3 text-base font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
