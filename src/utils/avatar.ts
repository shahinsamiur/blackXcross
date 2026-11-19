export const DEFAULT_AVATAR = "/image/default-avatar.svg";

export const resolveAvatar = (src?: string | null): string =>
  src?.trim() || DEFAULT_AVATAR;