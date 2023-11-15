import * as Avatars from './';

export const getAvatarByNameOrDefault = (name: string) => {
  return Avatars?.[name] ?? Avatars.DEFAULT_AVATAR;
};
