interface SplitResult {
    pathname?: string;
    qs?: string;
}

class QueryString {
    getQuery(url: string): string {
        if (!url) {
            return '';
        }

        const matched = url.match(/\?(.*)/);
        return matched ? matched[1] : '';
    }

    parse(qs: string): Record<string, unknown> {
        if (!qs) {
            return {};
        }

        const reg = /([^&=]+)(=([^&=]*))?/g;
        let p: RegExpExecArray | null;
        const object: Record<string, unknown> = {};

        while ((p = reg.exec(qs))) {
            const [, key, , value] = p;
            object[key] = value;
        }
    
        return object;
    }

    split(url: string): SplitResult {
        if (!url) {
            return {};
        }
        
        const res: RegExpExecArray | null = /(.*)\?(.*)/.exec(url);
        
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