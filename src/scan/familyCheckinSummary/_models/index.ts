import { TApiError } from '../../../_http';
import { TCheckInResponse } from '../../_models';

export type TFamilyScanResponse = { type: 'success'; value: TCheckInResponse } | { error: TApiError; type: 'error' };
