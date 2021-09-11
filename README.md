# offline-request

### install
```shell
npm i offline-request

yarn add offline-request
```

### usage
这里主要演示离线时的代码，非离线时就是正常使用axios发送请求

- new 一个 `OfflineRequest` 实例
```ts
// utils
import OfflineRequest from '../../../../src'
import Axios from 'axios'

export const offlineRequest = new OfflineRequest(Axios.create(), {
    cacheOnly: true // 强制使用离线请求，不实用http请求（也不会进行网络状况检测）
});
```

- client端页面逻辑
```tsx
import { FC, useState, ChangeEvent, useRef, useEffect } from 'react'
import { Button, Row, Col, Input } from 'antd'
import { useAppContext } from 'hooks'
import { observer } from 'mobx-react-lite'
import { offlineRequest } from 'utils'

export const Dashboard: FC = observer(() => {
    const [text, setText] = useState('');
    const [list, setList] = useState<string[]>([]);
    const { api, store } = useAppContext()
    const handleLogout = () => {
        api.auth.logout(store.auth)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handlePressEnter = () => {
        setList([...list, text]);
        setText('');

        offlineRequest.put('/todos', { text }); // 发送离线请求，添加一条数据
    }

    useEffect(() => {
        const fetchTodos = async () => {
            const res = await offlineRequest.get('/todos/query'); // 从indexdb中获取数据
            setList(res!.data.map((item: { text: string }) => item.text));
        }

        fetchTodos();
    }, []);

    return (
        <>
            <Row align='middle' justify='center' style={{ height: 300 }}>
                <Col>
                    <Button type='primary' onClick={handleLogout}>退出登录</Button>
                </Col>
            </Row>
            <Row align='middle' justify='center'>
                <Col>
                    <Input
                        value={text}
                        onChange={handleInputChange}
                        onPressEnter={handlePressEnter}
                    />
                </Col>
            </Row>
            {
                list.map((item, index) => {
                    return (
                        <Row key={index} align='middle' justify='center'>
                            <Col>{item}</Col>
                        </Row>
                    );
                })
            }
        </>
    )
})
```

- server端离线服务逻辑
```ts
// server/index.ts
import Dexie from 'dexie';
import { offlineRequest } from 'utils';
import { todoController } from './todos';

export const runServer = () => {
    const db = new Dexie("test_database");

    todoController(db, offlineRequest.server);
}
```

```ts
// server/todos.ts
import Dexie from 'dexie';
import { OfflineRequestServer } from '../../../../src';

export const todoController = (db: Dexie, router: OfflineRequestServer) => {
    db.version(1).stores({
        todos: 'text'
    });
    
    router.get('/todos/query', async () => {
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
```

此时服务和页面相关的逻辑都完成了，还差最后一步，将服务运行起来等待client发起请求

```tsx
// index.tsx项目入口文件
import ReactDOM from 'react-dom'
import App from 'app/App'
import { Router } from 'react-router-dom'
import { history } from 'app/history'
import { runServer } from 'server'
import 'styles/index.less'

const init = () => {
    ReactDOM.render(
        <Router history={history}>
            <App />
        </Router>,
        document.getElementById('root')
    )
}

init()

runServer() // 将离线服务跑起来
```
