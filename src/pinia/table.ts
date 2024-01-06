import { defineStore } from "pinia";
import { ref } from "vue";

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
    const tabelInfo = ref<any[]>([]);

    const refleshTableInfo = (info: any[]) => {
      tabelInfo.value = info;
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
