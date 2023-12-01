<template>
  <div
    :class="[
      'ms-form__group',
      { '--error': props.errorMsg },
      { '--space-bottom': props.spaceBottom },
    ]"
  >
    <label :for="props.for" class="ms-label"
      >{{ props.label }}
      <span v-if="requiredMark" class="ms-label--requried">*</span>
    </label>

    <slot></slot>

    <p class="ms-input-text">{{ props.errorMsg }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  // Nội dung label
  label: {
    type: String,
    default: "Label",
  },

  // Hiện đánh dấu bắt buộc
  requiredMark: {
    type: Boolean,
    default: false,
  },

  // Thuộc tính của label liên kết với input
  for: String,

  // Thông báo lỗi
  errorMsg: String,

  // Thêm khoảng cách bên dưới
  spaceBottom: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
@import url("./input.css");
</style>
