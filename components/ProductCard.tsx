/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem } from '../types';

interface ProductCardProps {
  product: WardrobeItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <img
          src={product.url}
          alt={product.name}
          className={`h-full w-full object-cover transition-all duration-300 ${
            isHovered && product.secondaryImageUrl ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
          }`}
        />
        {product.secondaryImageUrl && (
          <img
            src={product.secondaryImageUrl}
            alt={`${product.name} - alternate view`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        {product.folder && (
          <p className="text-sm text-gray-500">{product.folder}</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
