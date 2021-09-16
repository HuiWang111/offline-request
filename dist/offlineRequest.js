import { OfflineRequestClient } from './client';
import { Router } from './server';
export class OfflineRequest {
    constructor(httpClient, isOnline) {
        this._server = new Router();
        this._httpClient = httpClient;
        this._cacheClient = new OfflineRequestClient(this._server);
        this._isOnline = isOnline;
    }
    get(url, config) {
        if (this._isOnline()) {
            return this._httpClient.get(url, config);
        }
        return this._cacheClient.get(url, config);
    }
    delete(url, config) {
        if (this._isOnline()) {
            return this._httpClient.delete(url, config);
        }
        return this._cacheClient.delete(url, config);
    }
    post(url, data, config) {
        if (this._isOnline()) {
            return this._httpClient.post(url, data, config);
        }
        return this._cacheClient.post(url, data, config);
    }
    put(url, data, config) {
        if (this._isOnline()) {
            return this._httpClient.put(url, data, config);
        }
        return this._cacheClient.put(url, data, config);
    }
    patch(url, data, config) {
        if (this._isOnline()) {
            return this._httpClient.patch(url, data, config);
        }
        return this._cacheClient.patch(url, data, config);
    }
    get server() {
        return {
            get: this._server.get,
            delete: this._server.delete,
            post: this._server.post,
            put: this._server.put,
            patch: this._server.patch
        };
    }
}
