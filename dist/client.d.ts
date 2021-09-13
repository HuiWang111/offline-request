import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Request } from './interface';
import { Router } from './server';
export declare class OfflineRequestClient implements Request {
    private _router;
    constructor(router: Router);
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
    patch(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
}
