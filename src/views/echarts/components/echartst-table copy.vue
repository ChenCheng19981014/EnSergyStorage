<style scoped lang="scss">
// 垂直 居中
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.echarts-content {
  width: 100%;
  height: auto;
  margin-top: 40px;
  border-radius: 8px;
  background: #fff;
  padding: 28px 40px 40px 40px;
  box-sizing: border-box;

  .echarts-header {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-name {
      color: #1d2129;
      font-family: "SourceHanSansCN";
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
    }

    .downLoadPng {
      width: 88px;
      height: 32px;
      border-radius: 4px;
    }
  }

  .tabel {
    width: 100%;
    height: auto;
    margin-top: 24px;

    .tabel-1 {
      padding-bottom: 40px;

      .ec {
        margin-top: 24px;
        width: 100%;
        height: 271px;
      }

    }

    .tabel-2 {
      margin-top: 40px;
      border-bottom: 1px solid transparent !important;

      .ec {
        margin-top: 24px;
        width: 100%;
        height: 318px;
      }
    }

    .echarts-content-item {
      width: 100%;
      border-bottom: 1px solid #e5e6eb;

      .item-info {
        width: 100%;
        height: 28px;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: end;

        .name {
          @extend .flex-center;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          color: #1d2129;
          font-family: "SourceHanSansCN";
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .data {
          width: 328px;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .txt {
            color: #4e5969;
            font-family: "SourceHanSansCN";
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            @extend .flex-center;
            margin-right: 16px;
          }

          .date-select {
            width: 256px;
            height: 100%;
            @extend .flex-center;
          }
        }
      }

      .chart-base {
        width: 100%;
        height: 271px;
        margin-top: 24px;
      }

      .show-time {
        width: 100%;
        height: 20px;
        margin-top: 27px;
        display: flex;
        justify-content: center;
        align-content: center;
        gap: 24px;

        .show-time-item {
          width: 88.1px;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .colorBorder {
            width: 10.147px;
            height: 10px;
            border-radius: 50%;
          }

          .time {
            color: #4e5969;
            font-family: "SourceHanSansCN";
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            letter-spacing: -0.2px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.downLoadPng .arco-btn {
  border-radius: 4px;
}

.date-select .arco-picker {
  width: 100% !important;
  height: 100%;
  margin: 0 !important;
}

.date-select .arco-picker-input>input {
  color: #1d2129;
  font-family: "SourceHanSansCN";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
}

.echarts-tooltip-1 {
  padding: 0.5 !important;
  border: none !important;
  border-radius: 6px;
  height: 72px;
  border: 0.5px solid #fff;
  width: 180px;
  background: linear-gradient(304deg,
      rgba(253, 254, 255, 0.6) -6.04%,
      rgba(244, 247, 252, 0.6) 85.2%) !important;
  backdrop-filter: blur(5px);

  // 给子盒子自定义样式
  .custom-tooltip-style {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .date {
      width: 100%;
      height: 20px;
      display: flex;
      justify-content: start;
      align-items: center;
      color: #1d2129;
      font-family: "SourceHanSansCN";
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      margin-left: 4px;
    }

    .ssyg {
      margin-top: 4px;
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 6px 0px 20px 0px rgba(34, 87, 188, 0.1);
      position: relative;

      .round {
        width: 10px;
        height: 10.002px;
        background-color: #249eff;
        border-radius: 50%;
        padding: 7px 8px;
        margin-left: 8px;
        @extend .flex-center;
      }

      .txt {
        margin-left: 8px;
        color: #4e5969;
        font-family: "SourceHanSansCN";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        @extend .flex-center;
      }

      .value {
        position: absolute;
        right: 8px;
        color: #1d2129;
        text-align: right;
        font-family: "SourceHanSansCN";
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        @extend .flex-center;
      }
    }
  }
}
</style>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watchEffect,
  reactive,
  toRefs,
  nextTick,
  toRaw,
  onBeforeMount, getCurrentInstance
} from "vue";
import domToImage from "dom-to-image";
import * as echarts from "echarts";
import { roundToNearest } from "@/utils/tools.js";

// 显示的时间
const showTimeList = ref([
  {
    color: "#21CCFF",
    timeFrame: "04:00～05:00",
    frame: ['04:00:00', '05:00:00']
  },
  {
    color: "#313CA9",
    timeFrame: "05:00～06:00",
    frame: ['05:00:00', '06:00:00']
  },
  {
    color: "#249EFF",
    timeFrame: "06:00～07:00",
    frame: ['06:00:00', '07:00:00']
  },
  {
    color: "#33D1C9",
    timeFrame: "07:00～08:00",
    frame: ['07:00:00', '08:00:00']
  },
]);

const echarts1 = ref(null);
const echarts2 = ref(null);
// 拿到 标题的 信息
const props = defineProps(["tableInfo", "id"]);

// 表信息  和  表头信息
const { tableInfo, id } = toRefs(props);

// 选择时间节点
// console.log("tableInfo:", id?.value, tableInfo?.value);

let echarts2OptionsData = ref([]) as any;

// 表数据 不变
let echartsData = reactive({});

// 表格1 实例
let myChart1 = reactive({}) as any;
// 表格2 实例
let myChart2 = reactive({}) as any;

// 第二个表格的options数据
let echatrsOptionsData = reactive({});

// 选择的时间
let selectedData = reactive({
  data1: [tableInfo?.value.time.startTime, tableInfo?.value.time.endTime],
  data2: [tableInfo?.value.time.startTime, tableInfo?.value.time.endTime],
});

// 取到表一所需要的数据
echartsData = tableInfo?.value.data.reduce((acc, obj) => {
  const date = obj.time.split(" ")[0]; // 提取日期部分
  acc[date] = (acc[date] || 0) + parseFloat(obj.InstantaneousActivePower);
  return acc;
}, {});

// 表一数据
const options1 = reactive<any>({
  // 提示框
  tooltip: {
    trigger: "axis",
    position: function (point, params, dom, rect, size) {

      var x = point[0]; // x坐标位置
      var y = point[1]; // y坐标位置

      var boxWidth = size.contentSize[0]; // 提示框宽度
      var boxHeight = size.contentSize[1]; // 提示框高度

      x = x + 10; // 设置x坐标位置为鼠标横坐标减去提示框宽度
      y = y - boxHeight - 10; // 设置y坐标位置为鼠标纵坐标加上一个偏移值

      if (x > 1500) {
        x = x - boxWidth - 10;
      }

      return [x, y];
    },
    axisPointer: {
      type: "none",
      lineStyle: {
        color: "#00FFE0",
        width: 2,
      },
    },
    className: "echarts-tooltip-1",
    formatter: function (params, elOne, elTwo) {
      // 循环处理数据，展示数据
      var htmlText = `
      <div class='custom-tooltip-style'>
          <div class='date'>${params[0].axisValue}</div>
          <div class='ssyg'>
              <div class='round'></div>
              <div class='txt'>瞬时有功</div>
              <div class='value'> ${params[0].data.toFixed(2)} </div>
          </div>
        </div>`;
      return htmlText;
    },
  },

  // 缩放配置
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 50,
      xAxisIndex: [0, 1],
      height: 14,
      bottom: 10,
    },
    {
      type: "inside",
      realtime: true,
      start: 0,
      end: 50,
      xAxisIndex: [0, 1],
      height: 14,
      bottom: 10,
    },
  ],

  xAxis: [
    {
      // x轴的线
      axisLine: {
        onZero: true,
        // symbolOffset: [0, 500],
        lineStyle: {
          width: 2, // 控制刻度线粗细
          height: 0.725,
          color: "#A9AEB8",
        },
      },

      // 向下的刻度
      axisTick: {
        alignWithLabel: true,
        length: 5, // 控制刻度线长度
        lineStyle: {
          width: 2, // 控制刻度线粗细
          color: "#A9AEB8",
        },
      },

      /*坐标轴名字向左偏移begin*/
      axisLabel: {
        color: "#A9AEB8",
        fontFamily: "SourceHanSansCN",
        margin: 20,
        align: "center",
        verticalAlign: "middle",
      },
      data: Object.keys(echartsData),
      boundaryGap: false, // 不留白，从原点开始
    },
  ],

  yAxis: [
    {
      // y轴的线
      axisLine: {
        onZero: true,
        lineStyle: {
          color: "#A9AEB8",
        },
      },

      type: "value",
      // max: Math.ceil(Math.max(...Object.values(echarts1OptionsDate)) * 2),
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
        },
      },
    },
  ],

  grid: [
    {
      top: 10,
      left: 70,
      right: 0,
      bottom: 0,
      height: "75%",
    },
  ],

  series: [
    {
      symbolSize: 5, // 折线点的大小
      showSymbol: false, //关闭线上默认的圆点
      itemStyle: {
        normal: {
          color: "rgba(0,0,0,0);", // 改变折线点的颜色
          borderWidth: 0,
          lineStyle: {
            color: "#249EFF", //改变折线的颜色options2
          },
        },
      },
      emphasis: {
        // 鼠标hover上去的时候，拐点的颜色和样式
        itemStyle: {
          color: "#0072FF", //颜色
          borderColor: "#fff", //图形的描边颜色
          borderWidth: 2, // 描边的线宽
          shadowBlur: 4, // 图形的阴影大小
          shadowColor: "#0072FF", // 图形的阴影颜色
        },
      },
      type: "line",
      data: Object.values(echartsData),
    },
  ],
});

let options2 = reactive<any>({
  // 提示框
  tooltip: {
    trigger: "axis",
    position: function (point, params, dom, rect, size) {

      var x = point[0]; // x坐标位置
      var y = point[1]; // y坐标位置

      var boxWidth = size.contentSize[0]; // 提示框宽度
      var boxHeight = size.contentSize[1]; // 提示框高度

      x = x + 10; // 设置x坐标位置为鼠标横坐标减去提示框宽度
      y = y - boxHeight - 10; // 设置y坐标位置为鼠标纵坐标加上一个偏移值

      if (x > 1500) {
        x = x - boxWidth - 10;
      }

      return [x, y];
    },
    axisPointer: {
      type: "none",
      lineStyle: {
        color: "#00FFE0",
        width: 2,
      },
    },
    className: "echarts-tooltip-1",
    formatter: function (params, elOne, elTwo) {
      var htmlText = `
      <div class='custom-tooltip-style'>
          <div class='date'>${params[0].axisValue}</div>
          <div class='ssyg'>
              <div class='round'></div>
              <div class='txt'>瞬时有功</div>
              <div class='value'> ${params[0].data.toFixed(2)} </div>
          </div>
        </div>`;
      return htmlText;
    },
  },

  // 缩放配置
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 50,
      xAxisIndex: [0, 1],
      height: 14,
      bottom: 10,
    },
    {
      type: "inside",
      realtime: true,
      start: 0,
      end: 50,
      xAxisIndex: [0, 1],
      height: 14,
      bottom: 10,
    },
  ],

  xAxis: [
    {
      // x轴的线
      axisLine: {
        onZero: true,
        // symbolOffset: [0, 500],
        lineStyle: {
          width: 2, // 控制刻度线粗细
          height: 0.725,
          color: "#A9AEB8",
        },
      },

      // 向下的刻度
      axisTick: {
        alignWithLabel: true,
        length: 5, // 控制刻度线长度
        lineStyle: {
          width: 2, // 控制刻度线粗细
          color: "#A9AEB8",
        },
      },

      /*坐标轴名字向左偏移begin*/
      axisLabel: {
        color: "#A9AEB8",
        fontFamily: "SourceHanSansCN",
        margin: 20,
        align: "center",
        verticalAlign: "middle",
      },
      data: Object.keys(echartsData),
      boundaryGap: false, // 不留白，从原点开始
    },
  ],

  yAxis: [
    {
      // y轴的线
      axisLine: {
        onZero: true,
        lineStyle: {
          color: "#A9AEB8",
        },
      },

      type: "value",
      // max: Math.ceil(Math.max(...Object.values(echarts1OptionsDate)) * 2),
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
        },
      },
    },
  ],

  grid: [
    {
      top: 10,
      left: 70,
      right: 0,
      bottom: 0,
      height: "75%",
    },
  ],

  series: [{
    symbolSize: 5, // 折线点的大小
    showSymbol: false, //关闭线上默认的圆点
    itemStyle: {
      normal: {
        color: "rgba(0,0,0,0);", // 改变折线点的颜色
        borderWidth: 0,
        lineStyle: {
          color: "#249EFF", //改变折线的颜色
        },
      },
    },
    emphasis: {
      // 鼠标hover上去的时候，拐点的颜色和样式
      itemStyle: {
        color: "#0072FF", //颜色
        borderColor: "#fff", //图形的描边颜色
        borderWidth: 2, // 描边的线宽
        shadowBlur: 4, // 图形的阴影大小
        shadowColor: "#0072FF", // 图形的阴影颜色
      },
    },
    type: "line",
    data: Object.values(echartsData),
  },],
});

// 初始化表格
const initEcahrts = () => {

  if (!echarts1.value || !echarts2.value) return;

  myChart1 = echarts.init(echarts1.value);
  myChart2 = echarts.init(echarts2.value);

  myChart1.setOption(options1);
  myChart2.setOption(options2);

  window.addEventListener("resize", myChart1.resize);
  window.addEventListener("resize", myChart2.resize);
};

// 分组
const grouping = (data) => {
  return data.reduce((result, item) => {
    const date = item.time.split(" ")[0]; // 提取日期部分
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(item);
    return result;
  }, {});
}

// 定义一个函数来统计给定时间段内的数据
const getDataByTimeRange = (data, startTime, endTime) => {
  const result = {};
  for (const date in data) {
    const dailyData = data[date];
    const power = dailyData.reduce((sum, item) => {
      const time = item.time.split(" ")[1]; // 提取时间部分
      const hour = parseInt(time.split(":")[0], 10); // 提取小时数

      if (time >= startTime && time <= endTime) {
        sum += parseFloat(item.InstantaneousActivePower);
      }
      return sum;
    }, 0);

    result[date] = power;
  }
  return result;
}

// 初始化数据
const initData = () => {
  // 表信息
  const { data, time } = tableInfo?.value;
  // 分组信息
  const groupedData = grouping(data);

  showTimeList.value.map((listInfo) => {
    // 显示的时间段信息
    const { timeFrame, frame } = listInfo;
    // 获取对应时间段的数据
    echatrsOptionsData[timeFrame] = getDataByTimeRange(groupedData, frame[0], frame[1]);
  })

  // 初始化第二组表的配置项
  initEcahrts2Options(echatrsOptionsData);

  console.log("时间分组数据:", echatrsOptionsData,);

};

// 初始化第二项 表单数据
const initEcahrts2Options = (echatrsOptionsData) => {
  const instance = getCurrentInstance();
  options2.series = []
  // 信息
  let series = [] as any;
  Object.keys(echatrsOptionsData).map((time, index) => {
    const data = echatrsOptionsData[time];
    const { color } = showTimeList.value[index];

    series.push({
      symbolSize: 5, // 折线点的大小
      showSymbol: false, //关闭线上默认的圆点
      itemStyle: {
        normal: {
          color: "rgba(0,0,0,0);", // 改变折线点的颜色
          borderWidth: 0,
          lineStyle: {
            color: color, //改变折线的颜色
          },
        },
      },
      emphasis: {
        // 鼠标hover上去的时候，拐点的颜色和样式
        itemStyle: {
          color: color, //颜色
          borderColor: "#fff", //图形的描边颜色
          borderWidth: 2, // 描边的线宽
          shadowBlur: 4, // 图形的阴影大小
          shadowColor: color, // 图形的阴影颜色
        },
      },
      type: "line",
      data: data,
    })

    echarts2OptionsData.value.push({
      symbolSize: 5, // 折线点的大小
      showSymbol: false, //关闭线上默认的圆点
      itemStyle: {
        normal: {
          color: "rgba(0,0,0,0);", // 改变折线点的颜色
          borderWidth: 0,
          lineStyle: {
            color: color, //改变折线的颜色
          },
        },
      },
      emphasis: {
        // 鼠标hover上去的时候，拐点的颜色和样式
        itemStyle: {
          color: color, //颜色
          borderColor: "#fff", //图形的描边颜色
          borderWidth: 2, // 描边的线宽
          shadowBlur: 4, // 图形的阴影大小
          shadowColor: color, // 图形的阴影颜色
        },
      },
      type: "line",
      data: data,
    })
  })


  options2 = {
    // 提示框
    tooltip: {
      trigger: "axis",
      position: function (point, params, dom, rect, size) {

        var x = point[0]; // x坐标位置
        var y = point[1]; // y坐标位置

        var boxWidth = size.contentSize[0]; // 提示框宽度
        var boxHeight = size.contentSize[1]; // 提示框高度

        x = x + 10; // 设置x坐标位置为鼠标横坐标减去提示框宽度
        y = y - boxHeight - 10; // 设置y坐标位置为鼠标纵坐标加上一个偏移值

        if (x > 1500) {
          x = x - boxWidth - 10;
        }

        return [x, y];
      },
      axisPointer: {
        type: "none",
        lineStyle: {
          color: "#00FFE0",
          width: 2,
        },
      },
      className: "echarts-tooltip-1",
      formatter: function (params, elOne, elTwo) {
        var htmlText = `
      <div class='custom-tooltip-style'>
          <div class='date'>${params[0].axisValue}</div>
          <div class='ssyg'>
              <div class='round'></div>
              <div class='txt'>瞬时有功</div>
              <div class='value'> ${params[0].data.toFixed(2)} </div>
          </div>
        </div>`;
        return htmlText;
      },
    },

    // 缩放配置
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0,
        end: 50,
        xAxisIndex: [0, 1],
        height: 14,
        bottom: 10,
      },
      {
        type: "inside",
        realtime: true,
        start: 0,
        end: 50,
        xAxisIndex: [0, 1],
        height: 14,
        bottom: 10,
      },
    ],

    xAxis: [
      {
        // x轴的线
        axisLine: {
          onZero: true,
          // symbolOffset: [0, 500],
          lineStyle: {
            width: 2, // 控制刻度线粗细
            height: 0.725,
            color: "#A9AEB8",
          },
        },

        // 向下的刻度
        axisTick: {
          alignWithLabel: true,
          length: 5, // 控制刻度线长度
          lineStyle: {
            width: 2, // 控制刻度线粗细
            color: "#A9AEB8",
          },
        },

        /*坐标轴名字向左偏移begin*/
        axisLabel: {
          color: "#A9AEB8",
          fontFamily: "SourceHanSansCN",
          margin: 20,
          align: "center",
          verticalAlign: "middle",
        },
        data: Object.keys(echartsData),
        boundaryGap: false, // 不留白，从原点开始
      },
    ],

    yAxis: [
      {
        // y轴的线
        axisLine: {
          onZero: true,
          lineStyle: {
            color: "#A9AEB8",
          },
        },

        type: "value",
        // max: Math.ceil(Math.max(...Object.values(echarts1OptionsDate)) * 2),
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
      },
    ],

    grid: [
      {
        top: 10,
        left: 70,
        right: 0,
        bottom: 0,
        height: "75%",
      },
    ],

    series: series,
  }


  options2.series = series;
}

// 过滤第一个表
const filterEcharts1 = (data, startDate, endDate) => {
  const result = {};
  for (const date in data) {
    if (date >= startDate && date <= endDate) {
      result[date] = data[date];
    }
  }
  return result;
};

// 过滤第二个表
const filterEcharts2 = (data, startDate, endDate) => { };

// 确认过滤时间
const onOk1 = (selectedArr: string[]) => {
  const startDate = selectedArr[0].split(" ")[0]; // 开始时间
  const endDate = selectedArr[1].split(" ")[0]; // 结束时间
  // 过滤出 指定时间内的数据
  const selectedData = filterEcharts1(echartsData, startDate, endDate);
  // 修改option的值
  options1.xAxis[0].data = Object.keys(selectedData);
  options1.series[0].data = Object.values(selectedData);

  // 重置刷新echatrs
  myChart1.setOption(options1);

  console.log("onOk1:", selectedData, startDate, endDate);
};

const onOk2 = (selectedArr: string[]) => {
  const startDate = selectedArr[0].split(" ")[0]; // 开始时间
  const endDate = selectedArr[1].split(" ")[0]; // 结束时间
  // 过滤出 指定时间内的数据
  const selectedData = filterEcharts1(echartsData, startDate, endDate);
  // 修改option的值
  options2.xAxis[0].data = Object.keys(selectedData);
  options2.series[0].data = Object.values(selectedData);

  // 重置刷新echatrs
  myChart2.setOption(options2);

  console.log("onOk2:", selectedData, startDate, endDate);
};

onBeforeMount(() => {
})

onMounted(() => {

  initData();


  initEcahrts();

});

// 在组件销毁时销毁图表
const destroyChart = () => {
  myChart1 && myChart1?.clear();
  myChart1 && myChart1?.dispose();
  myChart1 && (myChart1 = null);
};

// 禁用选择的时间
const disabledDate = (current) => {
  const currentDate = new Date(current);
  const previousDate = new Date(tableInfo?.value.time.startTime);
  const nextDate = new Date(tableInfo?.value.time.endTime);

  return (
    currentDate.getTime() < previousDate.getTime() ||
    currentDate.getTime() > nextDate.getTime()
  );
};

// 截图
const screenPNG = (tableName, event: Element) => {
  // 通过id获取dom
  const node = event.target.parentElement.parentElement.parentElement;

  domToImage
    .toPng(node)
    .then((dataUrl) => {
      // 输出图片的Base64,dataUrl，下载到本地
      // 生成一个a元素
      const a = document.createElement("a");
      // 创建一个单击事件
      const event = new MouseEvent("click");
      // 设置图片名称没有设置则为默认
      a.download = `${tableName}`;
      // 将生成的URL设置为a.href属性
      a.href = dataUrl;
      // 触发a的单击事件
      a.dispatchEvent(event);
    })
    .catch(function (error) {
      console.error(error);
    });
};

// 监听数据变化
watchEffect(() => { });

onBeforeUnmount(() => {
  destroyChart();
});
</script>

<template>
  <!-- echarts表格的内容  -->
  <div class="echarts-content">
    <!-- echarts头信息 -->
    <div class="echarts-header">
      <div class="left-name">{{ id }}</div>
      <!-- 下载图片 -->
      <div class="downLoadPng">
        <a-button type="primary" @click="screenPNG(`00010040463535（电能表）`, $event)">导出图片</a-button>
      </div>
    </div>

    <!-- 实际的表 -->
    <div class="tabel">
      <!-- 表一 -->
      <div class="echarts-content-item tabel-1">
        <!-- 表头  -->
        <div class="item-info">
          <!-- 名称 -->
          <div class="name">瞬时有功统计（kWh）</div>
          <!-- 日期  -->
          <div class="data">
            <div class="txt">时间选择</div>
            <!-- 日期选择器 -->
            <div class="date-select">
              <a-range-picker v-model="selectedData.data1" :allow-clear="false" :show-confirm-btn="true" @ok="onOk1"
                :disabledDate="disabledDate" format="YYYY-MM-DD" />
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <div class="echarts1 ec" ref="echarts1"></div>
      </div>

      <!-- 表二 -->
      <div class="echarts-content-item tabel-2">
        <!-- 表头  -->
        <div class="item-info">
          <!-- 名称 -->
          <div class="name">[谷电] 瞬时有功统计（kWh）</div>
          <!-- 日期  -->
          <div class="data">
            <div class="txt">时间选择</div>
            <!-- 日期选择器 -->
            <div class="date-select">
              <a-range-picker v-model="selectedData.data2" :allow-clear="false" :show-confirm-btn="true" @ok="onOk2"
                :disabledDate="disabledDate" format="YYYY-MM-DD" />
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <div class="echarts2 ec" ref="echarts2"></div>

        <!-- 显示的时间段 -->
        <div class="show-time">
          <div class="show-time-item" v-for="(i, index) in showTimeList" :key="'show-time_' + index">
            <div class="colorBorder" :style="'background-color:' + i.color"></div>
            <div class="time">{{ i.timeFrame }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
