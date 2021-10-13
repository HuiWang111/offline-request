import { qs } from '../src/utils';

describe('test qs', () => {
    it('qs.getQuery should work', () => {
        expect(qs.getQuery('/api/query?a=1&b=2&c=3')).toBe('a=1&b=2&c=3');
        expect(qs.getQuery('/api/query')).toBe('');
    });

    it('qs.parse should work', () => {
        expect(qs.parse(qs.getQuery('/api/query?a=1&b=2&c=3'))).toEqual({
            a: '1',
            b: '2',
            c: '3'
        });

        expect(qs.parse(qs.getQuery('/api/query'))).toEqual({});

        expect(qs.parse('')).toEqual({});
    });

    it('qs.split should work', () => {
        expect(qs.split('/api/query?a=1&b=2&c=3')).toEqual({
            pathname: '/api/query',
            qs: 'a=1&b=2&c=3'
        });

        expect(qs.split('/api/query')).toEqual({
            pathname: '/api/query',
            qs: ''
        });

        expect(qs.split('')).toEqual({});
    });
});
