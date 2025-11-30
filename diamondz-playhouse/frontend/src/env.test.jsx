import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const API_URL = 'https://api.example.test';
const STRIPE_KEY = 'pk_test_example_123';

describe('env module', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('VITE_API_URL', API_URL);
    vi.stubEnv('VITE_STRIPE_PUBLISHABLE_KEY', STRIPE_KEY);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('exposes environment variables from Vite', async () => {
    const module = await import('./env.js');
    expect(module.env.API_URL).toBe(API_URL);
    expect(module.env.STRIPE_PUBLISHABLE_KEY).toBe(STRIPE_KEY);
    expect(module.default.API_URL).toBe(API_URL);
  });
});
