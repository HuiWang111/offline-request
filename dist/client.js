export class OfflineRequestClient {
    constructor(router) {
        this._router = router;
    }
    get(url, config) {
        return this._router.emit('GET', url, null, config);
    }
    delete(url, config) {
        return this._router.emit('DELETE', url, null, config);
    }
    post(url, data, config) {
        return this._router.emit('POST', url, data, config);
    }
    put(url, data, config) {
        return this._router.emit('PUT', url, data, config);
    }
    patch(url, data, config) {
        return this._router.emit('PATCH', url, data, config);
    }
}
