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
export class Router {
    constructor() {
        this._events = new Map();
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
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
            if (options.logRequestInfo) {
                if (typeof console.group === 'function') {
                    console.group('offline request information');
                    console.info(JSON.stringify({
                        method,
                        url,
                        data,
                        config
                    }, null, 4));
                    console.groupEnd();
                }
                else {
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
                const response = yield callback(data, config);
                return Object.assign(Object.assign({}, response), { headers: {}, config: {}, request: {} });
            }
            console.warn(`${eventType} has no callback`);
            return undefined;
        });
    }
}
