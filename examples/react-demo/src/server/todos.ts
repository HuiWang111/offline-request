/*
 * @Autor: hui.wang
 * @Date: 2021-09-10 16:24:38
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-02-10 15:00:20
 * @emial: hui.wang@bizfocus.cn
 */
import Dexie from 'dexie';
import { OfflineRequestServer } from '../../../../src';

export const todoController = (db: Dexie, router: OfflineRequestServer) => {
    db.version(1).stores({
        todos: 'text'
    });
    
    router.get('/todos/query', async (ctx) => {
        const { query } = ctx.request;
        console.log(query, '离线服务接收数据： query');

        const todos = await db.table('todos').toArray();
        
        ctx.body = {
            data: todos,
            status: 200,
            statusText: 'ok'
        };
    });

    router.put('/todos', async (ctx) => {
        const { data } = ctx.request;

        await db.table('todos').add(data);

        ctx.body = {
            data: 'ok',
            status: 200,
            statusText: 'ok'
        };
    });
}


