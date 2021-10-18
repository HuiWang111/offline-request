import { RequestMethod, RequestMethodType, OfflineRequestOptions, RouterCallback } from './interface';
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
        Logger.json(
            { method, url, data, config },
            'offline request information',
            options.logRequestInfo
        );

        const { pathname, qs: queryString } = qs.split(url);
        const eventType = `${RequestMethod[method]}:${pathname}`;
        const callback = this._events.get(eventType);
        const ctx = new Context(
            qs.parse(queryString || ''),
            queryString || '',
            data,
            config
        );

        if (callback) {
            const response = await callback(ctx);
            
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