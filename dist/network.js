var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const isBrowser = typeof navigator !== 'undefined';
const defaultPollingConfig = {
    enabled: true,
    url: 'https://httpbin.org/get',
    timeout: 5000,
    interval: 5000
};
export class NetWork {
    constructor({ enabled = defaultPollingConfig.enabled, url = defaultPollingConfig.url, timeout = defaultPollingConfig.timeout, interval = defaultPollingConfig.interval } = defaultPollingConfig) {
        this._pollingId = null;
        this._isOnline = isBrowser && typeof navigator.onLine === 'boolean'
            ? navigator.onLine
            : true;
        this._pollingConfig = {
            enabled,
            url,
            timeout,
            interval
        };
        this.addEvents();
        this.startPolling();
    }
    setOnline() {
        this._isOnline = true;
    }
    setOffline() {
        this._isOnline = false;
    }
    addEvents() {
        window.addEventListener('online', this.setOnline);
        window.addEventListener('offline', this.setOffline);
    }
    startPolling() {
        const { enabled, url, timeout, interval } = this._pollingConfig;
        if (!enabled) {
            return;
        }
        this._pollingId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._pollingId) {
                    this.stopPolling();
                }
                const isOnline = yield this.ping(url, timeout);
                this._isOnline = isOnline;
            }
            catch (e) {
                console.error(e);
            }
        }), interval);
    }
    ping(url, timeout) {
        return new Promise((resolve) => {
            const isOnline = () => resolve(true);
            const isOffline = () => resolve(false);
            const xhr = new XMLHttpRequest();
            xhr.onerror = isOffline;
            xhr.ontimeout = isOffline;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.HEADERS_RECEIVED) {
                    if (xhr.status) {
                        isOnline();
                    }
                    else {
                        isOffline();
                    }
                }
            };
            xhr.open('GET', url);
            xhr.timeout = timeout;
            xhr.send();
        });
    }
    stopPolling() {
        if (this._pollingId) {
            clearInterval(this._pollingId);
            this._pollingId = null;
        }
    }
    get isOnline() {
        return this._isOnline;
    }
    removeEvents() {
        window.removeEventListener('online', this.setOnline);
        window.removeEventListener('offline', this.setOffline);
    }
}
