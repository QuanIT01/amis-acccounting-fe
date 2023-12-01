<template>
  <li @click="$emit('click', $event)" class="ms-context-menu__item">
    <div v-if="$slots.icon" class="ms-context-menu__icon">
      <slot name="icon"></slot>
    </div>
    <div class="ms-context-menu__text">
      <slot></slot>
    </div>
  </li>
</template>

<script setup>
defineEmits(["click"]);
</script>

<style scoped>
@import url("./context-menu.css");
</style>
