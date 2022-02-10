import { AxiosRequestConfig } from 'axios';
import { RouterCallbackResponse } from './interface';
import { Request } from './request';

export class Context {
    public request: Request;
    
    private _resolve: (data: any) => void;

    constructor(
        resolve: (data: any) => void,
        pathname: string,
        method: string,
        query: Record<string, unknown>,
        qs: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ) {
        this._resolve = resolve;
        this.request = new Request(
            pathname,
            method,
            query,
            qs,
            data,
            config
        );
    }

    set body(res: RouterCallbackResponse) {
        this._resolve(res);
    }
}