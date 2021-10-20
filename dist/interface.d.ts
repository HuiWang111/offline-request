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
export declare type RequestMethodType = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
export declare enum RequestMethod {
    GET = 0,
    DELETE = 1,
    POST = 2,
    PUT = 3,
    PATCH = 4
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
export declare type RouterCallback = (ctx: Context) => Promise<void>;
