/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getRelatedPosts } from '../blog/posts/index';
import { BlogPost as BlogPostType } from '../blog/types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatDate = (iso: string): string => {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

/** Extract H2 and H3 headings from markdown for table of contents */
const extractToc = (markdown: string): Array<{ level: 2 | 3; text: string; id: string }> => {
  const lines = markdown.split('\n');
  const headings: Array<{ level: 2 | 3; text: string; id: string }> = [];
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    if (h2) {
      const text = h2[1].trim();
      headings.push({ level: 2, text, id: slugifyHeading(text) });
    } else if (h3) {
      const text = h3[1].trim();
      headings.push({ level: 3, text, id: slugifyHeading(text) });
    }
  }
  return headings;
};

const slugifyHeading = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

/**
 * Auto-detect FAQ section in markdown.
 * Looks for ## FAQ or ## Frequently Asked Questions, then parses:
 *   - Q: ... / A: ... pairs
 *   - ### Question heading / paragraph answer pairs
 */
const extractFaqs = (markdown: string): Array<{ q: string; a: string }> => {
  const faqSectionMatch = markdown.match(/##\s+(?:FAQ|Frequently Asked Questions)[\s\S]*$/i);
  if (!faqSectionMatch) return [];

  const faqSection = faqSectionMatch[0];
  const faqs: Array<{ q: string; a: string }> = [];

  // Pattern 1: Q: / A: pairs
  const qaPairs = faqSection.matchAll(/Q:\s*(.+?)\nA:\s*([\s\S]+?)(?=\nQ:|\n##|\n---|\n$|$)/g);
  for (const match of qaPairs) {
    faqs.push({ q: match[1].trim(), a: match[2].trim() });
  }

  // Pattern 2: ### heading / paragraph pairs (if no Q:/A: found)
  if (faqs.length === 0) {
    const h3Pairs = faqSection.matchAll(/###\s+(.+?)\n+([\s\S]+?)(?=\n###|\n##|\n---|\n$|$)/g);
    for (const match of h3Pairs) {
      faqs.push({
        q: match[1].trim(),
        a: match[2].replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1').trim(),
      });
    }
  }

  return faqs;
};

/** Build Article JSON-LD */
const buildArticleSchema = (post: BlogPostType): string => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': post.pillar ? 'TechArticle' : 'Article',
  headline: post.title,
  description: post.meta_description,
  keywords: post.keyword,
  author: { '@type': 'Person', name: post.author },
  publisher: {
    '@type': 'Organization',
    name: 'Rendered Fits',
    logo: { '@type': 'ImageObject', url: 'https://renderedfits.com/Renderedfits-TM-2.png' },
  },
  datePublished: post.date,
  dateModified: post.updated,
  image: post.og_image || 'https://renderedfits.com/og-image.png',
  url: `https://renderedfits.com/blog/${post.slug}`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `https://renderedfits.com/blog/${post.slug}` },
});

/** Build FAQPage JSON-LD */
const buildFaqSchema = (faqs: Array<{ q: string; a: string }>): string => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

// ─── Components ───────────────────────────────────────────────────────────────

const TableOfContents: React.FC<{ toc: ReturnType<typeof extractToc> }> = ({ toc }) => {
  if (toc.length < 3) return null;
  return (
    <nav className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Table of Contents</p>
      <ol className="space-y-2">
        {toc.map((item, i) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${item.id}`}
              className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {item.level === 2 ? `${i + 1}. ` : '— '}{item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const RelatedPosts: React.FC<{ posts: BlogPostType[] }> = ({ posts }) => {
  if (posts.length === 0) return null;
  return (
    <section className="mt-16 pt-10 border-t border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block p-5 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all group"
          >
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{post.category}</span>
            <h3 className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="mt-2 text-xs text-gray-400">{post.reading_time} min read · {formatDate(post.date)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

const CtaSection: React.FC = () => (
  <section className="mt-12 bg-indigo-50 border border-indigo-200 rounded-2xl p-8 text-center">
    <h2 className="text-2xl font-bold text-gray-900 mb-3">
      Ready to see virtual try-on in action?
    </h2>
    <p className="text-gray-600 mb-6 max-w-xl mx-auto">
      Add AI-powered virtual try-on to your Shopify store. Let customers see themselves wearing your products before they buy — reducing returns and increasing conversions.
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href="https://calendly.com/renderedfits"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Schedule a Free Demo
      </a>
      <a
        href="/"
        className="px-6 py-3 border border-indigo-300 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
      >
        See How It Works
      </a>
    </div>
  </section>
);

// ─── Markdown renderer components ─────────────────────────────────────────────

const mdComponents: Record<string, React.FC<any>> = {
  h2: ({ children }) => {
    const id = slugifyHeading(String(children));
    return <h2 id={id} className="text-2xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-24">{children}</h2>;
  },
  h3: ({ children }) => {
    const id = slugifyHeading(String(children));
    return <h3 id={id} className="text-xl font-semibold text-gray-900 mt-8 mb-3 scroll-mt-24">{children}</h3>;
  },
  p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-5">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-5 text-gray-700">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-5 text-gray-700">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-300 pl-5 py-1 my-6 italic text-gray-600">{children}</blockquote>
  ),
  hr: () => <hr className="my-10 border-gray-200" />,
  code: ({ inline, children }: any) =>
    inline
      ? <code className="bg-gray-100 text-gray-800 text-sm px-1.5 py-0.5 rounded font-mono">{children}</code>
      : <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto my-6 text-sm font-mono"><code>{children}</code></pre>,
};

// ─── Main Component ───────────────────────────────────────────────────────────

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => getPostBySlug(slug || ''), [slug]);
  const relatedPosts = useMemo(() => getRelatedPosts(slug || ''), [slug]);
  const toc = useMemo(() => post ? extractToc(post.content) : [], [post]);
  const faqs = useMemo(() => post ? extractFaqs(post.content) : [], [post]);

  useEffect(() => {
    if (!post) return;

    // Page title + meta description
    document.title = `${post.title} | Rendered Fits`;
    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        prop ? el.setAttribute('property', name) : el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', post.meta_description);
    setMeta('og:title', post.title, true);
    setMeta('og:description', post.meta_description, true);
    setMeta('og:url', `https://renderedfits.com/blog/${post.slug}`, true);
    setMeta('og:image', post.og_image || 'https://renderedfits.com/og-image.png', true);
    setMeta('og:type', 'article', true);
    setMeta('twitter:title', post.title, true);
    setMeta('twitter:description', post.meta_description, true);
    setMeta('twitter:card', 'summary_large_image', true);

    // Article schema
    const injectSchema = (id: string, json: string) => {
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.id = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = json;
    };

    injectSchema('schema-article', buildArticleSchema(post));
    if (faqs.length > 0) injectSchema('schema-faq', buildFaqSchema(faqs));

    // Cleanup on unmount
    return () => {
      document.getElementById('schema-article')?.remove();
      document.getElementById('schema-faq')?.remove();
    };
  }, [post, faqs]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-white">
      {/* Article header */}
      <header className="border-b border-gray-100 bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/blog" className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest">
              ← Blog
            </Link>
            <span className="text-gray-300">·</span>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{post.category}</span>
            {post.pillar && (
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">Pillar</span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-6">{post.meta_description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="font-medium text-gray-600">{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated !== post.date && (
              <>
                <span>·</span>
                <span>Updated {formatDate(post.updated)}</span>
              </>
            )}
            <span>·</span>
            <span>{post.reading_time} min read</span>
          </div>
        </div>
      </header>

      {/* Article body */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <TableOfContents toc={toc} />

        <article className="prose-sm max-w-none">
          <ReactMarkdown components={mdComponents}>
            {post.content}
          </ReactMarkdown>
        </article>

        <CtaSection />
        <RelatedPosts posts={relatedPosts} />
      </main>
    </div>
  );
};

export default BlogPost;
