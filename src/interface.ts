import { DexieOptions } from 'dexie';

interface DBSchema {
    [tableName: string]: string | null;
}

export interface DatabaseConfig {
    dbName: string;
    schema: DBSchema;
    url2tableMapping: Record<string, string>;
    options?: DexieOptions;
    version?: number;
}

export interface Options {
    strict?: boolean;
}

export interface PollingConfig {
    enabled?: boolean;
    url?: string;
    timeout?: number;
    interval?: number;
}