<template>
  <div :class="['ms-row', ...classNames]">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // Chỉ định khoảng cách giữa các cột (8, 16, 24)
  gutter: {
    type: Object,
    default() {
      return {
        x: 0,
        y: 0,
      };
    },
  },
});

/**
 * Description: Chuyển đổi prop thành tên class
 *
 */
const classNames = computed(() => {
  try {
    const classArr = [];

    if (props.gutter?.x) {
      classArr.push(`--gutter-x-${props.gutter.x}`);
    }
    if (props.gutter?.y) {
      classArr.push(`--gutter-y-${props.gutter.y}`);
    }

    return classArr;
  } catch (error) {
    console.warn(error);
    return [];
  }
});
</script>

<style scoped>
@import url("./grid.css");
</style>
