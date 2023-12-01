<template>
  <div :class="['ms-divider', `--gutter-${props.gutter}`]"></div>
</template>

<script setup>
const props = defineProps({
  gutter: {
    type: [String, Number],
    default: "8",
  },
});
</script>

<style scoped>
@import url("./divider.css");
</style>
