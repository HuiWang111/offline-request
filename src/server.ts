import { RequestMethod, RequestMethodType, OfflineRequestOptions, RouterCallback, RouterCallbackResponse } from './interface';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { qs, Logger } from './utils';
import { Context } from './context';

export class Router {
    private _events: Map<string, RouterCallback>;

    constructor() {
        this._events = new Map();

        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
    }

    /**
     * 为了实现通过 ctx.body = {} 的形式将值返回给client端
     * 这里在回调外面包一层，将resolve的权限递交给Context
     */
    private _callbackWrapper(
        callback: RouterCallback,
        pathname: string,
        method: string,
        query: Record<string, unknown>,
        qs: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<RouterCallbackResponse> {
        return new Promise((resolve) => {
            const ctx = new Context(
                resolve,
                pathname,
                method,
                query,
                qs,
                data,
                config
            );

            callback(ctx);
        });
    }

    public get(url: string, callback: RouterCallback): void {
        this._events.set(`${RequestMethod.GET}:${url}`, callback);
    }

    public delete(url: string, callback: RouterCallback): void {
        this._events.set(`${RequestMethod.DELETE}:${url}`, callback);
    }

    public post(url: string, callback: RouterCallback): void {
        this._events.set(`${RequestMethod.POST}:${url}`, callback);
    }

    public put(url: string, callback: RouterCallback): void {
        this._events.set(`${RequestMethod.PUT}:${url}`, callback);
    }

    public patch(url: string, callback: RouterCallback): void {
        this._events.set(`${RequestMethod.PATCH}:${url}`, callback);
    }

    public async emit(
        method: RequestMethodType,
        url: string,
        options: OfflineRequestOptions,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse | undefined> {
        const { pathname, qs: queryString } = qs.split(url);
        const query = qs.parse(queryString || '');

        Logger.json(
            { method, pathname, data, config, query },
            'offline request information',
            options.logRequestInfo
        );

        
        const eventType = `${RequestMethod[method]}:${pathname}`;
        const callback = this._events.get(eventType);
        

        if (callback) {
            const response = await this._callbackWrapper(
                callback,
                pathname as string,
                method,
                query,
                queryString || '',
                data,
                config
            );
            
            return {
                ...response,
                headers: {},
                config: {},
                request: {}
            };
        }

        return {
            data: null,
            status: 404,
            statusText: 'Not Found',
            headers: {},
            config: {},
            request: {}
        };
    }
}