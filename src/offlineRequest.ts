import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { OfflineRequestClient } from './client';
import { Router } from './server';
import { OfflineRequestServer, OfflineRequestOptions } from './interface';

export class OfflineRequest {
    private _httpClient: AxiosInstance;
    private _cacheClient: OfflineRequestClient;
    private _server: Router;
    private _options: OfflineRequestOptions;

    public isOnline: () => Promise<boolean> | boolean;

    constructor(
        httpClient: AxiosInstance,
        isOnline: () => Promise<boolean> | boolean,
        {
            logRequestInfo = true
        }: OfflineRequestOptions = {
            logRequestInfo: true
        }
    ) {
        this._server = new Router();
        this._httpClient = httpClient;
        this._cacheClient = new OfflineRequestClient(this._server);
        this._options = {
            logRequestInfo
        }
        this.isOnline = isOnline;
    }

    public async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const isOnline = await this.isOnline();

        if (isOnline) {
            return this._httpClient.get(url, config);
        }
        return this._cacheClient.get(url, this._options, config);
    }

    public async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const isOnline = await this.isOnline();

        if (isOnline) {
            return this._httpClient.delete(url, config);
        }
        return this._cacheClient.delete(url, this._options, config);
    }

    public async post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const isOnline = await this.isOnline();

        if (isOnline) {
            return this._httpClient.post(url, data, config);
        }
        return this._cacheClient.post(url, this._options, data, config);
    }

    public async put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const isOnline = await this.isOnline();

        if (isOnline) {
            return this._httpClient.put(url, data, config);
        }
        return this._cacheClient.put(url, this._options, data, config);
    }

    public async patch(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const isOnline = await this.isOnline();

        if (isOnline) {
            return this._httpClient.patch(url, data, config);
        }
        return this._cacheClient.patch(url, this._options, data, config);
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