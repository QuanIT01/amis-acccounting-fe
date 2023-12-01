<template>
  <div id="toast-list" class="toast-container">
    <template v-for="toast in toastStore.toastArr" :key="toast.key">
      <MISAToastMessageVue
        @close="toastStore.removeMessage(toast.key)"
        @undo="toast.undo"
        :undo="typeof toast.undo === 'function'"
        :type="toast.type"
        :title="toast.title"
        :message="toast.message"
      />
    </template>
  </div>
</template>

<script setup>
import MISAToastMessageVue from "./MISAToastMessage.vue";
import { useToastStore } from "../../../stores/toast-store";

const toastStore = useToastStore();
</script>

<style scoped>
@import url("./toastmessage.css");
</style>
