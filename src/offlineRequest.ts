import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { NetWork } from './network';
import { Logger } from './logger';
import { OfflineRequestClient } from './client';

export class OfflineRequest {
    private _network: NetWork;
    private _httpClient: AxiosInstance;
    private _offlineClient: OfflineRequestClient;

    constructor(
        httpClient: AxiosInstance,
        offlineClient: OfflineRequestClient
    ) {
        this._network = new NetWork();
        this._httpClient = httpClient;
        this._offlineClient = offlineClient;

        Logger.remainingStorage();
    }

    public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (this._network.isOnline) {
            return this._httpClient.get(url, config);
        }

        return this._offlineClient.get(url, config);
    }
}