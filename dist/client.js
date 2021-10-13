export class OfflineRequestClient {
    constructor(router) {
        this._router = router;
    }
    get(url, options, config) {
        return this._router.emit('GET', url, options, null, config);
    }
    delete(url, options, config) {
        return this._router.emit('DELETE', url, options, null, config);
    }
    post(url, options, data, config) {
        return this._router.emit('POST', url, options, data, config);
    }
    put(url, options, data, config) {
        return this._router.emit('PUT', url, options, data, config);
    }
    patch(url, options, data, config) {
        return this._router.emit('PATCH', url, options, data, config);
    }
}
