import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { OfflineRequestServer } from './interface';
export declare class OfflineRequest {
    private _httpClient;
    private _cacheClient;
    private _server;
    private _isOnline;
    constructor(httpClient: AxiosInstance, isOnline: () => boolean);
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    patch(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    get server(): OfflineRequestServer;
}
