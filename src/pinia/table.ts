import { defineStore } from "pinia";
import { ref } from "vue";
// @ts-ignore
import IndexedDBCache from "@/utils/indexdb.js";
// 初始化 db
let db = new IndexedDBCache("linktwins");
db.initDB();
/**
 *  @Author: cc
 *  @description:  当前表格信息
 *  @param { 表格Json }
 *  @return {  表格信息和方法 }
 */
export const PiniaTableInfo = defineStore(
  "tableInfo",
  async () => {
    // 当前的菜单信息 选项
    const tabelInfo = ref<any[]>([]);

    const refleshTableInfo = async (info: any[]) => {
      // tabelInfo.value = info;

      await db.addData("PiniaTableInfo", JSON.stringify(info));

      // console.log("更新数据", info);
      // 更新持久化存储中的数据
      // sessionStorage.setItem("PiniaTableInfo", JSON.stringify(info));
    };

    return {
      tabelInfo,
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
