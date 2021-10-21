import { AxiosRequestConfig } from 'axios';
import { ContextRequest } from './interface';

export class Request implements ContextRequest {
    public query: Record<string, unknown>;
    public qs: string;
    public data?: unknown;
    public pathname: string;
    public config?: AxiosRequestConfig | undefined;
    public method: string;
    
    constructor(
        pathname: string,
        method: string,
        query: Record<string, unknown>,
        qs: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ) {
        this.pathname = pathname;
        this.method = method;
        this.query = query;
        this.qs = qs;
        this.data = data;
        this.config = config;
    }
}
