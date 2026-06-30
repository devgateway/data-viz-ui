const COOKIE_NAME = '_ga_internal_traffic';
const EXPIRES_KEY = '_ga_internal_traffic_expires';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

export const setInternalTrafficCookie = (enable: boolean): void => {
  if (typeof document === 'undefined') return;

  const value = enable ? '1' : '0';
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;

  if (enable) {
    localStorage.setItem(EXPIRES_KEY, String(Date.now() + COOKIE_MAX_AGE * 1000));
  } else {
    localStorage.removeItem(EXPIRES_KEY);
  }
};

export const isInternalTrafficEnabled = (): boolean => {
  if (typeof document === 'undefined') return false;

  for (const cookie of document.cookie.split(';')) {
    const [name, value] = cookie.trim().split('=');
    if (name === COOKIE_NAME) return value === '1';
  }
  return false;
};

export const getInternalTrafficExpiry = (): Date | null => {
  if (typeof localStorage === 'undefined') return null;
  const stored = localStorage.getItem(EXPIRES_KEY);
  if (!stored) return null;
  const ts = parseInt(stored, 10);
  return isNaN(ts) ? null : new Date(ts);
};

export const clearInternalTrafficCookie = (): void => {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; max-age=0; path=/; SameSite=Lax`;
  localStorage.removeItem(EXPIRES_KEY);
};
