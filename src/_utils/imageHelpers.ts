import * as Avatars from '../_assets/images/avatars';
import * as EmojiAvatars from '../_assets/images/avatars/emojiAvatars';
import { TFamilyMember } from '../profile/_models';

export const DEFAULT_AVATAR_NAME = 'Emoji0';

const AVATAR_ALT_TEXT_KEYS: Record<string, string> = {
  Animals0: 'AVATARS.ANIMALS_0',
  Animals1: 'AVATARS.ANIMALS_1',
  Animals2: 'AVATARS.ANIMALS_2',
  Animals3: 'AVATARS.ANIMALS_3',
  Animals4: 'AVATARS.ANIMALS_4',
  Animals5: 'AVATARS.ANIMALS_5',
  Animals6: 'AVATARS.ANIMALS_6',
  Animals7: 'AVATARS.ANIMALS_7',
  Animals8: 'AVATARS.ANIMALS_8',
  Animals9: 'AVATARS.ANIMALS_9',
  Emoji0: 'AVATARS.EMOJI_0',
  Emoji1: 'AVATARS.EMOJI_1',
  Emoji2: 'AVATARS.EMOJI_2',
  Emoji3: 'AVATARS.EMOJI_3',
  Emoji4: 'AVATARS.EMOJI_4',
  Emoji5: 'AVATARS.EMOJI_5',
  Emoji6: 'AVATARS.EMOJI_6',
  Emoji7: 'AVATARS.EMOJI_7',
  Emoji8: 'AVATARS.EMOJI_8',
  Emoji9: 'AVATARS.EMOJI_9',
};

export const getValidAvatarNameOrDefault = (name: string) => {
  return Avatars[name] ? name : DEFAULT_AVATAR_NAME;
};

export const getAvatarAltTextKey = (name: string) => {
  return AVATAR_ALT_TEXT_KEYS[getValidAvatarNameOrDefault(name)];
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
