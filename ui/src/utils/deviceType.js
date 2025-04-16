function getDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();
  const screenWidth = window.innerWidth;

  // First, check based on screen width
  if (screenWidth <= 480) {
    return "mobile";
  }
  if (screenWidth > 480 && screenWidth <= 768) {
    return "tablet";
  }
  if (screenWidth > 768 && screenWidth <= 1024) {
    return "midTablet";
  }
  if (screenWidth > 1024 && screenWidth <= 1366) {
    return "laptop";
  }
  if (screenWidth > 1366 && screenWidth <= 1920) {
    return "desktop";
  }
  if (screenWidth > 1920) {
    return "wide";
  }

  // Fallback to user agent check
  if (/mobile|android|iphone|phone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
    return "mobile";
  }
  if (/ipad|tablet/i.test(userAgent)) {
    return screenWidth > 1024 ? "midTablet" : "tablet";
  }
  if (/macintosh|windows/i.test(userAgent)) {
    return screenWidth > 1920 ? "wide" : screenWidth > 1366 ? "desktop" : "laptop";
  }

  return "unknown";
}

export default getDeviceType;
