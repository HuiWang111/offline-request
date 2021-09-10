# 离线存储方案

### 参考文档
- [chche api](https://web.dev/cache-api-quick-guide/)
- [service-workers](https://developers.google.com/web/fundamentals/primers/service-workers)
- [storage-for-the-web](https://web.dev/storage-for-the-web/)
- [indexeddb-react-apps-offline-data-storage](https://blog.logrocket.com/dexie-js-indexeddb-react-apps-offline-data-storage/)
- [Using Service Workers with create-react-app](https://blog.bitsrc.io/using-service-workers-with-react-27a4c5e2d1a9)
- [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
- [Using the IndexedDB API with React (and Hooks)](https://levelup.gitconnected.com/using-the-indexeddb-api-with-react-and-hooks-4e63d83a5d1b)
- [Using Dexie.js in a TypeScript application](https://golb.hplar.ch/2018/01/Using-Dexie-js-in-a-TypeScript-application.html)

### 工具
- [storage-quota](https://storage-quota.glitch.me/)
- [idb](https://github.com/jakearchibald/idb)
- [dexie.js](https://dexie.org/)
    - 创建
    ```js
    await db.friends.add({name: "Josephine", age: 21});

    await db.friends.bulkAdd([
        {name: "Foo", age: 31},
        {name: "Bar", age: 32}
    ]);
    ```
    - 更新
    ```js
    await db.friends.put({id: 4, name: "Foo", age: 33});

    await db.friends.bulkPut([
        {id: 4, name: "Foo2", age: 34},
        {id: 5, name: "Bar2", age: 44}
    ]);

    await db.friends.update(4, {name: "Bar"});

    await db.customers
        .where("age")
        .inAnyRange([ [0, 18], [65, Infinity] ])
        .modify({discount: 0.5});
    ```
    - 删除
    ```js
    await db.friends.delete(4);
    await db.friends.bulkDelete([1,2,4]);

    const oneWeekAgo = new Date(Date.now() - 60*60*1000*24*7);
    await db.logEntries
        .where('timestamp').below(oneWeekAgo)
        .delete();
    ```
    - 查询
    ```js
    const someFriends = await db.friends
        .where("age").between(20, 25)
        .offset(150).limit(25)
        .toArray();

    await db.friends
        .where("name").equalsIgnoreCase("josephine")
        .each(friend => {
            console.log("Found Josephine", friend);
        });
    
    const abcFriends = await db.friends
        .where("name")
        .startsWithAnyOfIgnoreCase(["a", "b", "c"])
        .toArray();

    const forbundsKansler = await db.friends.where({
        firstName: "Angela",
        lastName: "Merkel"
    }).first();
    // replace
    const forbundsKansler = await db.friends.get({
        firstName: "Angela",
        lastName: "Merkel"
    });
    ```
- [useDexie](https://github.com/ttessarolo/useDexie)

### 讨论点
- 原本的想法
    - 原本的想法是通过实现一套 `post` `get` `put` 等方法，在内部判断网络状态然后决定是否走离线

- 目前结论是以离线为主，后端交互为辅
    - 增删改查都在 indexDB中操作
    - 定时与后端交互、手动提交数据的方式与后端交互

    - **实现**
        1. 使用 `dexie.js` 对 indeDB进行操作，完成数据的增删改查
        2. 使用 service-worker 对页面以及静态js、css文件进行缓存
        ```js
        self.addEventListener('fetch', function(e) {
            e.respondWith(
                caches.match(e.request).then(function(r) {
                    console.log('[Service Worker] Fetching resource: '+e.request.url);

                    return r || fetch(e.request).then(function(response) {
                            return caches.open(cacheName)
                                .then(function(cache) {
                                    console.log('[Service Worker] Caching new resource: '+e.request.url);

                                    cache.put(e.request, response.clone());
                                    return response;
                                });
                    });
                })
            );
        });
        ```
        3. PAD端仍旧访问的是 `web app`，但可以通过 `添加到主屏幕` 的功能实现快捷访问

    - **问题**
        1. 数据校验怎么办？是否也需要前端都做了，工作量很大
            - 数据冲突
        2. service-worker生产环境必须在https下运行
        3. 是否需要区分电脑和手机，电脑以后端交互为主，手机以离线存储为主




### 需要缓存的数据
1. 工单列表数据 (全部数据，可以查询)
2. 工单详情执行过程 (保存，校验，定时清除)
3. 拿到webpack hash值
