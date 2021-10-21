import { Request } from './request';
export class Context {
    constructor(resolve, pathname, method, query, qs, data, config) {
        this._resolve = resolve;
        this.request = new Request(pathname, method, query, qs, data, config);
    }
    set body(res) {
        this._resolve(res);
    }
}
