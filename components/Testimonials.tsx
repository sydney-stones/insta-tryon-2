/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    quote: "Studies have shown that virtual Try-On technology can boost sales by up to 30% and reduce returns by 20%.",
    source: "Forbes",
    icon: "📈"
  },
  {
    quote: "Allowing ecommerce customers to try on clothes virtually via an augmented reality app can increase sales and reduce returns.",
    source: "Shopify",
    url: "shopify.com",
    icon: "🛍️"
  },
  {
    quote: "55% of online apparel shoppers have returned an item because it looked different on them than expected, and 42% say they don't feel represented by images of models while shopping for clothes.",
    source: "Lilian Rincon, Senior Director of Consumer Shopping Product, Google",
    icon: "👔"
  }
];

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 0.5; // Adjust speed here

        // Reset scroll when we've scrolled through one set of testimonials
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }

        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
          Industry Insights
        </h2>
        <p className="text-gray-600 text-center text-sm sm:text-base">
          What leading experts say about virtual try-on technology
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[90%] sm:w-[500px] bg-white rounded-xl shadow-lg p-6 sm:p-8 mx-3"
          >
            <div className="text-4xl mb-4">{testimonial.icon}</div>
            <blockquote className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
              "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <cite className="not-italic font-medium">
                {testimonial.source}
                {testimonial.url && (
                  <span className="text-gray-400 ml-1">({testimonial.url})</span>
                )}
              </cite>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          Hover to pause • Auto-scrolling testimonials
        </p>
      </div>
    </div>
  );
};

export default Testimonials;
