export const MODEL_NAMES = {
  USER: 'User',
  IDEA: 'Idea',
} as const;

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const PASSWORD_STRENGTH_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,128}$/;

export const PASSWORD_STRENGTH_MESSAGE =
  'Password must be 8-128 characters and include at least one uppercase letter, one lowercase letter, and one number';