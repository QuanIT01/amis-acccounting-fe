<template>
  <div
    :class="[
      `ms-icon--${props.size}`,
      `ms-icon--${props.icon}-${props.size}`,
      { 'ms-icon--no-color': props.noColor },
    ]"
  ></div>
</template>

<script setup>
const props = defineProps({
  // Kích thước của icon bao gồm: 24, 20, 16
  size: {
    type: [Number, String],
    default: 24,
  },

  // Loại icon
  icon: {
    type: [String],
    default: "bag",
  },

  // Dành cho icon không cần set màu sắc
  noColor: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
@import url("./icon-base.css");
@import url("./icons.css");
</style>
