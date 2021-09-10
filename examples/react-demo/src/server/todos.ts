import Dexie from 'dexie';
import { offlineRequest } from 'utils';

export const runServer = () => {
    const db = new Dexie("test_database");
    
    db.version(1).stores({
        todos: 'text'
    });
    
    offlineRequest.server.get('/todos/query', async () => {
        const todos = await db.table('todos').toArray();
        console.log(todos);
        return {
            data: todos,
            status: 200,
            statusText: 'ok'
        };
    });

    offlineRequest.server.put('/todos', async (todo: { text: string }) => {
        await db.table('todos').add(todo);

        return {
            data: 'ok',
            status: 200,
            statusText: 'ok'
        };
    });
}


