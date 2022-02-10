import { AxiosRequestConfig } from 'axios';
import { ContextRequest } from './interface';
export declare class Request implements ContextRequest {
    query: Record<string, unknown>;
    qs: string;
    data?: unknown;
    pathname: string;
    config?: AxiosRequestConfig | undefined;
    method: string;
    constructor(pathname: string, method: string, query: Record<string, unknown>, qs: string, data?: unknown, config?: AxiosRequestConfig);
}
