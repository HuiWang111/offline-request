import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Request } from './interface';
import { Router } from './server';

export class OfflineRequestClient implements Request {
    private _router: Router;

    constructor(router: Router) {
        this._router = router;
    }

    public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._router.emit('GET', url, null, config);
    }

    public delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._router.emit('DELETE', url, null, config);
    }

    public post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._router.emit('POST', url, data, config);
    }

    public put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._router.emit('PUT', url, data, config);
    }
    
    public patch(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        return this._router.emit('PATCH', url, data, config);
    }
}
