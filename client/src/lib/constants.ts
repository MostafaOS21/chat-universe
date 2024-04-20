export const PASSWORD_PATTERN_HTML = {
  pattern:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  title:
    "Password must contain at least: 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
};
