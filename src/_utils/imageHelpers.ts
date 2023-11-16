import * as Avatars from '../_assets/images/avatars';

export const getAvatarByNameOrDefault = (name: string) => {
  return Avatars?.[name] ?? Avatars.DEFAULT_AVATAR;
};
