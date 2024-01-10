// 适配不同浏览器
const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
// 新建类
class IndexedDBCache {
    constructor(_dbName) {
        this._db = null; // 数据库
        this._transactionRead = null; // 读取事务
        this._transactionWrite = null, // 写入事务
            this._request = null;
        this._dbName = _dbName; //数据库名
        this._dbversion = 1; //数据库版本
    }


    initDB(tableData) {
        return new Promise((resolve, reject) => {
            // 已打开过数据库 再次调用则为更新表
            let indexedDBVersion = JSON.parse(localStorage.getItem("indexedDBVersion")) || []
            let dbNameVersion = this._dbversio;
            if (indexedDBVersion && indexedDBVersion.length) {
                let idata = indexedDBVersion.find((i) => i.dbName == this._dbName)?.version;
                if (idata) {
                    dbNameVersion = idata
                }
            }
            if (this._request) {
                this._db.close();
                this._request = null;
                this._request = indexedDB.open(this._dbName, dbNameVersion); // 打开数据库
            } else {
                this._request = indexedDB.open(this._dbName, dbNameVersion); // 打开数据库
            }
            // 数据库初始化成功
            this._request.onsuccess = (event) => {
                // 版本号+1 为了下次重新initDB使用
                let version = Number(event.target.result.version) + 1;
                if (indexedDBVersion && indexedDBVersion.length) {
                    let index = indexedDBVersion.findIndex((i) => i.dbName == this._dbName);
                    if (index != -1) {
                        indexedDBVersion[index].version = version;
                    } else {
                        indexedDBVersion.push({ dbName: this._dbName, version: version });
                    }
                } else {
                    indexedDBVersion = [{ dbName: this._dbName, version: version }]
                }

                localStorage.setItem("indexedDBVersion", JSON.stringify(indexedDBVersion));
                this._db = this._request.result;
                console.log("数据库链接成功！")
                resolve(event);
            };
            // 数据库初始化失败
            this._request.onerror = (event) => {
                reject(event);
            };
            // 数据库初次创建或更新时会触发
            this._request.onupgradeneeded = (event) => {
                const db = this._request.result;
                if (tableData && tableData.length) {
                    tableData.forEach((i) => {
                        // 判断表是否存在创建表
                        if (!db.objectStoreNames.contains(i.tableName)) {
                            let storeOptions = "id" in i ? {
                                keyPath: i.id
                            } : {
                                keyPath: i.id,
                                autoIncrement: true
                            };
                            const objectStore = db.createObjectStore(i.tableName, storeOptions);
                            // 设置索引
                            if (i.indexList && i.indexList.length) {
                                i.indexList.forEach((j) => {
                                    objectStore.createIndex(j)
                                })
                            }
                        }

                    })
                }

                resolve(event);
            };
        });
    }



    /**
     * 通过表名存储新数据
     * @param {String} tableName 表名
     * @param {Array | Object} dataList 要存储的数据
     * @returns 
     */
    addData(tableName, dataList) {
        return new Promise((resolve, reject) => {
            let transaction = this._db.transaction(tableName, "readwrite");
            let objectStore = transaction.objectStore(tableName);
            console.log('tableName:', tableName);
            // 判断需存储类型 分类型存储
            if (dataList?.constructor === Array) {
                dataList.forEach((i) => {
                    var addRequest = objectStore.add(i);
                    addRequest.onerror = (event) => {
                        console.log("操作失败");
                        reject(event);
                    };
                })
            } else {
                var addRequest = objectStore.add(dataList);
                addRequest.onerror = (event) => {
                    console.log("操作失败");
                    reject(event);
                };
            }
            transaction.oncomplete = ((event) => {
                console.log("操作成功");
                resolve(event);
            })

        })
    }

    /**
     * 通过主键读取数据 
     * @param {string} key 要读取的主键值
     * @returns 
     */
    getDataByKey(tableName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction(tableName, "readonly");
            const objectStore = transaction.objectStore(tableName);
            // 通过主键读取数据 有主键则为主键无则返回所有数据
            let request;
            if (key === undefined) {
                request = objectStore.getAll();
            } else {
                /* 
                    objectStore.get(值) 主键查询 
                    objectStore.index(索引).get(值) 索引查询
                */
                request = objectStore.get(key);
            }
            // 操作成功
            request.onsuccess = () => {
                console.log("操作成功");
                resolve(request.result);
            };
            // 操作失败
            request.onerror = (event) => {
                console.log("操作失败");
                reject(event);
            };
        });
    }


    /**
    * 清空表数据
    * @param {string} tableName  表名
    * @returns 
    */
    clearDBTable(tableName) {
        return new Promise((resolve, reject) => {
            const transaction = this._db && this._db.transaction(tableName, "readwrite");
            const store = transaction && transaction.objectStore(tableName);
            const response = store && store.clear();
            // 操作成功
            response.onsuccss = (event) => {
                console.log("清空数据库数据");
                resolve(event);
            };
            // 操作失败
            response.onerror = (event) => {
                reject(event);
            };
        });
    }


    /**
     * 更新表里的数据
     * @param {string} tableName 表名
     * @param {string | Object} keyData  xxx  ||  { keys:'xx' value:'xx' } 获取数据方式
     * @param {Array | Object} newData 要存储的数据
     * 
     */
    updateTableData(tableName, keyData, newData) {
        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction(tableName, "readwrite");
            const objectStore = transaction.objectStore(tableName);
            let request;
            if (keyData?.constructor === String) {
                request = objectStore.get(keyData);
            } else {
                request = objectStore.index(keyData.keys).get(keyData.value);
            }
            request.onsuccess = (event) => {
                let data = newData;
                objectStore.put(data);
                transaction.oncomplete = function (event) {
                    resolve(event.target.result);
                };
            }
            request.onerror = (event) => {
                console.log("更新数据失败")
                reject(event);
            };
        })
    }

    /**
     * 通过主键删除表里的某一条数据
     * @param {string} tableName 表名
     * @param  key 主键
     */
    delteTableData(tableName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction(tableName, "readwrite");
            const objectStore = transaction.objectStore(tableName);
            let request = objectStore.delete(key);
            request.onsuccess = (event) => {
                resolve(event);
            }
            request.onerror = (event) => {
                console.log("更新数据失败")
                reject(event);
            };
        })
    }

    // 关闭数据库链接
    closeDB() {
        this._db.close();
        console.log(`关闭数据库`);
    }

}


export default IndexedDBCache

