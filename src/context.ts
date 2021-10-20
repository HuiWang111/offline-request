import { AxiosRequestConfig } from 'axios';
import { RouterCallbackResponse } from './interface';

export class Context {
    public query: Record<string, unknown>;
    public qs: string;
    public data?: unknown;
    public config?: AxiosRequestConfig;

    private _resolve: (data: any) => void;

    constructor(
        resolve: (data: any) => void,
        query: Record<string, unknown>,
        qs: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ) {
        this._resolve = resolve;
        this.query = query;
        this.qs = qs;
        this.data = data;
        this.config = config;
    }

    set body(res: RouterCallbackResponse) {
        this._resolve(res);
    }
}