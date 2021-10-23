import OfflineRequest from '../src';
import axios from 'axios';

const offlineRequest = new OfflineRequest(axios, () => false, { logRequestInfo: false });
const router = offlineRequest.server;
let query;
let data;
let params;
const response = {
    data: 'ok',
    status: 200,
    statusText: 'ok'
};

const getFn = jest.fn();
router.get('/api/test', async (ctx): Promise<void> => {
    query = ctx.request.query;
    params = ctx.request.config?.params;
    getFn();
    ctx.body = { ...response };
});

const postFn = jest.fn();
router.post('/api/test', async (ctx): Promise<void> => {
    data = ctx.request.data;
    postFn();
    ctx.body = { ...response };
});

const patchFn = jest.fn();
router.patch('/api/test', async (ctx): Promise<void> => {
    data = ctx.request.data;
    patchFn();
    ctx.body = { ...response };
});

const putFn = jest.fn();
router.put('/api/test', async (ctx): Promise<void> => {
    data = ctx.request.data;
    putFn();
    ctx.body = { ...response };
});

const deleteFn = jest.fn();
router.delete('/api/test', async (ctx): Promise<void> => {
    data = ctx.request.data;
    deleteFn();
    ctx.body = { ...response };
});

describe('test offlineRequest', () => {
    it('offlineRequest.get should work', async () => {
        const p = { c: 3 };
        await offlineRequest.get('/api/test?a=1&b=2', { params: p });
        expect(query).toEqual({
            a: "1",
            b: "2"
        });
        expect(params).toEqual(p);
        expect(getFn).toBeCalledTimes(1);
    });

    it('offlineRequest.post should work', async () => {
        const d = { a: 1, b: 2 };
        const res = await offlineRequest.post('/api/test', { ...d });
        expect(data).toEqual(d);
        expect(res?.data).toBe('ok');
        expect(postFn).toBeCalledTimes(1);
    });

    it('offlineRequest.patch should work', async () => {
        const d = { x: 1, y: 2 };
        await offlineRequest.patch('/api/test', { ...d });
        expect(data).toEqual(d);
        expect(patchFn).toBeCalledTimes(1);
    });

    it('offlineRequest.put should work', async () => {
        const d = { x: 1, y: 2 };
        await offlineRequest.put('/api/test', { ...d });
        expect(data).toEqual(d);
        expect(putFn).toBeCalledTimes(1);
    });

    it('offlineRequest.delete should work', async () => {
        await offlineRequest.delete('/api/test');
        expect(deleteFn).toBeCalledTimes(1);
    });
});
