/* eslint-disable no-console */
import { RequestMethod, RequestMethodType, RouterCallbackResponse, OfflineRequestOptions } from './interface';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export class Router {
    private _events: Map<string, (...args: any[]) => Promise<RouterCallbackResponse>>;

    constructor() {
        this._events = new Map();

        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
    }

    public get(url: string, callback: (...args: any[]) => Promise<RouterCallbackResponse>): void {
        this._events.set(`${RequestMethod.GET}:${url}`, callback);
    }

    public delete(url: string, callback: (...args: any[]) => Promise<RouterCallbackResponse>): void {
        this._events.set(`${RequestMethod.DELETE}:${url}`, callback);
    }

    public post(url: string, callback: (...args: any[]) => Promise<RouterCallbackResponse>): void {
        this._events.set(`${RequestMethod.POST}:${url}`, callback);
    }

    public put(url: string, callback: (...args: any[]) => Promise<RouterCallbackResponse>): void {
        this._events.set(`${RequestMethod.PUT}:${url}`, callback);
    }

    public patch(url: string, callback: (...args: any[]) => Promise<RouterCallbackResponse>): void {
        this._events.set(`${RequestMethod.PATCH}:${url}`, callback);
    }

    public async emit(method: RequestMethodType, url: string, options: OfflineRequestOptions, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        if (options.logRequestInfo) {
            if (typeof console.group === 'function') {
                console.group('offline request information')
                console.info(JSON.stringify({
                    method,
                    url,
                    data,
                    config
                }, null, 4));
                console.groupEnd();
            } else {
                console.info('offline request information');
                console.info(JSON.stringify({
                    method,
                    url,
                    data,
                    config
                }, null, 4));
            }
        }

        const eventType = `${RequestMethod[method]}:${url}`;
        const callback = this._events.get(eventType);

        if (callback) {
            const response: RouterCallbackResponse = await callback(data, config);
            
            return {
                ...response,
                headers: {},
                config: {},
                request: {}
            };
        }

        console.warn(`${eventType} has no callback`);
        return undefined;
    }
}