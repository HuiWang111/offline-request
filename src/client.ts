import { Request } from './interface';
import { router } from './app';
import { Emitter } from './emitter';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export class OfflineRequestClient implements Request {
    private _emitter: Emitter;

    constructor() {
        this._emitter = new Emitter(router);
    }

    public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._emitter.get(url, config);
    }

    public delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._emitter.delete(url, config);
    }

    public post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._emitter.post(url, data, config);
    }

    public put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._emitter.put(url, data, config);
    }
    
    public patch(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._emitter.patch(url, data, config);
    }
}
