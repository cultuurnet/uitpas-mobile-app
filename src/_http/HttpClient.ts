import { Config } from 'react-native-config';
import axios, { AxiosError, AxiosResponse, ResponseType } from 'axios';

import { log } from '../_utils/logger';
import { TApiError } from './HttpError';
import { HttpStatus } from './HttpStatus';

export type Params = Record<string, string | number | boolean | null | undefined>;
export type Headers = Record<string, string>;

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

  static createApiError(error: AxiosError<TApiError>): TApiError {
    return (
      error?.response?.data || {
        status: HttpStatus.InternalServerError,
        title: error.message,
        type: '',
      }
    );
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
    log.debug(`[GET] ${this.getUrlWithParams(route, params)}`, { response: result.data });
    return result.data;
  }

  static async put<T>(route: string, body: Record<string, unknown> = {}, headers: Headers = {}, params: Params = {}): Promise<T> {
    try {
      const result = await axios.put<T>(this.getUrlWithParams(route, params), body, {
        headers: { ...this.getBasicHeaders(), ...headers },
        withCredentials: true,
      });
      log.debug(`[PUT] ${this.getUrlWithParams(route, params)}`, { request: body, response: result.data });
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
      log.debug(`[PATCH] ${this.getUrl(route)}`, { request: body, response: result.data });
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
      log.debug(`[POST] ${this.getUrl(route)}`, { request: body, response: result.data });
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
      log.debug(`[DELETE] ${this.getUrl(route)}`, { response: result.data });
      return result.data || true;
    } catch (error) {
      throw this.createApiError(error);
    }
  }
}

export default HttpClient;
