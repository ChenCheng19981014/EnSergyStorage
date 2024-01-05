import { defineStore } from "pinia";
import { ref } from "vue";

/**
 *  @Author: cc
 *  @description:  当前选中的菜单 此处使用 组合式的
 *  @param {  menuName;最新的选中参数 }
 *  @return {  currentMenu 当前的菜单  refleshCurrentMenu 刷新当前菜单的选中}
 */
export const currentSelectMenu = defineStore(
  "currentSelectMenu",
  () => {
    // 当前的菜单信息 选项
    let currentMenu = ref<string>("");

    // let currentMenuList = ref<string[]>([]);

    // const refleshCurrentMenuList = (
    //   addAndSub: "add" | "sub",
    //   newMenu: string
    // ) => {
    //   if (addAndSub === "add") {
    //     currentMenuList.push(newMenu);
    //   } else {
    //     currentMenuList.remove(newMenu);
    //   }
    // };

    const refleshCurrentMenu = (menuName: string) => {
      currentMenu.value = menuName;
    };

    return {
      currentMenu,
      refleshCurrentMenu,
    };
  },
  {
    // 配置第三个参数
    persist: {
      storage: sessionStorage,
      key: "currentSelectMenu",
    },
  }
);
