<template>
  <ul
    :class="['ms-context-menu', { '--small': props.small }]"
    :style="{ width: props.width + 'px' }"
  >
    <slot></slot>
  </ul>
</template>

<script setup>
const props = defineProps({
  // Context menu nhỏ hơn
  small: {
    type: Boolean,
    default: false,
  },

  // Chỉ định chiều dài
  width: {
    type: [String, Number],
    default: 250,
  },
});
</script>

<style scoped>
@import url("./context-menu.css");
</style>
