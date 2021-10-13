import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Request, OfflineRequestOptions } from './interface';
import { Router } from './server';
export declare class OfflineRequestClient implements Request {
    private _router;
    constructor(router: Router);
    get(url: string, options: OfflineRequestOptions, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    delete(url: string, options: OfflineRequestOptions, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    post(url: string, options: OfflineRequestOptions, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    put(url: string, options: OfflineRequestOptions, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    patch(url: string, options: OfflineRequestOptions, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
}
