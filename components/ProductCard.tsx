/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem } from '../types';

interface ProductCardProps {
  product: WardrobeItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        {product.price && (
          <p className="text-base font-semibold text-gray-900">
            £{product.price.toFixed(2)}
          </p>
        )}
        {product.folder && (
          <p className="text-sm text-gray-500">{product.folder}</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
