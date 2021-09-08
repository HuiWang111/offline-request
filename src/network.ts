/**
 * @reference https://github.com/cwise89/react-detect-offline/blob/master/src/index.js
 */
import { PollingConfig } from './interface';

const isBrowser = typeof navigator !== 'undefined';
const defaultPollingConfig: PollingConfig = {
    enabled: true,
    url: 'https://httpbin.org/get',
    timeout: 5000,
    interval: 5000
};

export class NetWork {
    private _isOnline: boolean;
    private _pollingConfig: PollingConfig;
    private _pollingId: number | null = null;

    constructor({
        enabled = defaultPollingConfig.enabled,
        url = defaultPollingConfig.url,
        timeout = defaultPollingConfig.timeout,
        interval = defaultPollingConfig.interval
    }: PollingConfig = defaultPollingConfig) {
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

    private setOnline(): void {
        this._isOnline = true;
    }

    private setOffline(): void {
        this._isOnline = false;
    }

    private addEvents(): void {
        window.addEventListener('online', this.setOnline);
        window.addEventListener('offline', this.setOffline);
    }

    private startPolling(): void {
        const { enabled, url, timeout, interval } = this._pollingConfig;

        if (!enabled) {
            return;
        }

        this._pollingId = setInterval(async () => {
            try {
                if (this._pollingId) {
                    this.stopPolling();
                }

                const isOnline = await this.ping(url as string, timeout as number);
                this._isOnline = isOnline;
            } catch (e) {
                console.error(e);
            }
        }, interval);
    }

    private ping(url: string, timeout: number): Promise<boolean> {
        return new Promise((resolve) => {
            const isOnline = () => resolve(true);
            const isOffline = () => resolve(false);

            const xhr = new XMLHttpRequest();

            xhr.onerror = isOffline;
            xhr.ontimeout = isOffline;
            xhr.onreadystatechange = function() {
                if (xhr.readyState === xhr.HEADERS_RECEIVED) {
                    if (xhr.status) {
                        isOnline();
                    } else {
                        isOffline();
                    }
                }
            };

            xhr.open('GET', url);
            xhr.timeout = timeout;
            xhr.send();
        })
    }

    public stopPolling(): void {
        if (this._pollingId) {
            clearInterval(this._pollingId);
            this._pollingId = null;
        }
    }

    public get isOnline(): boolean {
        return this._isOnline;
    }

    public removeEvents(): void {
        window.removeEventListener('online', this.setOnline);
        window.removeEventListener('offline', this.setOffline);
    }
}