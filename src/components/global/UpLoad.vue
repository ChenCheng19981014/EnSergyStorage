<style scoped lang="scss">
.upload {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  .title {
    color: #2b3674;
    text-align: center;
    font-family: "SourceHanSansCN";
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: 44px; /* 122.222% */
  }

  .upload-arco {
    margin-top: 80px;
    width: 100%;
    height: 244px;
  }

  .upload-submit {
    width: 100%;
    height: 32px;
    margin-top: 40px;
  }
}
</style>

<style lang="scss">
.upload-submit .arco-btn {
  width: 100%;
  height: 100%;
}

// 上传框
.upload-arco .arco-upload-wrapper {
  width: 100%;
  height: 100%;

  // icon样式
  .arco-icon {
    width: 16px;
    height: 16px;
    stroke: rgb(78, 89, 105);
  }

  // 上传文本样式
  .arco-upload-list-item-name-text {
    color: #1d2129;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }

  // 特殊处理报错 icon
  .arco-upload-icon-error {
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    fill: #1d2129;
    border-radius: 50%;
    background-color: rgb(78, 89, 105);
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as XLSX from "xlsx";
// 表格表头配置数组
const tableColumn = ref([]) as any;
// 合并单元格信息
const mergedCells = ref([]) as any;
//文件列表
const fileList = ref([]);
// 当前的选中的文件
const file = ref();

//导入表格
const importExcel = (files) => {

  const fileName = files[0].name.includes(".xlsx")
    ? files[0].name.replace(".xlsx", "")
    : files[0].name.replace(".xls", "");
  console.log("文件名称：", fileName);

  if (!files.length) {
    return;
  } else if (!/\.(xls|xlsx|csv)$/.test(files[0].name.toLowerCase())) {
    return alert("上传格式不正确，请上传xls或者xlsx格式");
  }
  const fileReader = new FileReader();
  fileReader.onload = (ev: any) => {
    try {
      const data = ev.target.result;

      const workbook = XLSX.read(data, {
        type: "binary",
      });

      const wsname = workbook.SheetNames[0]; //取第一张表，wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
      const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容，wb.Sheets[Sheet名]获取第一个Sheet的数据
      const excellist = [] as any; //清空接收数据

      //编辑数据
      for (var i = 0; i < ws.length; i++) {
        excellist.push(ws[i]);
      }

      console.log("第一个表名：", wsname, "\n读取结果", excellist); // 此时得到的是一个内容是对象的数组需要处理

      // 获取表头2-1
      const sheet = workbook.Sheets[wsname];

      // console.log(workbook, sheet, headers, "sheet---");

      // 渲染表格1-2
    } catch (e) {
      return alert("读取失败!");
    }
  };
};

// 进度
const onProgress = (currentFile) => {
  file.value = currentFile;
};

// 上传文件之前
const beforeUpload = (file) => {
  importExcel(file);
  return false;
};

// 移除文件前触发
const onBeforeRemove = (file: any) => {
  console.log("文件:", file);
};

onMounted(() => {});
</script>

<template>
  <div class="upload">
    <svg-icon class-name="size-icon" icon-class="size" />

    <!-- 名称 -->
    <div class="title">储能图表生成器</div>

    <!-- 上传模块 -->
    <div class="upload-arco">
      <a-upload
        :multiple="false"
        draggable
        @success="importExcel"
        @progress="onProgress"
        @on-before-remove="onBeforeRemove"
        @before-upload="beforeUpload"
        :default-file-list="fileList"
      />
    </div>

    <!-- 提交按钮 -->
    <div class="upload-submit">
      <a-button type="primary">生成表单</a-button>
    </div>
  </div>
</template>
