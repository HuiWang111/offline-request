import { PollingConfig } from './interface';
export declare class NetWork {
    private _isOnline;
    private _pollingConfig;
    private _pollingId;
    constructor({ enabled, url, timeout, interval }?: PollingConfig);
    private setOnline;
    private setOffline;
    addEvents(): void;
    startPolling(): void;
    ping(): Promise<boolean>;
    stopPolling(): void;
    get isOnline(): boolean;
    removeEvents(): void;
}
