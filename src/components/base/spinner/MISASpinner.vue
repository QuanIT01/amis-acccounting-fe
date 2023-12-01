<template>
  <div :class="['ms-spinner', { '--absolute': props.absolute }]"></div>
</template>

<script setup>
const props = defineProps({
  absolute: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
@import url("./spinner.css");
</style>
