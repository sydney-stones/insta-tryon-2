/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface AdminLoginProps {
  /** Called with the password the user entered. Async — the parent
   *  component is responsible for hitting /api/admin-login. */
  onLogin: (password: string) => void | Promise<void>;
  /** External error message from the parent (e.g. "Incorrect password"). */
  error?: string | null;
  /** Parent sets this to true while the login request is in flight. */
  isSubmitting?: boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, error, isSubmitting }) => {
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setLocalError('Please enter a password');
      return;
    }
    setLocalError('');
    onLogin(password);
  };

  const displayError = localError || error || '';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Admin Access
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your admin password to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm disabled:bg-gray-100"
              placeholder="Admin password"
            />
          </div>

          {displayError && (
            <div className="text-red-600 text-sm text-center">{displayError}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
