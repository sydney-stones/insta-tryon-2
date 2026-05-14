/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';

interface AutoDemo {
  slug: string;
  brandName: string;
  brandDomain: string;
  generatedOn: string;
  genderClassification: string;
  classificationConfidence: string;
  modelName: string;
  productTitle: string;
  contactFirstName: string;
  contactEmail: string;
  senderEmail: string;
  status: string;
  demoUrl: string;
}

interface AutoDemoIndex {
  generatedAt: string;
  count: number;
  demos: AutoDemo[];
}

interface DemoLink {
  name: string;
  path: string;
  type?: string;
}

interface DemoBrandGroup {
  brand: string;
  status: 'active' | 'prospect' | 'archive';
  note: string;
  demos: DemoLink[];
}

const DEMO_GROUPS: DemoBrandGroup[] = [
  {
    brand: 'Demellier London',
    status: 'prospect',
    note: 'Luxury handbag demos styled to the merchant PDP.',
    demos: [
      { name: 'The Midi Stockholm', path: '/demellier/the-midi-stockholm', type: 'Bag' },
      { name: 'The Siena Saddle', path: '/demellier/the-siena-saddle', type: 'Bag' },
      { name: 'The Florence', path: '/demellier/the-florence', type: 'Bag' },
    ],
  },
  {
    brand: 'Duke + Dexter',
    status: 'prospect',
    note: 'Menswear, womenswear, and footwear demos styled to the merchant PDP.',
    demos: [
      { name: 'NY Sketch Oat Marl Short', path: '/duke-dexter/ny-sketch-oat-marl-short', type: 'Shorts' },
      { name: 'Peso Mechanic Shirt', path: '/duke-dexter/peso-mechanic-shirt', type: 'Shirt' },
      { name: 'DR Motocross Vintage White Waffle Top', path: '/duke-dexter/dr-motocross-vintage-white-waffle-top', type: 'Top' },
      { name: 'NY Sketch Washed Grey Waffle Top', path: '/duke-dexter/ny-sketch-washed-grey-waffle-top', type: 'Top' },
      { name: "Plus Duke Kiss Sneaker - Women's", path: '/duke-dexter/plus-duke-kiss-sneaker-womens', type: 'Footwear' },
    ],
  },
  {
    brand: 'Holland & Holland',
    status: 'archive',
    note: 'Deferred prospect, retained for reference and future multi-product follow-up.',
    demos: [
      { name: 'Tweed Field Coat', path: '/holland-holland/tweed-field-coat', type: 'Outerwear' },
      { name: 'Shooting Gilet', path: '/holland-holland/shooting-gilet', type: 'Outerwear' },
      { name: 'Ladies Shirt', path: '/holland-holland/ladies-shirt', type: 'Shirt' },
      { name: 'Tweed Cap', path: '/holland-holland/tweed-cap', type: 'Accessory' },
    ],
  },
  {
    brand: 'Cernucci',
    status: 'prospect',
    note: 'Jewellery and outfit demos for enterprise prospecting.',
    demos: [
      { name: 'Womens Matching Set', path: '/cernucci/womens-matching-set', type: 'Outfit' },
      { name: 'Cuban Chain', path: '/cernucci/cuban-chain', type: 'Jewellery' },
      { name: 'Stud Earring', path: '/cernucci/stud-earring', type: 'Jewellery' },
      { name: 'Matching Set', path: '/cernucci/matching-set', type: 'Outfit' },
    ],
  },
  {
    brand: 'Allude',
    status: 'prospect',
    note: 'Luxury knitwear demos for warm pipeline follow-up.',
    demos: [
      { name: 'White Jumper', path: '/allude/white-jumper', type: 'Knitwear' },
      { name: 'Yellow Jumper', path: '/allude/yellow-jumper', type: 'Knitwear' },
      { name: 'Pink Jumper / Trousers', path: '/allude/pink-jumper', type: 'Knitwear' },
    ],
  },
  {
    brand: 'Scabal',
    status: 'prospect',
    note: 'Tailoring demos for menswear sales conversations.',
    demos: [
      { name: 'Wool Suit', path: '/scabal/wool-suit', type: 'Tailoring' },
      { name: 'Tailored Jacket', path: '/scabal/tailored-jacket', type: 'Tailoring' },
    ],
  },
  {
    brand: 'TBCO',
    status: 'prospect',
    note: 'Blanket and outerwear-style demos for reactivation.',
    demos: [
      { name: 'Demo 1', path: '/tbco/demo1', type: 'Demo' },
      { name: 'Demo 2', path: '/tbco/demo2', type: 'Demo' },
      { name: 'Demo 3', path: '/tbco/demo3', type: 'Demo' },
    ],
  },
  {
    brand: 'Arne',
    status: 'prospect',
    note: 'Menswear and womenswear examples.',
    demos: [
      { name: 'Menswear', path: '/arne/menswear', type: 'Menswear' },
      { name: 'Womenswear', path: '/arne/womenswear', type: 'Womenswear' },
    ],
  },
  {
    brand: 'Brownie',
    status: 'prospect',
    note: 'Womenswear product-page demos.',
    demos: [
      { name: 'Multi Ruffle Skirt', path: '/brownie/multi-ruffle-skirt', type: 'Skirt' },
      { name: 'Satin Jacquard Top', path: '/brownie/satin-jacquard-top', type: 'Top' },
      { name: 'Red Chain Bracelet', path: '/brownie/red-chain-bracelet', type: 'Accessory' },
      { name: 'Red Chain Necklace', path: '/brownie/red-chain-necklace', type: 'Accessory' },
    ],
  },
  {
    brand: 'Vowels',
    status: 'prospect',
    note: 'Contemporary menswear demos.',
    demos: [
      { name: 'Cezanne Zip-Up Jacket', path: '/vowels/cezanne-zip-up-jacket', type: 'Jacket' },
      { name: 'Overdyed Painter Pants', path: '/vowels/overdyed-painter-pants', type: 'Pants' },
    ],
  },
  {
    brand: 'Khanums',
    status: 'prospect',
    note: 'Occasionwear dress demos.',
    demos: [
      { name: 'Kodil Dress Sage Green', path: '/khanums/kodil-dress-sage-green', type: 'Dress' },
      { name: 'Krace Dress Champagne', path: '/khanums/krace-dress-champagne', type: 'Dress' },
      { name: 'Kasir Dress Grey', path: '/khanums/kasir-dress-grey', type: 'Dress' },
    ],
  },
  {
    brand: 'Nicholas K',
    status: 'prospect',
    note: 'Accessories and womenswear demos.',
    demos: [
      { name: 'Flower District Earrings', path: '/nicholas-k/flower-district-earrings', type: 'Jewellery' },
      { name: 'Jump Skirt', path: '/nicholas-k/jump-skirt', type: 'Skirt' },
      { name: 'Trench Coat Dress', path: '/nicholas-k/trench-coat-dress', type: 'Dress' },
      { name: 'Jade Jumpsuit', path: '/nicholas-k/jade-jumpsuit', type: 'Jumpsuit' },
    ],
  },
  {
    brand: 'Mr Button',
    status: 'prospect',
    note: 'Menswear and tailoring demos.',
    demos: [
      { name: 'Grey Shacket', path: '/mr-button/grey-shacket', type: 'Shacket' },
      { name: 'Navy Polo T-Shirt', path: '/mr-button/navy-polo-tshirt', type: 'Polo' },
      { name: 'Moonless Night Trouser', path: '/mr-button/moonless-night-trouser', type: 'Trouser' },
      { name: 'Snowbound Blazer', path: '/mr-button/snowbound-blazer', type: 'Blazer' },
    ],
  },
  {
    brand: 'Nation LA',
    status: 'prospect',
    note: 'US womenswear demos.',
    demos: [
      { name: 'Lenon Sweatshirt', path: '/nation-la/lenon-sweatshirt', type: 'Sweatshirt' },
      { name: 'Becka Tank', path: '/nation-la/becka-tank', type: 'Top' },
      { name: 'Jenna Crochet Short', path: '/nation-la/jenna-crochet-short', type: 'Short' },
    ],
  },
  {
    brand: 'Perfect White Tee',
    status: 'prospect',
    note: 'Everyday basics demos.',
    demos: [
      { name: 'Hendrix', path: '/perfect-white-tee/hendrix', type: 'Top' },
      { name: 'Johnny', path: '/perfect-white-tee/johnny', type: 'Top' },
      { name: 'Ziggy', path: '/perfect-white-tee/ziggy', type: 'Top' },
    ],
  },
  {
    brand: 'Slowlove',
    status: 'prospect',
    note: 'Knitwear demos.',
    demos: [
      { name: 'Spaced Out Hand-Knit Jumper', path: '/slowlove/spaced-out-hand-knit-jumper', type: 'Knitwear' },
      { name: 'Staple Cardigan Panna Cotta', path: '/slowlove/staple-cardigan-panna-cotta', type: 'Cardigan' },
      { name: 'Neon Butterfly Hand-Knit Jumper', path: '/slowlove/neon-butterfly-hand-knit-jumper', type: 'Knitwear' },
    ],
  },
  {
    brand: 'Standalone / legacy demos',
    status: 'active',
    note: 'Older generic demo links still available for reference.',
    demos: [
      { name: 'Really Wild', path: '/reallywild', type: 'Legacy' },
      { name: 'Really Wild 2', path: '/reallywild2', type: 'Legacy' },
      { name: 'Wasted Paris', path: '/wastedparis', type: 'Legacy' },
      { name: 'Andrea Iyamah', path: '/andrea-iyamah', type: 'Legacy' },
      { name: 'Campbells of Beauly', path: '/demo', type: 'Legacy' },
      { name: 'Male Demo', path: '/demo-male', type: 'Legacy' },
      { name: 'Demo Product', path: '/demo-product', type: 'Legacy' },
      { name: 'Farlows', path: '/farlows', type: 'Legacy' },
    ],
  },
];

const statusStyles: Record<DemoBrandGroup['status'], string> = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  prospect: 'bg-blue-50 text-blue-700 border-blue-200',
  archive: 'bg-gray-100 text-gray-700 border-gray-200',
};

interface AdminDemoDirectoryProps {
  onBack: () => void;
  onLogout: () => void;
}

const ADMIN_TOKEN_KEY = 'adminToken';

const AdminDemoDirectory: React.FC<AdminDemoDirectoryProps> = ({ onBack, onLogout }) => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | DemoBrandGroup['status']>('all');
  const [autoIndex, setAutoIndex] = useState<AutoDemoIndex | null>(null);
  const [approvals, setApprovals] = useState<Record<string, 'approved' | 'rejected' | 'removed'>>({});
  const [autoFilter, setAutoFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'removed'>('all');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    fetch('/demos-data/index.json')
      .then(r => r.ok ? r.json() : null)
      .then((data: AutoDemoIndex | null) => setAutoIndex(data))
      .catch(() => setAutoIndex(null));
  }, []);

  useEffect(() => {
    // Load static approvals.json first (permanent, committed to git)
    // then merge any KV updates on top (cross-device real-time sync)
    Promise.all([
      fetch('/demos-data/approvals.json').then(r => r.ok ? r.json() : {}).catch(() => ({})),
      fetch('/api/approvals').then(r => r.ok ? r.json() : {}).catch(() => ({})),
    ]).then(([staticApprovals, kvApprovals]) => {
      setApprovals({ ...staticApprovals, ...kvApprovals });
    });
  }, []);

  const updateApproval = (slug: string, state: 'approved' | 'rejected' | 'removed' | 'pending') => {
    // Optimistic UI update
    setApprovals(prev => {
      const next = { ...prev };
      if (state === 'pending') delete next[slug]; else next[slug] = state;
      return next;
    });
    const token = typeof window !== 'undefined' ? sessionStorage.getItem(ADMIN_TOKEN_KEY) : null;
    fetch('/api/approvals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { 'x-admin-token': token } : {}) },
      body: JSON.stringify({ slug, state }),
    }).then(async r => {
      if (!r.ok) {
        // Roll back local state on persistence failure so the user knows it didn't save
        const msg = await r.text();
        console.error('[approvals] save failed', r.status, msg);
        alert(`Failed to save (${r.status}). Approval state for "${slug}" was NOT persisted. Refresh and try again.`);
        // Refetch to resync
        const fresh = await fetch('/api/approvals').then(x => x.ok ? x.json() : null).catch(() => null);
        if (fresh) {
          fetch('/demos-data/approvals.json').then(x => x.ok ? x.json() : {}).catch(() => ({}))
            .then(staticA => setApprovals({ ...staticA, ...fresh }));
        }
      }
    }).catch(e => {
      console.error('[approvals] network error', e);
      alert(`Network error saving approval for "${slug}". State NOT persisted.`);
    });
  };

  const autoDemos = autoIndex?.demos || [];
  const normalizedQuery = query.trim().toLowerCase();
  const filteredAutoDemos = useMemo(() => {
    return autoDemos.filter(d => {
      const state = approvals[d.slug] || 'pending';
      if (autoFilter === 'pending' && state !== 'pending') return false;
      if (autoFilter === 'approved' && state !== 'approved') return false;
      if (autoFilter === 'rejected' && state !== 'rejected') return false;
      if (autoFilter === 'removed' && state !== 'removed') return false;
      if (!normalizedQuery) return true;
      return [d.brandName, d.brandDomain, d.contactFirstName, d.contactEmail, d.senderEmail, d.productTitle, d.slug]
        .some(f => f?.toLowerCase().includes(normalizedQuery));
    });
  }, [autoDemos, approvals, autoFilter, normalizedQuery]);

  const approvedCount = autoDemos.filter(d => approvals[d.slug] === 'approved').length;
  const rejectedCount = autoDemos.filter(d => approvals[d.slug] === 'rejected').length;
  const removedCount = autoDemos.filter(d => approvals[d.slug] === 'removed').length;
  const pendingCount = autoDemos.length - approvedCount - rejectedCount - removedCount;

  const filteredGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return DEMO_GROUPS
      .filter((group) => statusFilter === 'all' || group.status === statusFilter)
      .map((group) => ({
        ...group,
        demos: group.demos.filter((demo) => {
          if (!normalizedQuery) return true;
          return (
            group.brand.toLowerCase().includes(normalizedQuery) ||
            demo.name.toLowerCase().includes(normalizedQuery) ||
            demo.path.toLowerCase().includes(normalizedQuery) ||
            demo.type?.toLowerCase().includes(normalizedQuery)
          );
        }),
      }))
      .filter((group) => group.demos.length > 0);
  }, [query, statusFilter]);

  const totalDemoCount = DEMO_GROUPS.reduce((sum, group) => sum + group.demos.length, 0);
  const filteredDemoCount = filteredGroups.reduce((sum, group) => sum + group.demos.length, 0);

  const copyLink = async (path: string) => {
    await navigator.clipboard.writeText(`${origin}${path}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button onClick={onBack} className="text-sm text-gray-600 hover:text-gray-900 mb-2">
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Demo Directory</h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredDemoCount} of {totalDemoCount} public demo links across {DEMO_GROUPS.length} groups
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a href="/" className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                Home
              </a>
              <button onClick={onLogout} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand, product, type, or URL..."
              className="w-full lg:max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <div className="flex gap-2 overflow-x-auto pb-1">
              {(['all', 'prospect', 'active', 'archive'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                    statusFilter === status
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auto-generated personalised demos — at the top */}
      {autoDemos.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Auto-generated personalised demos</h2>
              <p className="text-sm text-gray-600 mt-1">
                {autoDemos.length} demos · {pendingCount} pending · {approvedCount} approved · {rejectedCount} rejected · {removedCount} removed
                {autoIndex && <span className="ml-2 text-xs text-gray-400">index updated {new Date(autoIndex.generatedAt).toLocaleString()}</span>}
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {(['all','pending','approved','rejected','removed'] as const).map((s) => (
                <button key={s} onClick={() => setAutoFilter(s)}
                  className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${autoFilter === s ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left">Brand</th>
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Contact</th>
                    <th className="px-4 py-3 text-left">Sender</th>
                    <th className="px-4 py-3 text-left">Model</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAutoDemos.length === 0 ? (
                    <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-500">No demos match the filter.</td></tr>
                  ) : filteredAutoDemos.map((d) => {
                    const state = approvals[d.slug] || 'pending';
                    const stateStyle =
                      state === 'approved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                      state === 'rejected' ? 'bg-red-100 text-red-700 border-red-200' :
                      state === 'removed'  ? 'bg-gray-200 text-gray-700 border-gray-300 line-through' :
                      'bg-amber-50 text-amber-700 border-amber-200';
                    return (
                      <tr key={d.slug} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{d.brandName}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[180px]">{d.brandDomain}</div>
                        </td>
                        <td className="px-4 py-3 max-w-[220px]">
                          <div className="truncate text-gray-800">{d.productTitle}</div>
                          <div className="text-xs text-gray-500">{d.genderClassification} · {d.classificationConfidence}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-gray-800">{d.contactFirstName || '—'}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[180px]">{d.contactEmail}</div>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-700">{d.senderEmail || '—'}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{d.modelName || '—'}</td>
                        <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{d.generatedOn}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 text-xs font-medium border rounded-full ${stateStyle}`}>{state}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5 justify-end">
                            <a href={d.demoUrl} target="_blank" rel="noopener noreferrer"
                               className="px-2.5 py-1 text-xs text-white bg-gray-900 rounded hover:bg-gray-800">View</a>
                            <button onClick={() => copyLink(d.demoUrl)}
                               className="px-2.5 py-1 text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-50">Copy</button>
                            {state !== 'approved' && (
                              <button onClick={() => updateApproval(d.slug, 'approved')}
                                className="px-2.5 py-1 text-xs text-white bg-emerald-600 rounded hover:bg-emerald-700">Approve</button>
                            )}
                            {state !== 'rejected' && (
                              <button onClick={() => updateApproval(d.slug, 'rejected')}
                                className="px-2.5 py-1 text-xs text-red-700 border border-red-300 rounded hover:bg-red-50">Reject</button>
                            )}
                            {state !== 'removed' && (
                              <button
                                onClick={() => {
                                  if (confirm(`Remove "${d.brandName}" from the system? This marks the demo as removed and will be purged from public-facing data on the next batch.`)) {
                                    updateApproval(d.slug, 'removed');
                                  }
                                }}
                                className="px-2.5 py-1 text-xs text-white bg-gray-700 rounded hover:bg-gray-800">Remove</button>
                            )}
                            {state !== 'pending' && (
                              <button onClick={() => updateApproval(d.slug, 'pending')}
                                className="px-2.5 py-1 text-xs text-gray-600 hover:text-gray-900">Reset</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredGroups.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
            No demo links match that search.
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <section key={group.brand} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-200">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{group.brand}</h2>
                      <p className="text-sm text-gray-600 mt-1">{group.note}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full border text-xs font-medium whitespace-nowrap ${statusStyles[group.status]}`}>
                      {group.status}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {group.demos.map((demo) => (
                    <div key={demo.path} className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium text-gray-900">{demo.name}</h3>
                          {demo.type && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{demo.type}</span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 truncate">{demo.path}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => copyLink(demo.path)}
                          className="px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Copy
                        </button>
                        <a
                          href={demo.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 text-sm text-white bg-gray-900 rounded-md hover:bg-gray-800"
                        >
                          Open
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDemoDirectory;
