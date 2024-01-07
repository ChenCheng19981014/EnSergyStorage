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
      .e {
        margin-top: 24px;
        width: 100%;
        height: 271px;
        background-color: rgba(4, 135, 255, 0.15);
      }
      padding-bottom: 40px;
    }

    .tabel-2 {
      margin-top: 40px;
      .e {
        margin-top: 24px;
        width: 100%;
        height: 318px;
        background-color: rgba(4, 135, 255, 0.15);
        border-bottom: 1px solid transparent !important;
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

          .data-select {
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
    }
  }
}
</style>

<style lang="scss">
.downLoadPng .arco-btn {
  border-radius: 4px;
}

.data-select .arco-picker {
  width: 100% !important;
  height: 100%;
  margin: 0 !important;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import domToImage from "dom-to-image";

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
</script>

<template>
  <!-- echarts表格的内容  -->
  <div class="echarts-content">
    <!-- echarts头信息 -->
    <div class="echarts-header">
      <div class="left-name">00010040463535（电能表）</div>
      <!-- 下载图片 -->
      <div class="downLoadPng">
        <a-button
          type="primary"
          @click="screenPNG(`00010040463535（电能表）`, $event)"
          >导出图片</a-button
        >
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
            <div class="data-select">
              <a-range-picker
                style="width: 360px; margin: 0 24px 24px 0"
                show-time
                :time-picker-props="{ defaultValue: ['00:00:00', '09:09:06'] }"
                format="YYYY-MM-DD HH:mm"
              />
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <!-- <ChartBase></ChartBase> -->
        <div class="e"></div>
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
            <div class="data-select">
              <a-date-picker
                style="width: 220px; margin: 0 24px 24px 0"
                show-time
                format="YYYY-MM-DD hh:mm"
              />
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <!-- <ChartBase></ChartBase> -->
        <div class="e"></div>
      </div>
    </div>
  </div>
</template>
