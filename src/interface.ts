export interface DatabaseConfig {
    dbName: string;
    /**
     * indexDB 的 version 每一次更新数据库都会更新版本号
     * 这意味着更新数据库后下一次调用 open命令时需要使用新的版本号
     */
    version?: number;
}