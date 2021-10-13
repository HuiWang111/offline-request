import Dexie from 'dexie';
import { OfflineRequestServer } from '../../../../src';

export const todoController = (db: Dexie, router: OfflineRequestServer) => {
    db.version(1).stores({
        todos: 'text'
    });
    
    router.get('/todos/query', async (_, __, query) => {
        console.log(query, 'query');
        const todos = await db.table('todos').toArray();
        console.log(todos);
        return {
            data: todos,
            status: 200,
            statusText: 'ok'
        };
    });

    router.put('/todos', async (todo: { text: string }) => {
        await db.table('todos').add(todo);

        return {
            data: 'ok',
            status: 200,
            statusText: 'ok'
        };
    });
}


