import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { OfflineRequestClient } from './client';
import { Router } from './server';
import { OfflineRequestServer } from './interface';

export class OfflineRequest {
    private _httpClient: AxiosInstance;
    private _cacheClient: OfflineRequestClient;
    private _server: Router;
    private _isOnline: () => boolean;

    constructor(
        httpClient: AxiosInstance,
        isOnline: () => boolean
    ) {
        this._server = new Router();
        this._httpClient = httpClient;
        this._cacheClient = new OfflineRequestClient(this._server);
        this._isOnline = isOnline;
    }

    public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (this._isOnline()) {
            return this._httpClient.get(url, config);
        }
        return this._cacheClient.get(url, config);
    }

    public delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (this._isOnline()) {
            return this._httpClient.delete(url, config);
        }
        return this._cacheClient.delete(url, config);
    }

    public post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (this._isOnline()) {
            return this._httpClient.post(url, data, config);
        }
        return this._cacheClient.post(url, data, config);
    }

    public put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (this._isOnline()) {
            return this._httpClient.put(url, data, config);
        }
        return this._cacheClient.put(url, data, config);
    }

    public patch(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (this._isOnline()) {
            return this._httpClient.patch(url, data, config);
        }
        return this._cacheClient.patch(url, data, config);
    }

    public get server(): OfflineRequestServer {
        return {
            get: this._server.get,
            delete: this._server.delete,
            post: this._server.post,
            put: this._server.put,
            patch: this._server.patch
        };
    }
}