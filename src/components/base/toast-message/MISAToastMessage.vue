<template>
  <div :class="['ms-toast', `--${props.type}`]">
    <div class="ms-toast__icon">
      <MISAIcon :icon="props.type" />
    </div>
    <div class="ms-toast__content">
      <span class="ms-toast__title">{{ props.title }}</span
      >{{ " " }}
      <span class="ms-toast__text">{{ props.message }}</span>
    </div>
    <span v-if="props.undo" @click="$emit('undo')" class="ms-toast__action">Hoàn tác</span>
    <div @click="$emit('close')" class="ms-toast__close" title="Đóng">
      <MISAIcon size="20" icon="times" />
    </div>
  </div>
</template>

<script setup>
import MISAIcon from "../icon/MISAIcon.vue";

defineEmits(["close", "undo"]);

const props = defineProps({
  type: {
    type: String,
    default: "info",
  },
  title: {
    type: String,
    default: "Tiêu đề",
  },
  message: {
    type: String,
    default: "Thông báo",
  },
  undo: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
@import url("./toastmessage.css");
</style>
