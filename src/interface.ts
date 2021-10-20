import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Context } from './context';

export interface PollingConfig {
    enabled?: boolean;
    url?: string;
    timeout?: number;
    interval?: number;
}

export interface Request {
    get(url: string, options: OfflineRequestOptions, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    delete(url: string, options: OfflineRequestOptions, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    post(url: string, options: OfflineRequestOptions, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    put(url: string, options: OfflineRequestOptions, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    patch(url: string, options: OfflineRequestOptions, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
}

export type RequestMethodType = 
    | 'GET'
    | 'DELETE'
    | 'POST'
    | 'PUT'
    | 'PATCH';

export enum RequestMethod {
    GET,
    DELETE,
    POST,
    PUT,
    PATCH
}

export interface RouterCallbackResponse {
    data: any;
    status: number;
    statusText: string;
}

export interface OfflineRequestServer {
    get: (url: string, callback: RouterCallback) => void;
    delete: (url: string, callback: RouterCallback) => void;
    post: (url: string, callback: RouterCallback) => void;
    put: (url: string, callback: RouterCallback) => void;
    patch: (url: string, callback: RouterCallback) => void;
}

export interface OfflineRequestOptions {
    logRequestInfo?: boolean;
}

export type RouterCallback = (ctx: Context) => Promise<void>;