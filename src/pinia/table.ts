import { defineStore } from "pinia";
import { ref } from "vue";
// @ts-ignore
import localforage from "localforage";
// @ts-ignore
import IndexedDBCache from "@/utils/indexdb.js";

// 初始化 db
// let db = new IndexedDBCache("linktwins");
// db.initDB();
/**
 *  @Author: cc
 *  @description:  当前表格信息
 *  @param { 表格Json }
 *  @return {  表格信息和方法 }
 */
export const PiniaTableInfo = defineStore(
  "tableInfo",
  () => {
    // 当前的菜单信息 选项
    const tableDB = localforage.createInstance({
      name: "PiniaTableInfo",
    });

    const refleshTableInfo = async (info: any[]) => {
      // tabelInfo.value = info;

      // 清除数据
      await tableDB.removeItem("ExcelInfo");

      // 更新 数据数据
      tableDB
        .setItem("ExcelInfo", info)
        .then(function (value) {
          // 如下输出 `1`
          console.log(value[0]);
        })
        .catch(function (err) {
          // 当出错时，此处代码运行
          console.log(err);
        });

      // await db.addData("PiniaTableInfo", JSON.stringify(info));
      // console.log("更新数据", info);
      // 更新持久化存储中的数据
      // sessionStorage.setItem("PiniaTableInfo", JSON.stringify(info));
    };

    return {
      tableDB,
      refleshTableInfo,
    };
  },
  {
    // 配置第三个参数
    persist: {
      storage: sessionStorage,
      key: "PiniaTableInfo",
    },
  }
);
