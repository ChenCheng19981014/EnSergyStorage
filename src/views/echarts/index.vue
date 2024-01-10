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

  .echarts-content:nth-child(2) {
    margin-top: 0px;
  }
}
</style>

<style lang="scss"></style>

<script setup lang="ts">
import EchartsTable from "./components/echartst-table.vue";
import { ref, onMounted, reactive, onBeforeMount } from "vue";
import EchartsHeader from "./components/echarts-header.vue";
import EchartsMesage from "./components/echarts-msg.vue";
import { PiniaTableInfo } from "@/pinia/table";

onBeforeMount(() => {
  getExcelInfo();
});

interface Message {
  [key: string]: string | number;
}
// 最早的时间
let startTime = ref<number | string>("");
// 最晚的时间
let endTime = ref<number | string>("");

// 使用id进行区分 表单信息
let tableInfoById = reactive({});

const messageInfo = ref<Message[]>([
  { 管理单位: "" },
  { 供电所: "" },
  { 用户编号: "" },
]);

const company = ref<string>();

// 获取表格数据
const getExcelInfo = async () => {
  const { tableDB } = PiniaTableInfo();
  const tabelInfo = await tableDB.getItem('ExcelInfo');
  const unit = tabelInfo[0]["管理单位"];
  const powerSupplyStation = tabelInfo[0]["供电所"];
  const userId = tabelInfo[0]["用户编号"];
  company.value = tabelInfo[0]["用户名称"];
  messageInfo.value[0]["管理单位"] = unit;
  messageInfo.value[1]["供电所"] = powerSupplyStation;
  messageInfo.value[2]["用户编号"] = userId;

  // 筛选表数据
  filterData(tabelInfo);

  // console.log('tabelInfo:',tabelInfo);
};

// 筛选表数据
const filterData = (tabelInfo: any[]) => {

  // 表格整体信息
  tabelInfo.map((list) => {

    const {
      资产编号: propertyId,
      瞬时有功: InstantaneousActivePower,
      日期: time,
    } = list;

    // 信息
    const info = { propertyId, InstantaneousActivePower, time };

    // 以资产编号 进行分类
    if (!tableInfoById[propertyId.trim()]) {
      tableInfoById[propertyId.trim()] = {
        data: [],
        time: { startTime: null, endTime: null },
      };
      tableInfoById[propertyId.trim()]["data"].push(info);
    } else {
      tableInfoById[propertyId.trim()]["data"].push(info);
    }
  });

  //  时间 进行排序
  Object.keys(tableInfoById).map((id: any) => {
    const everyTableInfo = tableInfoById[id];
    everyTableInfo.data.sort((a: any, b: any) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
  });

  // console.log('tableInfoById:',tableInfoById);

  // 添加 先后时间
  Object.keys(tableInfoById).map((id: any) => {
    tableInfoById[id].time.startTime = tableInfoById[id].data[0].time.split(' ')[0];
    tableInfoById[id].time.endTime = tableInfoById[id].data.at(-1).time.split(' ')[0];
  });

};
</script>

<template>
  <div class="echarts">
    <!-- 表头 -->
    <EchartsHeader :company="company"></EchartsHeader>
    <!-- 内容 -->
    <div class="echarts-content">
      <!-- 表头信息 -->
      <EchartsMesage :messageInfo="messageInfo"></EchartsMesage>

      <!-- echarts表 有几条数据渲染几条 -->
      <EchartsTable :tableInfo="tableInfo" :id="key" v-for="(tableInfo, key, index) in tableInfoById"
        :key="'tableInfoById_' + index"></EchartsTable>
    </div>
  </div>
</template>
