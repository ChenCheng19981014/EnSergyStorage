<style scoped lang="scss">
.message .message-item:first-child {
  padding-left: 0px;
}
.message {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;

  .message-item {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    border-right: 1px solid #e5e6eb;

    .key {
      font-family: "SourceHanSansCN";
      color: #4e5969;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .msg {
      margin-left: 10px;
      font-family: "SourceHanSansCN";
      color: #4e5969;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>

<script setup lang="ts">
import { ref, onMounted, toRefs } from "vue";

// 拿到 标题的 信息
const props = defineProps(["messageInfo"]);
const { messageInfo } = toRefs(props);
console.log("messageInfo:", messageInfo);
onMounted(() => {});
</script>

<template>
  <div class="message">
    <div class="message-item" v-for="(info, _) in messageInfo">
      <div class="key">{{ Object.keys(info)[0] }}:</div>
      <div class="msg">{{ Object.values(info)[0] }}</div>
    </div>
  </div>
</template>
