const API_URL = import.meta.env.VITE_API_URL ?? '';
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? '';

export const env = {
  API_URL,
  STRIPE_PUBLISHABLE_KEY
};

export default env;
