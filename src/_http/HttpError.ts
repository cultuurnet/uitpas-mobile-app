import { HttpStatus } from './HttpStatus';

export type TValidationError = {
  children: Array<TValidationError & { property: string }>;
  constraints: Record<string, unknown>;
  target?: Record<string, unknown>;
  value?: unknown;
};

export type TApiError = {
  error?: string;
  message?: string;
  statusCode: HttpStatus;
  validationErrors?: Record<string, TValidationError>;
};

export function getValidationError(error: TApiError, property: string): TValidationError {
  if (!error || !error.validationErrors) return null;
  return error.validationErrors[property];
}
