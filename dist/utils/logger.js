export class Logger {
    static json(data, comment, shouldLog = true) {
        if (!shouldLog)
            return;
        if (typeof console.group === 'function') {
            console.group(comment);
            console.info(JSON.stringify(data, null, 4));
            console.groupEnd();
        }
        else {
            console.info(comment);
            console.info(JSON.stringify(data, null, 4));
        }
    }
}
