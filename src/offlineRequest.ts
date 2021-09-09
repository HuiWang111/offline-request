import { Dexie } from 'dexie';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { NetWork } from './network';
import { Logger } from './logger';
import { DatabaseConfig } from './interface';

export class OfflineRequest {
    private _network: NetWork;
    private _httpClient: AxiosInstance;
    private _db: Dexie;
    private _url2tableMapping: Record<string, string>;

    constructor(
        httpClient: AxiosInstance,
        {
            dbName,
            schema,
            url2tableMapping,
            options,
            version
        }: DatabaseConfig
    ) {
        this._network = new NetWork();
        this._httpClient = httpClient;
        this._db = new Dexie(dbName, options);
        this._url2tableMapping = url2tableMapping;

        this._db.version(version || 1).stores(schema);

        Logger.remainingStorage();
    }

    public async get(url: string, config?: AxiosRequestConfig): Promise<void> {
        if (this._network.isOnline) {
            this._httpClient.get(url, config);
            return;
        }
    }
}