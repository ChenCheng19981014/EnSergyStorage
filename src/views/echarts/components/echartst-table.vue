<style scoped lang="scss">
.echarts-table {
  margin-top: 40px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: #fff;
  padding: 28px 40px;

  .echarts-table-item {
    width: 100%;
    height: 271px;
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <div class="echarts-table">
    <div
      class="echarts-table-item"
      v-for="(_, index) in new Array(2).fill('')"
    ></div>
  </div>
</template>
