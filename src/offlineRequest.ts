import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NetWork } from './network';
import { OfflineRequestClient } from './client';
import { Router } from './server';
import { OfflineRequestOptions } from './interface';

export class OfflineRequest {
    private _network: NetWork;
    private _httpClient: AxiosInstance;
    private _client: OfflineRequestClient;
    private _options: OfflineRequestOptions;

    public server: Router;

    constructor(
        httpClient: AxiosInstance,
        {
            networkOnly = false,
            cacheOnly = false
        }: OfflineRequestOptions = {
            networkOnly: false,
            cacheOnly: false
        }
    ) {
        this.server = new Router();

        /**
         * 仅使用离线缓存或者仅使用网络请求的情况下，关闭轮询检测网络状态
         */
        this._network = new NetWork({
            enabled: !cacheOnly && !networkOnly
        });
        this._httpClient = httpClient;
        this._client = new OfflineRequestClient(this.server);
        this._options = {
            networkOnly,
            cacheOnly
        };
    }

    public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const { networkOnly, cacheOnly } = this._options;

        if (networkOnly || (!cacheOnly && this._network.isOnline)) {
            return this._httpClient.get(url, config);
        }
        return this._client.get(url, config);
    }

    public delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const { networkOnly, cacheOnly } = this._options;

        if (networkOnly || (!cacheOnly && this._network.isOnline)) {
            return this._httpClient.delete(url, config);
        }
        return this._client.delete(url, config);
    }

    public post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const { networkOnly, cacheOnly } = this._options;

        if (networkOnly || (!cacheOnly && this._network.isOnline)) {
            return this._httpClient.post(url, data, config);
        }
        return this._client.post(url, data, config);
    }

    public put(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const { networkOnly, cacheOnly } = this._options;

        if (networkOnly || (!cacheOnly && this._network.isOnline)) {
            return this._httpClient.put(url, data, config);
        }
        return this._client.put(url, data, config);
    }

    public patch(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const { networkOnly, cacheOnly } = this._options;

        if (networkOnly || (!cacheOnly && this._network.isOnline)) {
            return this._httpClient.patch(url, data, config);
        }
        return this._client.patch(url, data, config);
    }
}