<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: #fff;
  padding: 16px 32px;

  .back {
    width: 48px;
    height: 22px;
    color: #86909c;
    font-family: "SourceHanSansCN";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .icon {
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .txt {
      font-family: "SourceHanSansCN";
      display: flex;
      justify-content: center;
      align-items: center;
      color: #86909c;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
    }
  }

  .title {
    font-family: "SourceHanSansCN";
    color: #1D2129;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
}
</style>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, toRefs } from "vue";
const router = useRouter();
// 返回上传页面
const backToUpLoad = () => {
  router.push("/upload");
};
const props = defineProps(["company"]);
const { company } = toRefs(props);
</script>

<template>
  <div class="header">
    <div class="back" @click="backToUpLoad">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.71394 13.6716L10.6567 12.7288L5.9427 8.01476L10.6567 3.30072L9.71394 2.35791L4.52854 7.54333C4.52854 7.54333 4.52847 7.54336 4.9999 8.01476L4.52854 7.54333L4.05707 8.01476L9.71394 13.6716Z"
            fill="#86909C"
          />
        </svg>
      </div>
      <div class="txt">返回</div>
    </div>

    <div class="title">{{ company }}</div>
  </div>
</template>
