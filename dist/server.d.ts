import { RequestMethodType, RouterCallbackResponse, OfflineRequestOptions } from './interface';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
export declare class Router {
    private _events;
    constructor();
    get(url: string, callback: (...args: any[]) => Promise<RouterCallbackResponse>): void;
    delete(url: string, callback: (...args: any[]) => Promise<RouterCallbackResponse>): void;
    post(url: string, callback: (...args: any[]) => Promise<RouterCallbackResponse>): void;
    put(url: string, callback: (...args: any[]) => Promise<RouterCallbackResponse>): void;
    patch(url: string, callback: (...args: any[]) => Promise<RouterCallbackResponse>): void;
    emit(method: RequestMethodType, url: string, options: OfflineRequestOptions, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
}
