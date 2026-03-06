import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-4">404</p>
      <h1 className="text-3xl sm:text-4xl font-serif italic text-gray-900 mb-4">
        Page not found
      </h1>
      <p className="text-gray-500 text-sm max-w-xs mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-[#444833] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#333522] transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
