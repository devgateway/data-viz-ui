/**
 * Utility functions for managing internal traffic detection via first-party cookies
 */

const INTERNAL_TRAFFIC_COOKIE_NAME = '_ga_internal_traffic';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/**
 * Set a first-party cookie to mark this session as internal traffic
 * @param enable - Whether to enable (true) or disable (false) internal traffic tracking
 */
export const setInternalTrafficCookie = (enable: boolean): void => {
  if (typeof document === 'undefined') return;

  const value = enable ? '1' : '0';
  const domain = window.location.hostname;
  const path = '/';

  // Set cookie with SameSite=Lax to ensure it's sent with cross-site requests
  document.cookie = `${INTERNAL_TRAFFIC_COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=${path}; SameSite=Lax`;

  console.log(`Internal traffic cookie ${enable ? 'enabled' : 'disabled'}`);
};

/**
 * Check if internal traffic cookie is enabled
 * @returns true if the internal traffic cookie is set to '1', false otherwise
 */
export const isInternalTrafficEnabled = (): boolean => {
  if (typeof document === 'undefined') return false;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === INTERNAL_TRAFFIC_COOKIE_NAME) {
      return value === '1';
    }
  }

  return false;
};

/**
 * Clear the internal traffic cookie
 */
export const clearInternalTrafficCookie = (): void => {
  if (typeof document === 'undefined') return;

  document.cookie = `${INTERNAL_TRAFFIC_COOKIE_NAME}=; max-age=0; path=/; SameSite=Lax`;
  console.log('Internal traffic cookie cleared');
};
