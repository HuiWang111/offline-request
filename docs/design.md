# offline-request

### 参考文档
- [chche api](https://web.dev/cache-api-quick-guide/)
- [service-workers](https://developers.google.com/web/fundamentals/primers/service-workers)
- [storage-for-the-web](https://web.dev/storage-for-the-web/)
- [indexeddb-react-apps-offline-data-storage](https://blog.logrocket.com/dexie-js-indexeddb-react-apps-offline-data-storage/)

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
- 每次有网络时查询数据都需要把 `indexDB` 中的数据全部清除再创建？
- 分页数据变成查询全部数据，由前端（或者indexDB）做分页？
- api地址与 `indexDB` 数据表如何对应起来？
```js
new OfflineRequest({
    '/orders/search': 'order',
    '/order/:id': 'order'
})
```
- 请求方法与数据库操作如何对应？
```js
/**
 * 默认
 * get <=> query
 * post <=> query
 * put <=> create
 * patch <=> update
 * delete <=> delete
 */
offlineRequest.post('/some/api', data, headers, 'create'); // 也可以指定
```
