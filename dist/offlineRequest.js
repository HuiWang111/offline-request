var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OfflineRequestClient } from './client';
import { Router } from './server';
export class OfflineRequest {
    constructor(httpClient, isOnline, { logRequestInfo = true } = {
        logRequestInfo: true
    }) {
        this._server = new Router();
        this._httpClient = httpClient;
        this._cacheClient = new OfflineRequestClient(this._server);
        this._options = {
            logRequestInfo
        };
        this.isOnline = isOnline;
    }
    get(url, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const isOnline = yield this.isOnline();
            if (isOnline) {
                return this._httpClient.get(url, config);
            }
            return this._cacheClient.get(url, this._options, config);
        });
    }
    delete(url, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const isOnline = yield this.isOnline();
            if (isOnline) {
                return this._httpClient.delete(url, config);
            }
            return this._cacheClient.delete(url, this._options, config);
        });
    }
    post(url, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const isOnline = yield this.isOnline();
            if (isOnline) {
                return this._httpClient.post(url, data, config);
            }
            return this._cacheClient.post(url, this._options, data, config);
        });
    }
    put(url, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const isOnline = yield this.isOnline();
            if (isOnline) {
                return this._httpClient.put(url, data, config);
            }
            return this._cacheClient.put(url, this._options, data, config);
        });
    }
    patch(url, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const isOnline = yield this.isOnline();
            if (isOnline) {
                return this._httpClient.patch(url, data, config);
            }
            return this._cacheClient.patch(url, this._options, data, config);
        });
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
