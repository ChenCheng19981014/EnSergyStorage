import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { visualizer } from "rollup-plugin-visualizer";
import pxtovw from "postcss-px-to-viewport";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// @ts-ignore
import { createSvg } from "@/icons/index";
const my_pxtovw = pxtovw({
  unitToConvert: "px", // 需要转换的单位，默认为"px"
  viewportWidth: 1920, // 设计稿的视口宽度
  unitPrecision: 5, // 单位转换后保留的精度
  propList: ["*"], // 能转化为vw的属性列表
  viewportUnit: "vw", // 希望使用的视口单位
  fontViewportUnit: "vw", // 字体使用的视口单位
  selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
  minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
  mediaQuery: false, // 媒体查询里的单位是否需要转换单位
  replace: true, //  是否直接更换属性值，而不添加备用属性
  exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
  include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
  landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
  landscapeUnit: "vw", // 横屏时使用的单位
  landscapeWidth: 1920, // 横屏时使用的视口宽度
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/design/var.scss";`,
      },
    },
    //开发过程中是否启sourcemap
    devSourcemap: false,
  },
  base: "./",
  server: {
    // open: true,
    host: "0.0.0.0",
    port: 8888,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".webm"], // 添加 '.webm' 文件类型
  },
});
