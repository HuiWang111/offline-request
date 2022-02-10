import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { OfflineRequestServer, OfflineRequestOptions } from './interface';
export declare class OfflineRequest {
    private _httpClient;
    private _cacheClient;
    private _server;
    private _options;
    isOnline: () => Promise<boolean> | boolean;
    constructor(httpClient: AxiosInstance, isOnline: () => Promise<boolean> | boolean, { logRequestInfo }?: OfflineRequestOptions);
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    patch(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    get server(): OfflineRequestServer;
}
