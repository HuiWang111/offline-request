class QueryString {
    getQuery(url) {
        if (!url) {
            return '';
        }
        const matched = url.match(/\?(.*)/);
        return matched ? matched[1] : '';
    }
    parse(qs) {
        if (!qs) {
            return {};
        }
        const reg = /([^&=]+)(=([^&=]*))?/g;
        let p;
        const object = {};
        while ((p = reg.exec(qs))) {
            const [, key, , value] = p;
            object[key] = value;
        }
        return object;
    }
    split(url) {
        if (!url) {
            return {};
        }
        const res = /(.*)\?(.*)/.exec(url);
        if (!res) {
            return {
                pathname: url,
                qs: ''
            };
        }
        return {
            pathname: res[1],
            qs: res[2]
        };
    }
}
export const qs = new QueryString();
