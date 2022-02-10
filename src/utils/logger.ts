/* eslint-disable no-console */
export class Logger {
    static json(
        data: Record<string, unknown>,
        comment: string,
        shouldLog = true
    ): void {
        if (!shouldLog) return;

        if (typeof console.group === 'function') {
            console.group(comment);
            console.info(JSON.stringify(data, null, 4));
            console.groupEnd();
        } else {
            console.info(comment);
            console.info(JSON.stringify(data, null, 4));
        }
    }
}