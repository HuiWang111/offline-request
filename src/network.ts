export class NetWork {
    private _isOnline = false;

    constructor() {
        if (typeof window.navigator.onLine !== 'undefined') {
            console.warn('浏览器不支持window.navigator.onLine属性');
        }

        this._isOnline = window.navigator.onLine;

        this.listenEvents();
    }

    private listenEvents() {
        window.addEventListener('online', () => {
            this._isOnline = true;
        });

        window.addEventListener('offline', () => {
            this._isOnline = false;
        });
    }

    get isOnline() {
        return this._isOnline;
    }
}