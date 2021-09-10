import { RequestMethod, RequestMethodType, RouterCallbackResponse } from './interface';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export class Router {
    private _events: Map<string, (...args: any[]) => Promise<RouterCallbackResponse>>;

    constructor() {
        this._events = new Map();
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

    public async emit(method: RequestMethodType, url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
        const callback = this._events.get(`${RequestMethod[method]}:${url}`);

        if (callback) {
            const response: RouterCallbackResponse = await callback(data, config);
            
            return {
                ...response,
                headers: {},
                config: {},
                request: {}
            };
        }
        return undefined;
    }
}