export type DeviceType = 'mobile' | 'tablet' | 'midTablet' | 'laptop' | 'desktop' | 'wide' | 'unknown';

/** SSR-safe default returned when window is unavailable (Node.js / Edge Runtime). */
const SSR_DEFAULT: DeviceType = 'desktop';

function getDeviceType(): DeviceType {
  if (typeof window === 'undefined') return SSR_DEFAULT;

  const screenWidth = window.innerWidth;

  // Width-based classification (primary)
  if (screenWidth <= 480) return 'mobile';
  if (screenWidth <= 768) return 'tablet';
  if (screenWidth <= 1024) return 'midTablet';
  if (screenWidth <= 1366) return 'laptop';
  if (screenWidth <= 1920) return 'desktop';
  if (screenWidth > 1920) return 'wide';

  // User-agent fallback (secondary, only reached if none of the above matched)
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|phone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) return 'mobile';
  if (/ipad|tablet/i.test(userAgent)) return screenWidth > 1024 ? 'midTablet' : 'tablet';
  if (/macintosh|windows/i.test(userAgent)) return screenWidth > 1920 ? 'wide' : screenWidth > 1366 ? 'desktop' : 'laptop';

  return 'unknown';
}

export default getDeviceType;