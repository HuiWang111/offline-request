import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NetWork } from './network';
import { OfflineRequestClient } from './client';
import { Router } from './server';

export class OfflineRequest {
    private _network: NetWork;
    private _httpClient: AxiosInstance;
    private _client: OfflineRequestClient;

    public server: Router;

    constructor(
        httpClient: AxiosInstance
    ) {
        this.server = new Router();

        this._network = new NetWork();
        this._httpClient = httpClient;
        this._client = new OfflineRequestClient(this.server);
    }

    public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (!this._network.isOnline) {
            return this._httpClient.get(url, config);
        }
        return this._client.get(url, config);
    }

    public delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (this._network.isOnline) {
            return this._httpClient.delete(url, config);
        }
        return this._client.delete(url, config);
    }

    public post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (this._network.isOnline) {
            return this._httpClient.post(url, data, config);
        }
        return this._client.post(url, data, config);
    }

    public put(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (!this._network.isOnline) {
            return this._httpClient.put(url, data, config);
        }
        return this._client.put(url, data, config);
    }

    public patch(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (this._network.isOnline) {
            return this._httpClient.patch(url, data, config);
        }
        return this._client.patch(url, data, config);
    }
}