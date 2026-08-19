// Single source of truth for password strength rules, shared by
// PasswordInput's live checklist and the Form validators that use it.
export const PASSWORD_REQUIREMENTS = [
  {
    key: "minLength",
    label: "At least 6 characters",
    test: (value) => value.length >= 6,
  },
  {
    key: "uppercase",
    label: "One uppercase letter",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    key: "number",
    label: "One number",
    test: (value) => /\d/.test(value),
  },
  {
    key: "specialChar",
    label: "One special character",
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
];

export const isPasswordValid = (value = "") =>
  PASSWORD_REQUIREMENTS.every((requirement) => requirement.test(value));
