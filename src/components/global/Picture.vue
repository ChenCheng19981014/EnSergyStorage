<style scoped lang="scss">
.picture {
  // width: 665px;
  // height: 741px;
  > img {
    width: 100%;
    height: auto;
  }
}
</style>

<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <div class="picture">
    <img src="@/assets/img/person.png" />
  </div>
</template>
