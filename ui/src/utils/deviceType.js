function getDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();
  const screenWidth = window.innerWidth;

  // First, check based on user agent
  if (
    /mobile|android|iphone|phone|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    )
  ) {
    return "mobile";
  } else if (/ipad|tablet/i.test(userAgent)) {
    if (screenWidth > 1024) {
      return "midTablet";
    } else {
      return "tablet";
    }
  } else if (/macintosh|windows/i.test(userAgent)) {
    if (screenWidth > 1920) {
      return "wide";
    } else if (screenWidth > 1366) {
      return "desktop";
    } else if (screenWidth > 1024) {
      return "laptop";
    }
  }

  // If user agent checks don't match, fallback to screen width checks
  if (screenWidth <= 480) {
    return "mobile";
  } else if (screenWidth > 480 && screenWidth <= 768) {
    return "tablet";
  } else if (screenWidth > 768 && screenWidth <= 1024) {
    return "midTablet";
  } else if (screenWidth > 1024 && screenWidth <= 1366) {
    return "laptop";
  } else if (screenWidth > 1366 && screenWidth <= 1920) {
    return "desktop";
  } else if (screenWidth > 1920) {
    return "wide";
  }

  return "unknown";
}

export default getDeviceType;
