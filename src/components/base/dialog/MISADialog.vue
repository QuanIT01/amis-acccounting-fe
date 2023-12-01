<template>
  <div @click="$emit('cancel')" :class="[`ms-dialog-overlay`, '--active']">
    <div @click.stop="" class="ms-dialog">
      <h4 class="ms-dialog__title">{{ props.title }}</h4>
      <div
        @click="$emit('cancel')"
        class="ms-dialog__close"
        :title="MISAResource[globalStore.lang]?.Tooltip?.Close"
      >
        <MISAIcon icon="times" />
      </div>

      <div class="ms-dialog__content">
        <div class="ms-dialog__icon">
          <MISAIcon :icon="props.type" />
        </div>
        <p class="ms-dialog__text">
          {{ props.description }}
        </p>
      </div>

      <div class="ms-dialog__controls">
        <slot>
          <MISAButton v-if="props.cancelText" @click="$emit('cancel')" type="secondary">{{
            props.cancelText
          }}</MISAButton>
          <MISAButton @click="$emit('ok')" type="primary">{{ props.okText }}</MISAButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import MISAButton from "../button/MISAButton.vue";
import MISAIcon from "../icon/MISAIcon.vue";
import MISAResource from "@/resource/resource";
import { useGlobalStore } from "@/stores/global-store";

defineEmits(["cancel", "ok"]);

const props = defineProps({
  // Loại dialog (info, warning, error)
  type: {
    type: String,
    default: "info",
  },

  // Tiêu đề
  title: {
    type: String,
    default: "Title",
  },

  // Mô tả
  description: {
    type: String,
    default: "Description",
  },

  // Text của nút Cancel
  cancelText: {
    type: String,
    default: "",
  },

  // Text của nút OK
  okText: {
    type: String,
    default: "OK",
  },
});

const globalStore = useGlobalStore();
</script>

<style scoped>
@import url("./dialog.css");
</style>
