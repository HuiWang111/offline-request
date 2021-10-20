import { AxiosRequestConfig } from 'axios';
import { RouterCallbackResponse } from './interface';
export declare class Context {
    query: Record<string, unknown>;
    qs: string;
    data?: unknown;
    config?: AxiosRequestConfig;
    private _resolve;
    constructor(resolve: (data: any) => void, query: Record<string, unknown>, qs: string, data?: unknown, config?: AxiosRequestConfig);
    set body(res: RouterCallbackResponse);
}
