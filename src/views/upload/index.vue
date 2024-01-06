<style scoped lang="scss">
.index {
  min-width: 1280px;
  height: 100%;
  position: relative;
  .index-logo {
    position: absolute;
    top: 60px;
    left: 60px;
  }

  .index-picture {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }

  .index-upload {
    width: 400px;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    position: absolute;
  }
}
</style>

<style lang="scss">
// 上传反馈栏
.upload-arco .arco-upload-list {
  width: 424px !important;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";

onMounted(() => {});
</script>

<template>
  <div class="index">
    <!-- 零碳 logo -->
    <Logo class="index-logo"></Logo>

    <!-- 人物 picture-->
    <Picture class="index-picture"></Picture>

    <!-- 上传 -->
    <UpLoad class="index-upload"></UpLoad>
  </div>
</template>
