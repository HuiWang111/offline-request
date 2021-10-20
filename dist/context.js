export class Context {
    constructor(resolve, query, qs, data, config) {
        this._resolve = resolve;
        this.query = query;
        this.qs = qs;
        this.data = data;
        this.config = config;
    }
    set body(res) {
        this._resolve(res);
    }
}
