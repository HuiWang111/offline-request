var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RequestMethod } from './interface';
import { qs, Logger } from './utils';
import { Context } from './context';
export class Router {
    constructor() {
        this._events = new Map();
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
    }
    _callbackWrapper(callback, pathname, method, query, qs, data, config) {
        return new Promise((resolve) => {
            const ctx = new Context(resolve, pathname, method, query, qs, data, config);
            callback(ctx);
        });
    }
    get(url, callback) {
        this._events.set(`${RequestMethod.GET}:${url}`, callback);
    }
    delete(url, callback) {
        this._events.set(`${RequestMethod.DELETE}:${url}`, callback);
    }
    post(url, callback) {
        this._events.set(`${RequestMethod.POST}:${url}`, callback);
    }
    put(url, callback) {
        this._events.set(`${RequestMethod.PUT}:${url}`, callback);
    }
    patch(url, callback) {
        this._events.set(`${RequestMethod.PATCH}:${url}`, callback);
    }
    emit(method, url, options, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pathname, qs: queryString } = qs.split(url);
            const query = qs.parse(queryString || '');
            Logger.json({ method, pathname, data, config, query }, 'offline request information', options.logRequestInfo);
            const eventType = `${RequestMethod[method]}:${pathname}`;
            const callback = this._events.get(eventType);
            if (callback) {
                const response = yield this._callbackWrapper(callback, pathname, method, query, queryString || '', data, config);
                return Object.assign(Object.assign({}, response), { headers: {}, config: {}, request: {} });
            }
            return {
                data: null,
                status: 404,
                statusText: 'Not Found',
                headers: {},
                config: {},
                request: {}
            };
        });
    }
}
