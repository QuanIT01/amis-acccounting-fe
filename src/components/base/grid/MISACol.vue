<template>
  <div :class="classNames">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // Độ rộng của một cột: từ 1 - 12
  span: [Number, String],
});

/**
 * Description: Xử lý chuyển đổi prop thành tên class
 *
 */
const classNames = computed(() => {
  const classArr = ["ms-col"];

  if (props.span) {
    classArr.push(`ms-col--${props.span}`);
  } else {
    classArr.push("ms-col--auto");
  }

  return classArr;
});
</script>

<style scoped>
@import url("./grid.css");
</style>
