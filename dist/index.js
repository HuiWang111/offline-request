var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/index.ts
__export(exports, {
  default: () => src_default
});

// src/network.ts
var isBrowser = typeof navigator !== "undefined";
var defaultPollingConfig = {
  enabled: true,
  url: "https://httpbin.org/get",
  timeout: 5e3,
  interval: 5e3
};
var NetWork = class {
  constructor({
    enabled = defaultPollingConfig.enabled,
    url = defaultPollingConfig.url,
    timeout = defaultPollingConfig.timeout,
    interval = defaultPollingConfig.interval
  } = defaultPollingConfig) {
    this._pollingId = null;
    this._isOnline = isBrowser && typeof navigator.onLine === "boolean" ? navigator.onLine : true;
    this._pollingConfig = {
      enabled,
      url,
      timeout,
      interval
    };
    this.addEvents();
    this.startPolling();
  }
  setOnline() {
    this._isOnline = true;
  }
  setOffline() {
    this._isOnline = false;
  }
  addEvents() {
    window.addEventListener("online", this.setOnline);
    window.addEventListener("offline", this.setOffline);
  }
  startPolling() {
    const { enabled, url, timeout, interval } = this._pollingConfig;
    if (!enabled) {
      return;
    }
    this._pollingId = setInterval(async () => {
      try {
        if (this._pollingId) {
          this.stopPolling();
        }
        const isOnline = await this.ping(url, timeout);
        this._isOnline = isOnline;
      } catch (e) {
        console.error(e);
      }
    }, interval);
  }
  ping(url, timeout) {
    return new Promise((resolve) => {
      const isOnline = () => resolve(true);
      const isOffline = () => resolve(false);
      const xhr = new XMLHttpRequest();
      xhr.onerror = isOffline;
      xhr.ontimeout = isOffline;
      xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.HEADERS_RECEIVED) {
          if (xhr.status) {
            isOnline();
          } else {
            isOffline();
          }
        }
      };
      xhr.open("GET", url);
      xhr.timeout = timeout;
      xhr.send();
    });
  }
  stopPolling() {
    if (this._pollingId) {
      clearInterval(this._pollingId);
      this._pollingId = null;
    }
  }
  get isOnline() {
    return this._isOnline;
  }
  removeEvents() {
    window.removeEventListener("online", this.setOnline);
    window.removeEventListener("offline", this.setOffline);
  }
};

// src/client.ts
var OfflineRequestClient = class {
  constructor(router) {
    this._router = router;
  }
  get(url, config) {
    return this._router.emit("GET", url, null, config);
  }
  delete(url, config) {
    return this._router.emit("DELETE", url, null, config);
  }
  post(url, data, config) {
    return this._router.emit("POST", url, data, config);
  }
  put(url, data, config) {
    return this._router.emit("PUT", url, data, config);
  }
  patch(url, data, config) {
    return this._router.emit("PATCH", url, data, config);
  }
};

// src/interface.ts
var RequestMethod;
(function(RequestMethod2) {
  RequestMethod2[RequestMethod2["GET"] = 0] = "GET";
  RequestMethod2[RequestMethod2["DELETE"] = 1] = "DELETE";
  RequestMethod2[RequestMethod2["POST"] = 2] = "POST";
  RequestMethod2[RequestMethod2["PUT"] = 3] = "PUT";
  RequestMethod2[RequestMethod2["PATCH"] = 4] = "PATCH";
})(RequestMethod || (RequestMethod = {}));

// src/server.ts
var Router = class {
  constructor() {
    this._events = new Map();
  }
  get(url, callback) {
    this._events.set(`${RequestMethod.GET}:${url}`, callback);
  }
  delete(url, callback) {
    this._events.set(`${RequestMethod.DELETE}:${url}`, callback);
  }
  post(url, callback) {
    this._events.set(`${RequestMethod.POST}:${url}`, callback);
  }
  put(url, callback) {
    this._events.set(`${RequestMethod.PUT}:${url}`, callback);
  }
  patch(url, callback) {
    this._events.set(`${RequestMethod.PATCH}:${url}`, callback);
  }
  async emit(method, url, data, config) {
    const eventType = `${RequestMethod[method]}:${url}`;
    const callback = this._events.get(eventType);
    if (callback) {
      const response = await callback(data, config);
      return __spreadProps(__spreadValues({}, response), {
        headers: {},
        config: {},
        request: {}
      });
    }
    console.warn(`${eventType} has no callback`);
    return void 0;
  }
};

// src/offlineRequest.ts
var OfflineRequest = class {
  constructor(httpClient, {
    networkOnly = false,
    cacheOnly = false
  } = {
    networkOnly: false,
    cacheOnly: false
  }) {
    this.server = new Router();
    this._network = new NetWork({
      enabled: !cacheOnly && !networkOnly
    });
    this._httpClient = httpClient;
    this._client = new OfflineRequestClient(this.server);
    this._options = {
      networkOnly,
      cacheOnly
    };
  }
  get(url, config) {
    const { networkOnly, cacheOnly } = this._options;
    if (networkOnly || !cacheOnly && this._network.isOnline) {
      return this._httpClient.get(url, config);
    }
    return this._client.get(url, config);
  }
  delete(url, config) {
    const { networkOnly, cacheOnly } = this._options;
    if (networkOnly || !cacheOnly && this._network.isOnline) {
      return this._httpClient.delete(url, config);
    }
    return this._client.delete(url, config);
  }
  post(url, data, config) {
    const { networkOnly, cacheOnly } = this._options;
    if (networkOnly || !cacheOnly && this._network.isOnline) {
      return this._httpClient.post(url, data, config);
    }
    return this._client.post(url, data, config);
  }
  put(url, data, config) {
    const { networkOnly, cacheOnly } = this._options;
    if (networkOnly || !cacheOnly && this._network.isOnline) {
      return this._httpClient.put(url, data, config);
    }
    return this._client.put(url, data, config);
  }
  patch(url, data, config) {
    const { networkOnly, cacheOnly } = this._options;
    if (networkOnly || !cacheOnly && this._network.isOnline) {
      return this._httpClient.patch(url, data, config);
    }
    return this._client.patch(url, data, config);
  }
};

// src/index.ts
var src_default = OfflineRequest;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
