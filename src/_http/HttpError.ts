import { HttpStatus } from './HttpStatus';

export type TApiError = {
  detail?: string;
  status: HttpStatus;
  title: string;
  type: string;
};
