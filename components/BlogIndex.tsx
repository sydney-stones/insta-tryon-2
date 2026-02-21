/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allPosts } from '../blog/posts/index';
import { BlogPost } from '../blog/types';

const getExcerpt = (markdown: string): string => {
  // Strip markdown syntax and grab the first 2 sentences of body text
  const plain = markdown
    .replace(/#{1,6}\s+.+/g, '')         // headings
    .replace(/\*\*(.+?)\*\*/g, '$1')     // bold
    .replace(/\*(.+?)\*/g, '$1')         // italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
    .replace(/`(.+?)`/g, '$1')           // inline code
    .replace(/---/g, '')                  // hr
    .replace(/\n{2,}/g, ' ')             // collapse newlines
    .trim();

  const sentences = plain.match(/[^.!?]*[.!?]+/g) || [];
  return sentences.slice(0, 2).join(' ').trim();
};

const formatDate = (iso: string): string => {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const BlogIndex: React.FC = () => {
  useEffect(() => {
    document.title = 'Blog | Rendered Fits — AI Virtual Try-On for Fashion Brands';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Expert guides, research, and insights on AI virtual try-on technology for Shopify fashion brands. Reduce returns, increase conversions, and delight customers.');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-gray-100 bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Rendered Fits Journal</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            AI Virtual Try-On:<br />Guides, Research & Insights
          </h1>
          <p className="text-lg text-gray-600">
            Expert content for Shopify fashion brands looking to reduce returns, lift conversions, and give shoppers the confidence to buy.
          </p>
        </div>
      </div>

      {/* Post List */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-10">
          {allPosts.map((post: BlogPost) => (
            <article key={post.slug} className="group border-b border-gray-100 pb-10 last:border-0">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">{post.category}</span>
                {post.pillar && (
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium">Pillar</span>
                )}
              </div>
              <Link to={`/blog/${post.slug}`} className="block group-hover:no-underline">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors leading-snug">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {getExcerpt(post.content)}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>{post.author}</span>
                  <span>·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span>{post.reading_time} min read</span>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {allPosts.length === 0 && (
          <p className="text-gray-500 text-center py-12">No posts yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
};

export default BlogIndex;
