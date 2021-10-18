import { AxiosRequestConfig } from 'axios';

export class Context {
    public query: Record<string, unknown>;
    public qs: string;
    public data?: unknown;
    public config?: AxiosRequestConfig; 

    constructor(
        query: Record<string, unknown>,
        qs: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ) {
        this.query = query;
        this.qs = qs;
        this.data = data;
        this.config = config;
    }
}