import Dexie from 'dexie';
import { offlineRequest } from 'utils';
import { todoController } from './todos';


export const runServer = () => {
    const db = new Dexie("test_database");

    todoController(db, offlineRequest.server);
}