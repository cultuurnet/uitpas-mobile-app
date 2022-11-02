import { Config } from 'react-native-config';
import axios, { AxiosError, AxiosResponse, ResponseType } from 'axios';

import { TApiError, TValidationError } from './HttpError';
import { HttpStatus } from './HttpStatus';

type Params = Record<string, string | number | boolean | null | undefined>;
type Headers = Record<string, string>;

class HttpClient {
  static getUrl(route: string): string {
    if (route.indexOf('http://') === 0 || route.indexOf('https://') === 0 || route.indexOf('www.') === 0) {
      return route;
    }
    return `${Config.API_HOST}${route}`;
  }

  static getUrlWithParams(route: string, params: Params): string {
    let url = HttpClient.getUrl(route);
    if (params) {
      for (const property in params) {
        if (params[property] !== null && params[property] !== undefined) {
          url = HttpClient.addQueryStringParameter(url, property, `${params[property]}`);
        }
      }
    }
    return url;
  }

  static addQueryStringParameter(uri: string, key: string, value: string): string {
    const regex = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(regex)) {
      return uri.replace(regex, `$1${key}=${value}$2`);
    }
    return `${uri + separator + key}=${value}`;
  }

  static parseRequestPayload<T>(object: T): T {
    return Object.keys(object).reduce(
      (acc: T, key: string) => ({ ...acc, [key]: object[key] === '' ? null : object[key] }),
      {} as T,
    );
  }

  static getBasicHeaders(): Headers {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return headers;
  }

  static createApiError(error: AxiosError): TApiError {
    if (error.response) {
      const data: { error?: string; message?: string | Array<TValidationError & { property: string }>; statusCode: HttpStatus } =
        error.response.data;
      return {
        error: data.error,
        message: typeof data.message === 'string' ? data.message : null,
        statusCode: data.statusCode,
        validationErrors: Array.isArray(data.message)
          ? data.message.reduce(
              (acc: Record<string, TValidationError>, { property, ...validationError }) => ({
                ...acc,
                [property]: validationError,
              }),
              {},
            )
          : null,
      };
    }
    return {
      message: error.message,
      statusCode: HttpStatus.InternalServerError,
    };
  }

  static async getRaw<T>(
    route: string,
    params: Params = {},
    headers: Headers = {},
    responseType: ResponseType = 'json',
  ): Promise<AxiosResponse<T>> {
    try {
      return await axios.get<T>(this.getUrlWithParams(route, params), {
        headers: { ...this.getBasicHeaders(), ...headers },
        responseType,
        withCredentials: true,
      });
    } catch (error) {
      throw this.createApiError(error);
    }
  }

  static async get<T>(
    route: string,
    params: Params = {},
    headers: Headers = {},
    responseType: ResponseType = 'json',
  ): Promise<T> {
    const result = await this.getRaw<T>(route, params, headers, responseType);
    return result.data;
  }

  static async put<T>(route: string, body: Record<string, unknown> = {}, headers: Headers = {}, params: Params = {}): Promise<T> {
    try {
      const result = await axios.put<T>(this.getUrlWithParams(route, params), body, {
        headers: { ...this.getBasicHeaders(), ...headers },
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      throw this.createApiError(error);
    }
  }

  static async patch<T>(route: string, body: Record<string, unknown> = {}, headers: Headers = {}): Promise<T> {
    try {
      const result = await axios.patch<T>(this.getUrl(route), body, {
        headers: { ...this.getBasicHeaders(), ...headers },
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      throw this.createApiError(error);
    }
  }

  static async post<T>(route: string, body: Record<string, unknown> = {}, headers: Headers = {}): Promise<T> {
    try {
      const result = await axios.post<T>(this.getUrl(route), body, {
        headers: { ...this.getBasicHeaders(), ...headers },
        withCredentials: true,
      });
      return result.data;
    } catch (error) {
      throw this.createApiError(error);
    }
  }

  static async delete<T>(route: string, headers: Headers = {}): Promise<T> {
    try {
      const result = await axios.delete(this.getUrl(route), {
        headers: { ...this.getBasicHeaders(), ...headers },
        withCredentials: true,
      });
      return result.data || true;
    } catch (error) {
      throw this.createApiError(error);
    }
  }
}

export default HttpClient;
