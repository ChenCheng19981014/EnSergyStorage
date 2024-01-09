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
    line-height: 44px;
    /* 122.222% */
  }

  .upload-arco {
    margin-top: 80px;
    width: 100%;
    // height: 244px;
  }

  .upload-submit {
    width: 100%;
    height: 32px;
    margin-top: 40px;
  }
}
</style>

<style lang="scss">
// 确认提交 按钮
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

.upload-submit .submit-btn {
  background: #94bfff;
  color: #fff;
  font-size: 14px;

  &:hover {
    color: #fff;
    cursor: not-allowed;
    background: #94bfff;
  }
}

.upload-submit .submit-btn:active {
  background: #94bfff;
  color: #fff;
}

.upload-submit .can-submit:active {
  background: #0e42d2 !important;
  color: #fff;
}

.upload-submit .can-submit {
  background: #165dff;
  color: #fff;

  &:hover {
    color: #fff;
    background: #4080ff;
  }
}
</style>

<script setup lang="ts">
//npm install iconv-lite
import { useRouter } from "vue-router";
import { PiniaTableInfo } from "@/pinia/table";
import { ref, onMounted } from "vue";
import * as XLSX from "xlsx";
import { gsap } from "gsap";
import { Message } from "@arco-design/web-vue";

// 更新表信息
const { refleshTableInfo } = PiniaTableInfo();

const router = useRouter();
//文件列表
const fileList = ref<HTMLInputElement[]>([]);
// 当前的选中的文件
const file = ref<HTMLInputElement>();

// 上传是否成功
const upLoadSuccess = ref(false);

//  导入表格 功能
const importExcel = (file: HTMLInputElement | any) => {
  // 传入的文件类型
  const fileType = file.type;

  //  文件存储
  fileList.value.push(file);
  // 取文件名称
  const fileName = file.name.includes(".xlsx")
    ? file.name.replace(".xlsx", "")
    : file.name.replace(".xls", "");

  // 文件读取器
  const fileReader = new FileReader();

  // console.log("file:", file);

  fileReader.onload = (ev: any) => {
    try {
      const data = ev.target.result;

      const workbook = XLSX.read(data, {
        raw: true,
        type: "binary",
        // 1252为默认值，936为中文简体编码
        codepage: 936,
        cellText: fileType === "text/csv", // 强制将字符串转换不不变
        // codepage: 65001, // 设置编码为 UTF-8
      });

      const wsname = workbook.SheetNames[0]; //取第一张表，wb.SheetNames[0]是获取Sheets中第一个Sheet的名字

      const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容，wb.Sheets[Sheet名]获取第一个Sheet的数据

      const excellist = [] as any; //清空接收数据

      //编辑数据
      for (var i = 0; i < ws.length; i++) {
        excellist.push(ws[i]);
      }

      // 获取表头2-1
      const sheet = workbook.Sheets[wsname];

      console.log(
        // "第一个表名：",
        // wsname,
        "\n读取结果",
        excellist
        // "\n表信息：",
        // sheet
      );

      // 更新 pinia中表的数据
      refleshTableInfo(excellist);

      // console.log(JSON.stringify(excellist), "excellist");

      // sessionStorage.setItem("PiniaTableInfo", JSON.stringify(excellist));

      // console.log("PiniaTableInfo:", PiniaTableInfo);

      // 渲染表格1-2
    } catch (e) {
      return alert("读取失败!");
    }
  };

  const blob = new Blob([file], { type: fileType });

  // 读取xlsx表格数据
  // fileReader.readAsBinaryString(blob);
  // fileReader.readAsText(blob, 'gbk');

  // csv格式特殊处理 使用GBK读取文档的方式
  if (fileType === "text/csv") {
    fileReader.readAsText(blob, "GBK");
  } else {
    fileReader.readAsBinaryString(blob);
  }
};

// 上传文件 之前
const onBeforeUpload = (file: HTMLInputElement | any) => {
  if (!/\.(xls|xlsx|csv)$/.test(file.name.toLowerCase())) {
    Message.error({
      id: "upLoadError",
      content: `上传格式不正确，请上传xls或xlsx或csv格式`,
      duration: 3000,
    });
    return false;
  } else {
    return true;
  }
};

// 移除 时 (之前 )触发
const onBeforeRemove = () => {
  // 重置 上传按钮的 状态
  upLoadSuccess.value = false;

  // 更新 pinia中表的数据
  PiniaTableInfo().refleshTableInfo([]);

  return true;
};

// 自定义上传请求
const customRequest = (option) => {
  const { onProgress, onError, onSuccess, fileItem, name } = option;

  // console.log("自定义上传请求:", option);

  // 重置 上传按钮的 状态
  upLoadSuccess.value = false;
  // 创建一个补帧动画
  const animation = gsap.to(
    {},
    {
      duration: 1,

      onUpdate: function () {
        const progress = this.progress();
        // 进度
        onProgress(progress);
        // 在这里处理每一帧更新时的逻辑
      },
      onComplete: function () {
        //导入数据
        importExcel(fileItem.file);

        // 上传成功
        upLoadSuccess.value = true;

        //上传成功
        onSuccess();

        Message.success({
          id: "upLoadSuccess",
          content: `上传读取完毕 可提交表单`,
          duration: 4000,
        });
      },
    }
  );

  // 开始补帧动画
  animation.play();
};

// 提交 表单信息
const uploadData = () => {
  if (upLoadSuccess.value) {
    //跳转
    router.push("/echarts");
  } else {
    Message.error({
      id: "upLoadError",
      content: `请先上传Excel文件再提交`,
      duration: 3000,
    });
  }
};

onMounted(() => {});
</script>

<template>
  <div class="upload">
    <!-- 名称 -->
    <div class="title">储能图表生成器</div>

    <!-- 上传模块 -->
    <div class="upload-arco">
      <a-upload
        draggable
        :multiple="false"
        :custom-request="customRequest"
        :on-before-remove="onBeforeRemove"
        :on-before-upload="onBeforeUpload"
        @default-file-list="fileList"
      />
    </div>

    <!-- 提交按钮 -->
    <div class="upload-submit">
      <a-button
        @click="uploadData"
        :class="`${upLoadSuccess ? 'can-submit' : 'submit-btn'}`"
        >生成表单</a-button
      >
    </div>
  </div>
</template>
