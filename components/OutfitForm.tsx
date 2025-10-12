/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { WardrobeItem, OutfitItem } from '../types';

interface OutfitFormProps {
  outfit?: WardrobeItem;
  onSave: (outfit: WardrobeItem) => void;
  onCancel: () => void;
}

const OutfitForm: React.FC<OutfitFormProps> = ({ outfit, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<WardrobeItem>>({
    id: '',
    name: '',
    url: '',
    secondaryImageUrl: '',
    folder: '',
    price: 0,
    description: '',
    collection: '',
    shopUrl: '',
    outfitItems: [],
  });

  const [newOutfitItem, setNewOutfitItem] = useState<OutfitItem>({
    name: '',
    price: 0,
    shopUrl: '',
  });

  useEffect(() => {
    if (outfit) {
      setFormData(outfit);
    }
  }, [outfit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddOutfitItem = () => {
    if (newOutfitItem.name) {
      setFormData((prev) => ({
        ...prev,
        outfitItems: [...(prev.outfitItems || []), newOutfitItem],
      }));
      setNewOutfitItem({ name: '', price: 0, shopUrl: '' });
    }
  };

  const handleRemoveOutfitItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      outfitItems: prev.outfitItems?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id && formData.name && formData.url) {
      onSave(formData as WardrobeItem);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {outfit ? 'Edit Outfit' : 'Add New Outfit'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID (unique identifier) *
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="e.g., Autumn-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="e.g., Classic Autumn Dress"
            />
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Image URL *
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="https://..."
            />
            {formData.url && (
              <img src={formData.url} alt="Primary" className="mt-2 w-32 h-40 object-cover rounded-md" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secondary Image URL (for hover)
            </label>
            <input
              type="url"
              name="secondaryImageUrl"
              value={formData.secondaryImageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="https://..."
            />
            {formData.secondaryImageUrl && (
              <img src={formData.secondaryImageUrl} alt="Secondary" className="mt-2 w-32 h-40 object-cover rounded-md" />
            )}
          </div>
        </div>

        {/* Collection & Folder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Folder/Category
            </label>
            <input
              type="text"
              name="folder"
              value={formData.folder}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="e.g., Autumn, Spring, Winter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection
            </label>
            <input
              type="text"
              name="collection"
              value={formData.collection}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="e.g., Autumn Collection 2024"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Describe the outfit..."
          />
        </div>

        {/* Outfit Items Section */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Outfit Items</h3>

          {/* Existing Items */}
          {formData.outfitItems && formData.outfitItems.length > 0 && (
            <div className="space-y-2 mb-4">
              {formData.outfitItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    {item.price !== undefined && item.price > 0 && (
                      <p className="text-sm text-gray-600">£{item.price.toFixed(2)}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOutfitItem(index)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Item */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={newOutfitItem.name}
              onChange={(e) => setNewOutfitItem({ ...newOutfitItem, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Item name"
            />
            <input
              type="number"
              step="0.01"
              value={newOutfitItem.price || ''}
              onChange={(e) => setNewOutfitItem({ ...newOutfitItem, price: parseFloat(e.target.value) || 0 })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Price"
            />
            <input
              type="url"
              value={newOutfitItem.shopUrl || ''}
              onChange={(e) => setNewOutfitItem({ ...newOutfitItem, shopUrl: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Shop URL"
            />
          </div>
          <button
            type="button"
            onClick={handleAddOutfitItem}
            className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            + Add Item
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 transition-colors"
          >
            {outfit ? 'Update Outfit' : 'Add Outfit'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OutfitForm;
