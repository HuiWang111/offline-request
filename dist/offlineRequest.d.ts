import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Router } from './server';
import { OfflineRequestOptions, OfflineRequestServer, PollingConfig } from './interface';
export declare class OfflineRequest {
    private _network;
    private _httpClient?;
    private _client;
    private _options;
    _server: Router;
    constructor(httpClient?: AxiosInstance | null | undefined, { networkOnly, cacheOnly }?: OfflineRequestOptions, pollingConfig?: PollingConfig | undefined | null);
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    put(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    patch(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    get server(): OfflineRequestServer;
}
