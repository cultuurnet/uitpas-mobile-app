import { TPassHolder } from './passholder';

export type TFamilyMember = {
  creationDate: string;
  icon: string;
  mainFamilyMember: boolean;
  passholder: TPassHolder;
  uitpasNumber: string;
};

export type TFamily = {
  email: string;
  firstName: string;
  memberSince: string;
  name: string;
  passholderId: string;
};
