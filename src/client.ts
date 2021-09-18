import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Request, OfflineRequestOptions } from './interface';
import { Router } from './server';

export class OfflineRequestClient implements Request {
    private _router: Router;

    constructor(router: Router) {
        this._router = router;
    }

    public get(url: string, options: OfflineRequestOptions, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._router.emit('GET', url, options, null, config);
    }

    public delete(url: string, options: OfflineRequestOptions, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._router.emit('DELETE', url, options, null, config);
    }

    public post(url: string, options: OfflineRequestOptions, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._router.emit('POST', url, options, data, config);
    }

    public put(url: string, options: OfflineRequestOptions, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._router.emit('PUT', url, options, data, config);
    }
    
    public patch(url: string, options: OfflineRequestOptions, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._router.emit('PATCH', url, options, data, config);
    }
}
