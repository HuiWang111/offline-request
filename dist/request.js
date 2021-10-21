export class Request {
    constructor(pathname, method, query, qs, data, config) {
        this.pathname = pathname;
        this.method = method;
        this.query = query;
        this.qs = qs;
        this.data = data;
        this.config = config;
    }
}
