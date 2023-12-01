<template>
  <div
    @keydown.esc="$emit('close')"
    @keydown.enter="$emit('submit')"
    tabindex="-1"
    class="ms-popup-overlay"
  >
    <div @click.stop="" class="ms-popup" :style="{ width: props.width + 'px' }">
      <div class="ms-popup__header">
        <h4 class="ms-popup__title">{{ props.title }}</h4>
        <div class="ms-popup__header-controls">
          <slot name="header-controls"></slot>
        </div>
      </div>
      <div @click="$emit('close')" class="ms-popup__close" title="Đóng">
        <MISAIcon icon="times" />
      </div>

      <div class="ms-popup__content">
        <p v-if="props.description" class="ms-popup__desc">
          {{ props.description }}
        </p>
        <slot></slot>
      </div>

      <div class="ms-popup__controls">
        <div class="ms-popup__controls-left">
          <slot name="controls-left"></slot>
        </div>
        <div class="ms-popup__controls-right">
          <slot name="controls-right"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MISAIcon from "../icon/MISAIcon.vue";

defineEmits(["close", "submit"]);

const props = defineProps({
  // Tiêu đề popup
  title: {
    type: String,
    default: "Tiêu đề",
  },

  // Mô tả
  description: String,

  // Xác định chiều rộng của popup
  width: {
    type: Number,
    default: 400,
  },
});
</script>

<style scoped>
@import url("./popup.css");
</style>
