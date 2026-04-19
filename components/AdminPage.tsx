/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

// As of April 2026 the admin password is no longer compared client-side
// and is no longer bundled into the JS. The browser POSTs the password
// to /api/admin-login, which validates against process.env.ADMIN_PASSWORD
// and returns a short-lived signed token. That token is stored in
// sessionStorage and sent with every admin-gated request.
//
// The "is this user an admin?" check in the UI is purely UX — the real
// enforcement happens server-side in /api/gemini. Setting sessionStorage
// manually will render the dashboard but every action will 401.

const ADMIN_TOKEN_STORAGE_KEY = 'adminToken';

/** Best-effort base64url → string (does NOT verify signature). */
function decodeTokenPayload(token: string): { exp?: number } | null {
  try {
    const [payloadPart] = token.split('.');
    if (!payloadPart) return null;
    const pad =
      payloadPart.length % 4 === 0 ? '' : '='.repeat(4 - (payloadPart.length % 4));
    const json = atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/') + pad);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function hasFreshToken(): boolean {
  const token = sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  if (!token) return false;
  const payload = decodeTokenPayload(token);
  if (!payload || typeof payload.exp !== 'number') return false;
  return payload.exp > Math.floor(Date.now() / 1000);
}

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (hasFreshToken()) {
      setIsAuthenticated(true);
    } else {
      // Clear any stale token so the login screen is accurate.
      sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      // Also remove the legacy "adminAuth" flag left over from the old
      // client-side-only auth scheme.
      sessionStorage.removeItem('adminAuth');
    }
  }, []);

  const handleLogin = useCallback(async (password: string) => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const text = await res.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        /* non-JSON error page */
      }

      if (!res.ok || !json?.token) {
        const msg =
          json?.error ||
          (res.status === 401 ? 'Incorrect password' : `Login failed (HTTP ${res.status})`);
        setLoginError(msg);
        return;
      }

      sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, json.token);
      setIsAuthenticated(true);
    } catch (err: any) {
      setLoginError(err?.message || 'Network error');
    } finally {
      setIsLoggingIn(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  }, []);

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLogin={handleLogin}
        error={loginError}
        isSubmitting={isLoggingIn}
      />
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
};

export default AdminPage;
