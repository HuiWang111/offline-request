interface SplitResult {
    pathname?: string;
    qs?: string;
}
declare class QueryString {
    getQuery(url: string): string;
    parse(qs: string): Record<string, unknown>;
    split(url: string): SplitResult;
}
export declare const qs: QueryString;
export {};
