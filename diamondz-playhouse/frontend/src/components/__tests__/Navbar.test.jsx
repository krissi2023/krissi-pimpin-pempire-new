import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    logout: vi.fn()
  })
}));

vi.mock('react-router-dom', async () => {
  const ReactModule = await import('react');
  const ReactAPI = ReactModule.default || ReactModule;
  return {
    Link: ({ to, className = '', children }) => ReactAPI.createElement('a', { href: to, className }, children)
  };
});

import Navbar from '../Navbar';

describe('Navbar', () => {
  it('shows authentication links for guests', () => {
    const markup = renderToString(<Navbar />);
    expect(markup).toContain('Login');
    expect(markup).toContain('Register');
  });
});
