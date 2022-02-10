import { RequestMethodType, OfflineRequestOptions, RouterCallback } from './interface';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
export declare class Router {
    private _events;
    constructor();
    private _callbackWrapper;
    get(url: string, callback: RouterCallback): void;
    delete(url: string, callback: RouterCallback): void;
    post(url: string, callback: RouterCallback): void;
    put(url: string, callback: RouterCallback): void;
    patch(url: string, callback: RouterCallback): void;
    emit(method: RequestMethodType, url: string, options: OfflineRequestOptions, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
}
