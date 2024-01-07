<style scoped lang="scss">
.echarts {
  min-width: 1280px;
  height: 100%;
  background: #f4f7fe;
  position: relative;
  overflow-x: hidden;

  .echarts-content {
    width: 100%;
    height: auto;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 52px;
  }

  // .echarts-content :nth-child(2) {
  //   margin-top: 0px;
  // }
}
</style>

<style lang="scss"></style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as XLSX from "xlsx";
import EchartsHeader from "./components/echarts-header.vue";
import EchartsMesage from "./components/echarts-msg.vue";
import EchartsTable from "./components/echartst-table.vue";
interface Message {
  [key: string]: string | number;
}

const messageInfo = ref<Message[]>([
  { 管理单位: "下沙供电所" },
  { 供电所: "下沙高压" },
  { 用户编号: 330602332 },
]);

onMounted(() => {});
</script>

<template>
  <div class="echarts">
    <!-- 表头 -->
    <EchartsHeader></EchartsHeader>

    <!-- 内容 -->
    <div class="echarts-content">
      <!-- 表头信息 -->
      <EchartsMesage :messageInfo="messageInfo"></EchartsMesage>

      <!-- echarts表 -->
      <EchartsTable></EchartsTable>

      <EchartsTable></EchartsTable>

      <EchartsTable></EchartsTable>
    </div>
  </div>
</template>
