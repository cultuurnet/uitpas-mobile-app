import { HttpStatus } from './HttpStatus';

export type TApiError = {
  detail?: string;
  endUserMessage?: {
    nl: string;
  };
  status: HttpStatus;
  title: string;
  type: string;
};
