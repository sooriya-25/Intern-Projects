// Shared OTP-related constants used by both the signup flow and the
// forgot-password flow.
export const RESEND_COOLDOWN_SECONDS = 30;

// Fallback used only if a backend response doesn't include
// `expiresInMinutes` for some reason.
export const DEFAULT_OTP_TTL_MINUTES = 1;
