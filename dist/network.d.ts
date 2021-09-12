/**
 * @reference https://github.com/cwise89/react-detect-offline/blob/master/src/index.js
 */
import { PollingConfig } from './interface';
export declare class NetWork {
    private _isOnline;
    private _pollingConfig;
    private _pollingId;
    constructor({ enabled, url, timeout, interval }?: PollingConfig);
    private setOnline;
    private setOffline;
    private addEvents;
    private startPolling;
    private ping;
    stopPolling(): void;
    get isOnline(): boolean;
    removeEvents(): void;
}
