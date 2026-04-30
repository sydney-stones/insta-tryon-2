/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';

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
      { name: 'Lincoln Knit Pant', path: '/nation-la/lincoln-knit-pant', type: 'Pant' },
      { name: 'Lenon Sweatshirt', path: '/nation-la/lenon-sweatshirt', type: 'Sweatshirt' },
      { name: 'Evonne Maxi Dress', path: '/nation-la/evonne-maxi-dress', type: 'Dress' },
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

const AdminDemoDirectory: React.FC<AdminDemoDirectoryProps> = ({ onBack, onLogout }) => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | DemoBrandGroup['status']>('all');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

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
