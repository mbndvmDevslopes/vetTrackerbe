import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatching;
};


// Exclude keys from user
export function excludePassword<
  User extends { [s: string]: unknown },
  Key extends keyof User
>(user: User, keys: Key[]): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key as Key))
  ) as Omit<User, Key>;
}