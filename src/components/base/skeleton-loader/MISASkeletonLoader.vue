<template>
  <div
    :style="{ width: calculatedSize.width, height: calculatedSize.height }"
    :class="['skeleton-box', `--animation-${props.animation}`, `--type-${props.type}`]"
  ></div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // Xác định hình dạng cho skeleton: rect, circle
  type: {
    type: String,
    default: "circle",
  },

  // Xác định chiều rộng cho skeleton
  width: {
    type: [String, Number],
    default: "",
  },

  // Xác định chiều cao cho skeleton
  height: {
    type: [String, Number],
    default: "",
  },

  // Xác định kiểu animation: none, wave, fade
  animation: {
    type: String,
    default: "fade",
  },
});

/**
 * Description: Chuyển đổi width, height dạng số sang text
 *
 */
const calculatedSize = computed(() => {
  try {
    const skeletonSize = {
      width: props.width,
      height: props.height,
    };

    if (typeof skeletonSize.width === "number") {
      skeletonSize.width = skeletonSize.width + "px";
    }

    if (typeof skeletonSize.height === "number") {
      skeletonSize.height = skeletonSize.height + "px";
    }

    return skeletonSize;
  } catch (error) {
    console.warn(error);

    return {
      width: props.width,
      height: props.height,
    };
  }
});
</script>

<style scoped>
@import url("./skeleton-loader.css");
</style>
