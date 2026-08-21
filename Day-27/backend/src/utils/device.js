// Lightweight, dependency-free User-Agent parser. It only aims to produce
// short, human-friendly labels for display in the Active Sessions list —
// it is not a general-purpose UA-parsing library, so keep it that simple
// rather than reaching for a new package.

// Browser name, e.g. "Chrome", "Safari".
const getBrowserName = (ua) => {
  if (!ua) return "Unknown browser";
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\//i.test(ua) || /opera/i.test(ua)) return "Opera";
  if (/firefox|fxios/i.test(ua)) return "Firefox";
  if (/chrome|crios/i.test(ua)) return "Chrome";
  if (/safari/i.test(ua)) return "Safari";

  return "Unknown browser";
};

// Device/OS name, e.g. "Windows", "iPhone", "Android".
const getDeviceName = (ua) => {
  if (!ua) return "Unknown device";
  if (/iphone/i.test(ua)) return "iPhone";
  if (/ipad/i.test(ua)) return "iPad";
  if (/windows/i.test(ua)) return "Windows";
  if (/android/i.test(ua)) return "Android";
  if (/mac os x|macintosh/i.test(ua)) return "macOS";
  if (/linux/i.test(ua)) return "Linux";

  return "Unknown device";
};

module.exports = { getBrowserName, getDeviceName };

