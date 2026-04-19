/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import StoreHeader from './components/StoreHeader';
import ProductGrid from './components/ProductGrid';
import ProductDetailPage from './components/ProductDetailPage';
import DemoProductPage from './components/DemoProductPage';
import CampbellsOfBeaulyProductPage from './components/CampbellsOfBeaulyProductPage';
import MaleDemoPage from './components/MaleDemoPage';
import FarlowsMenProductPage from './components/FarlowsMenProductPage';
import AdminPage from './components/AdminPage';
import WaitlistPage from './components/WaitlistPage';
import BrandWaitlistPage from './components/BrandWaitlistPage';
import ContactPage from './components/ContactPage';
import ResultsPage from './components/ResultsPage';
import ReallyWildDemoPage from './components/ReallyWildDemoPage';
import ReallyWildDemoPage2 from './components/ReallyWildDemoPage2';
import WastedParisDemoPage from './components/WastedParisDemoPage';
import AndreaIyamahDemoPage from './components/AndreaIyamahDemoPage';
import ScrollToTop from './components/ScrollToTop';
import BlogIndex from './components/BlogIndex';
import BlogPost from './components/BlogPost';
import LegalPage, { LegalHub } from './components/LegalPage';
import NotFoundPage from './components/NotFoundPage';
import ScabalDemoPage from './components/ScabalDemoPage';
import ArneDemoPage from './components/ArneDemoPage';
import TbcoDemoPage from './components/TbcoDemoPage';
import HollandHollandDemoPage from './components/HollandHollandDemoPage';
import CernucciDemoPage from './components/CernucciDemoPage';
import AlludeDemoPage from './components/AlludeDemoPage';
import BrownieDemoPage from './components/BrownieDemoPage';
import VowelsDemoPage from './components/VowelsDemoPage';
import KhanumsDemoPage from './components/KhanumsDemoPage';
import MrButtonDemoPage from './components/MrButtonDemoPage';
import { defaultWardrobe, getWardrobeFolders } from './wardrobe';
import { WardrobeItem } from './types';

const App: React.FC = () => {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>(defaultWardrobe);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Load wardrobe from localStorage if available
  useEffect(() => {
    const savedOutfits = localStorage.getItem('wardrobeOutfits');
    if (savedOutfits) {
      try {
        const parsed = JSON.parse(savedOutfits);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWardrobe(parsed);
        }
      } catch (e) {
        console.error('Failed to load wardrobe:', e);
      }
    }
  }, []);

  // The marketing site no longer runs a live Gemini-powered virtual try-on.
  // Live demos run on the Shopify demo store; here we route "Try On" clicks
  // to the brand waitlist so prospective merchants can get in touch.
  const handleTryOnClick = (_product: WardrobeItem) => {
    window.location.assign('/brand-waitlist');
  };

  const wardrobeFolders = getWardrobeFolders(wardrobe);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Admin Route - Hidden from navigation */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Contact Page - No header */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Results Page - No header (cold email landing page) */}
          <Route path="/results" element={<ResultsPage />} />

          {/* Blog - No header */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Legal Pages - No header */}
          <Route path="/legal" element={<LegalHub />} />
          <Route path="/legal/:slug" element={<LegalPage />} />

          {/* Demo Pages - Not linked from navigation */}
          <Route path="/reallywild" element={<ReallyWildDemoPage />} />
          <Route path="/reallywild2" element={<ReallyWildDemoPage2 />} />
          <Route path="/wastedparis" element={<WastedParisDemoPage />} />
          <Route path="/andrea-iyamah" element={<AndreaIyamahDemoPage />} />
          <Route path="/scabal/wool-suit" element={<ScabalDemoPage productSlug="wool-suit" />} />
          <Route path="/scabal/tailored-jacket" element={<ScabalDemoPage productSlug="tailored-jacket" />} />
          <Route path="/arne/menswear" element={<ArneDemoPage productSlug="menswear" />} />
          <Route path="/arne/womenswear" element={<ArneDemoPage productSlug="womenswear" />} />
          <Route path="/tbco/demo1" element={<TbcoDemoPage productSlug="demo1" />} />
          <Route path="/tbco/demo2" element={<TbcoDemoPage productSlug="demo2" />} />
          <Route path="/tbco/demo3" element={<TbcoDemoPage productSlug="demo3" />} />
          <Route path="/holland-holland/tweed-field-coat" element={<HollandHollandDemoPage productSlug="tweed-field-coat" />} />
          <Route path="/holland-holland/shooting-gilet" element={<HollandHollandDemoPage productSlug="shooting-gilet" />} />
          <Route path="/holland-holland/ladies-shirt" element={<HollandHollandDemoPage productSlug="ladies-shirt" />} />
          <Route path="/holland-holland/tweed-cap" element={<HollandHollandDemoPage productSlug="tweed-cap" />} />
          <Route path="/cernucci/womens-matching-set" element={<CernucciDemoPage productSlug="womens-chain" />} />
          <Route path="/cernucci/cuban-chain" element={<CernucciDemoPage productSlug="cuban-chain" />} />
          <Route path="/cernucci/stud-earring" element={<CernucciDemoPage productSlug="stud-earring" />} />
          <Route path="/cernucci/matching-set" element={<CernucciDemoPage productSlug="matching-set" />} />
          <Route path="/allude/white-jumper" element={<AlludeDemoPage productSlug="white-jumper" />} />
          <Route path="/allude/yellow-jumper" element={<AlludeDemoPage productSlug="yellow-jumper" />} />
          <Route path="/allude/pink-jumper" element={<AlludeDemoPage productSlug="pink-jumper" />} />
          <Route path="/brownie/multi-ruffle-skirt" element={<BrownieDemoPage productSlug="multi-ruffle-skirt" />} />
          <Route path="/brownie/satin-jacquard-top" element={<BrownieDemoPage productSlug="satin-jacquard-top" />} />
          <Route path="/vowels/cezanne-zip-up-jacket" element={<VowelsDemoPage productSlug="cezanne-zip-up-jacket" />} />
          <Route path="/vowels/overdyed-painter-pants" element={<VowelsDemoPage productSlug="overdyed-painter-pants" />} />
          <Route path="/khanums/kodil-dress-sage-green" element={<KhanumsDemoPage productSlug="kodil-dress-sage-green" />} />
          <Route path="/khanums/krace-dress-champagne" element={<KhanumsDemoPage productSlug="krace-dress-champagne" />} />
          <Route path="/khanums/kasir-dress-grey" element={<KhanumsDemoPage productSlug="kasir-dress-grey" />} />
          <Route path="/mr-button/grey-shacket" element={<MrButtonDemoPage productSlug="grey-shacket" />} />
          <Route path="/mr-button/navy-polo-tshirt" element={<MrButtonDemoPage productSlug="navy-polo-tshirt" />} />
          <Route path="/mr-button/moonless-night-trouser" element={<MrButtonDemoPage productSlug="moonless-night-trouser" />} />
          <Route path="/mr-button/snowbound-blazer" element={<MrButtonDemoPage productSlug="snowbound-blazer" />} />

          {/* 404 catch-all for known top-level paths with no sub-routes */}
          <Route path="/blog/*" element={<NotFoundPage />} />
          <Route path="/legal/*" element={<NotFoundPage />} />

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <>
                <StoreHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProductGrid
                        products={wardrobe}
                        folders={wardrobeFolders}
                        searchQuery={searchQuery}
                      />
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <ProductDetailPage
                        products={wardrobe}
                        onTryOnClick={handleTryOnClick}
                      />
                    }
                  />
                  <Route
                    path="/waitlist"
                    element={<WaitlistPage />}
                  />
                  <Route
                    path="/brand-waitlist"
                    element={<BrandWaitlistPage />}
                  />
                  <Route
                    path="/demo-product"
                    element={<DemoProductPage onTryOnClick={handleTryOnClick} />}
                  />
                  <Route
                    path="/demo"
                    element={<CampbellsOfBeaulyProductPage onTryOnClick={handleTryOnClick} />}
                  />
                  <Route
                    path="/demo-male"
                    element={<MaleDemoPage onTryOnClick={handleTryOnClick} />}
                  />
                  <Route
                    path="/farlows"
                    element={
                      <FarlowsMenProductPage
                        product={wardrobe.find(p => p.id === 'FarlowsMen') || wardrobe[0]}
                        onTryOnClick={handleTryOnClick}
                      />
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </>
            }
          />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
};

export default App;
