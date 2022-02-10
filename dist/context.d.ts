import { AxiosRequestConfig } from 'axios';
import { RouterCallbackResponse } from './interface';
import { Request } from './request';
export declare class Context {
    request: Request;
    private _resolve;
    constructor(resolve: (data: any) => void, pathname: string, method: string, query: Record<string, unknown>, qs: string, data?: unknown, config?: AxiosRequestConfig);
    set body(res: RouterCallbackResponse);
}
