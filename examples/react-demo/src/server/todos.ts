import Dexie from 'dexie';
import { OfflineRequestServer } from '../../../../src';

export const todoController = (db: Dexie, router: OfflineRequestServer) => {
    db.version(1).stores({
        todos: 'text'
    });
    
    router.get('/todos/query', async (ctx) => {
        const { query } = ctx;
        console.log(query, 'query');

        const todos = await db.table('todos').toArray();
        
        ctx.body = {
            data: todos,
            status: 200,
            statusText: 'ok'
        };
    });

    router.put('/todos', async (ctx) => {
        await db.table('todos').add(ctx.data);

        ctx.body = {
            data: 'ok',
            status: 200,
            statusText: 'ok'
        };
    });
}


