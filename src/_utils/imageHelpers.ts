import * as Avatars from '../_assets/images/avatars';
import * as EmojiAvatars from '../_assets/images/avatars/emojiAvatars';
import { TFamilyMember } from '../profile/_models';

export const DEFAULT_AVATAR_NAME = 'Emoji0';

export const getValidAvatarNameOrDefault = (name: string) => {
  return Avatars[name] ? name : DEFAULT_AVATAR_NAME;
};

export const getAvatarByNameOrDefault = (name: string) => {
  return Avatars[name] ?? Avatars[DEFAULT_AVATAR_NAME];
};

export const getRandomUniqueAvatar = (members: TFamilyMember[]) => {
  const usedAvatars = members.map(member => member.icon);
  const availableAvatars = Object.keys(EmojiAvatars).filter(avatar => !usedAvatars.includes(avatar));
  const randomIndex = Math.floor(Math.random() * availableAvatars.length);
  return availableAvatars[randomIndex] ?? Avatars[DEFAULT_AVATAR_NAME];
};
