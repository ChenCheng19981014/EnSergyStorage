<style scoped lang="scss">
.index {
  min-width: 1280px;
  height: 100%;
  position: relative;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
onMounted(() => {});
</script>

<template>
  <div class="index">
    <router-view />
  </div>
</template>
