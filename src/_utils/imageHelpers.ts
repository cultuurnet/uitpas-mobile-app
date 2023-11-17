import * as Avatars from '../_assets/images/avatars';

export const DEFAULT_AVATAR_NAME = 'Emoji0';

export const getAvatarByNameOrDefault = (name: string) => {
  return Avatars[name] ?? Avatars[DEFAULT_AVATAR_NAME];
};
