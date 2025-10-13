/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { WardrobeItem } from '../types';
import OutfitForm from './OutfitForm';
import AdminTryOn from './AdminTryOn';
import AnalyticsDashboard from './AnalyticsDashboard';

interface AdminDashboardProps {
  onLogout: () => void;
  products: WardrobeItem[];
}

type AdminView = 'dashboard' | 'analytics' | 'tryon' | 'form';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, products }) => {
  const [outfits, setOutfits] = useState<WardrobeItem[]>([]);
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [editingOutfit, setEditingOutfit] = useState<WardrobeItem | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFolder, setFilterFolder] = useState<string>('All');

  // Load outfits from localStorage
  useEffect(() => {
    const savedOutfits = localStorage.getItem('wardrobeOutfits');
    if (savedOutfits) {
      try {
        setOutfits(JSON.parse(savedOutfits));
      } catch (e) {
        console.error('Failed to load outfits:', e);
      }
    }
  }, []);

  // Save outfits to localStorage
  const saveOutfits = (updatedOutfits: WardrobeItem[]) => {
    setOutfits(updatedOutfits);
    localStorage.setItem('wardrobeOutfits', JSON.stringify(updatedOutfits));
  };

  const handleSaveOutfit = (outfit: WardrobeItem) => {
    if (editingOutfit) {
      // Update existing
      const updatedOutfits = outfits.map((o) => (o.id === outfit.id ? outfit : o));
      saveOutfits(updatedOutfits);
    } else {
      // Add new
      saveOutfits([...outfits, outfit]);
    }
    setCurrentView('dashboard');
    setEditingOutfit(undefined);
  };

  const handleEditOutfit = (outfit: WardrobeItem) => {
    setEditingOutfit(outfit);
    setCurrentView('form');
  };

  const handleDeleteOutfit = (id: string) => {
    if (window.confirm('Are you sure you want to delete this outfit?')) {
      saveOutfits(outfits.filter((o) => o.id !== id));
    }
  };

  const handleExportJSON = () => {
    // Format the export to match the wardrobe.ts structure
    const formattedExport = outfits.map((outfit: WardrobeItem) => ({
      id: outfit.id,
      name: outfit.name,
      url: outfit.url,
      secondaryImageUrl: outfit.secondaryImageUrl,
      folder: outfit.folder,
      price: outfit.price,
      description: outfit.description,
      collection: outfit.collection,
      shopUrl: outfit.shopUrl,
      outfitItems: outfit.outfitItems || []
    }));

    const dataStr = JSON.stringify(formattedExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'wardrobe-export.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (Array.isArray(imported)) {
            saveOutfits(imported);
            alert('Import successful!');
          } else {
            alert('Invalid JSON format');
          }
        } catch (err) {
          alert('Failed to import: ' + err);
        }
      };
      reader.readAsText(file);
    }
  };

  const folders = ['All', ...new Set(outfits.map((o) => o.folder).filter(Boolean))];

  const filteredOutfits = outfits.filter((outfit) => {
    const matchesSearch = outfit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          outfit.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = filterFolder === 'All' || outfit.folder === filterFolder;
    return matchesSearch && matchesFolder;
  });

  // Render views based on currentView
  if (currentView === 'tryon') {
    return <AdminTryOn onBack={() => setCurrentView('dashboard')} products={products} />;
  }

  if (currentView === 'analytics') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Back Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
              <div className="flex items-center gap-2">
                <a
                  href="/"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </a>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <AnalyticsDashboard />
      </div>
    );
  }

  if (currentView === 'form') {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <OutfitForm
          outfit={editingOutfit}
          onSave={handleSaveOutfit}
          onCancel={() => {
            setCurrentView('dashboard');
            setEditingOutfit(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">{outfits.length} total outfits</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </a>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setCurrentView('form')}
                className="px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
              >
                + Add New Outfit
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </button>
              <button
                onClick={() => setCurrentView('tryon')}
                className="px-4 py-2 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Unlimited Try-On
              </button>
              <button
                onClick={handleExportJSON}
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Export JSON
              </button>
              <label className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors cursor-pointer">
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search outfits..."
                className="flex-1 sm:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Folder Filter */}
          <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
            {folders.map((folder) => (
              <button
                key={folder}
                onClick={() => setFilterFolder(folder)}
                className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                  filterFolder === folder
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {folder}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Outfits Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredOutfits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No outfits found. Add your first outfit to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOutfits.map((outfit) => (
              <div key={outfit.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                <div className="aspect-[3/4] bg-gray-100 relative">
                  <img
                    src={outfit.url}
                    alt={outfit.name}
                    className="w-full h-full object-cover"
                  />
                  {outfit.secondaryImageUrl && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      2 images
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">{outfit.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{outfit.folder || 'Uncategorized'}</p>
                  <p className="text-xs text-gray-400 mt-1">ID: {outfit.id}</p>
                  {outfit.outfitItems && outfit.outfitItems.length > 0 && (
                    <p className="text-xs text-blue-600 mt-2">
                      {outfit.outfitItems.length} item{outfit.outfitItems.length > 1 ? 's' : ''}
                    </p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEditOutfit(outfit)}
                      className="flex-1 px-3 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteOutfit(outfit.id)}
                      className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
