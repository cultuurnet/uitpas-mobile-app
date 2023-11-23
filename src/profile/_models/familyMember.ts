import { TPassHolder } from './passholder';

export type TFamilyMember = {
  creationDate: string;
  icon: string;
  mainFamilyMember: boolean;
  passholder: TPassHolder;
  uitpasNumber: string;
};
