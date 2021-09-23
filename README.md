# offline-request

### install
```shell
npm i offline-request

yarn add offline-request
```

### usage
这里主要演示离线时的代码，非离线时就是正常使用axios发送请求

- 创建一个 `OfflineRequest` 实例
```ts
// utils
import OfflineRequest, { NetWork } from '../../../../src'
import Axios from 'axios'

const network = new NetWork()
export const offlineRequest = new OfflineRequest(
    Axios.create(),
    () => network.isOnline // 如果不根据网络状态判断则不需要使用NetWork类，只需要保证改该函返回boolean即可
);
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

### OfflineRequest模块
```ts
const offlineRequest = new OfflineRequest(httpClient: AxiosInstance, isOnline: () => boolean);
```
- 参数
    - httpClient
        - Axios实例，理论上只要有get/post/patch/put/delete等方法的对象都可以
    - isOnline
        - 用于判断使用http请求，还是使用前端消息通信请求
        - 前端消息通信请求使用发布订阅模式模拟http网络请求，使得前端代码与操作indexDB的逻辑可以拆分开来，避免耦合

- offlineRequest.isOnline()
手动调用一次用于判断当前是使用离线还是在线请求。
**注意**：大部分情况下不需要调用这个方法，`get/post/patch/put/delete`等方法中默认会调用该方法判断走http请求还是走前端消息通信请求

- 请求方法
会自动调用 `isOnline()` 方法判断需要走http请求还是走前端消息通信请求。
    - isOnline() 结果为 `true`，则使用axios发送网络请求
    - isOnline() 结果为 `false`，则调用写好的离线服务，操作indexDB
```ts
offlineRequest.get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;

offlineRequest.delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;

offlineRequest.post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;

offlineRequest.put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;

offlineRequest.patch(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse | undefined>;
```

### Network模块
用于判断当前网络状态
```ts
const network = new Network(pollingConfig?: PollingConfig)

// network.isOnline为true时网络状态正常
// network.isOnline为false时表示当前无网络
```
- pollingConfig
轮询检查网络状态的配置
```ts
export interface PollingConfig {
    enabled?: boolean; // 是否开启轮询检查网络，如果不开启，只会监听 'online' 和 'offline'事件来更新网络状态，默认开启
    url?: string; // 轮询请求地址，默认请求地址为https://httpbin.org/get
    timeout?: number; // xhr.timeout 参考https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/timeout
    interval?: number; // 轮询间隔时间
}
```

- network.startPolling()
手动开始轮询。
**注意**：当pollingConfig.enabled不为false时（默认就是true），创建 `network` 实例的时候就会开始轮询，不需要调用 `startPolling()` 手动开始

- network.stopPolling()
手动停止轮询。

- network.isOnline
布尔值，表示当前有网还是无网。

- network.ping()
手动调用一次请求测试网络网络状态。
轮询的实现就是每隔一段时间调用一次该方法。
```js
const isOnline = await network.ping();
```
