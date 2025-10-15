/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const AffiliateDisclaimer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-50/80 backdrop-blur-sm border-t border-gray-200/50 py-1 px-2 z-10">
      <p className="text-[9px] text-gray-400 text-center leading-tight">
        RenderedFits earns affiliate commission through purchases made via links on this site.
      </p>
    </div>
  );
};

export default AffiliateDisclaimer;
