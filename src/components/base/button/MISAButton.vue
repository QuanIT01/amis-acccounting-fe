<template>
  <button
    @click.stop="handleOnClick"
    :class="[
      `ms-btn`,
      `ms-btn--${props.type}`,
      { 'ms-btn--icon': $slots.icon && !$slots.default },
      { 'ms-btn--with-icon': $slots.icon && $slots.default },
      { 'ms-btn--has-dropdown': $slots.dropdown && isOpenDropdown },
    ]"
    :disabled="props.disabled"
  >
    <!-- Trạng thái loading -->
    <MISASpinner v-if="props.loading" absolute />

    <div class="ms-btn__content" :style="{ opacity: props.loading ? 0 : 1 }">
      <!-- Chỉ chứa icon -->
      <div v-if="$slots.icon" class="ms-btn__icon">
        <slot name="icon"></slot>
      </div>

      <!-- Chứa text-->
      <slot></slot>
    </div>

    <!-- Menu dropdown (nếu có) -->
    <div
      v-if="$slots.dropdown"
      @click.stop=""
      :class="['ms-btn__dropdown', `--pos-${props.dropdownPos}`, { '--active': isOpenDropdown }]"
    >
      <slot name="dropdown"></slot>
    </div>
  </button>
</template>

<script setup>
import MISASpinner from "../spinner/MISASpinner.vue";
import { ref, onMounted, onUnmounted } from "vue";

const isOpenDropdown = ref(false);

const emit = defineEmits(["click"]);

const props = defineProps({
  // Loại button (primary, secondary, danger, link)
  type: {
    type: String,
    default: "primary",
  },

  // Vô hiệu hoá button
  disabled: {
    type: Boolean,
    default: false,
  },

  // Vị trí dropdown (bottom-right | bottom-left)
  dropdownPos: {
    type: String,
    default: "bottom-right",
  },

  // Trạng thái loading
  loading: {
    type: Boolean,
    default: false,
  },
});

/**
 * Description: Xử lý sự kiện click button
 *
 */
const handleOnClick = (event) => {
  emit("click", event);

  isOpenDropdown.value = !isOpenDropdown.value;
};

/**
 * Description: Tắt dropdown của button
 *
 */
const closeDropdown = () => {
  isOpenDropdown.value = false;
};

/**
 * Description: Thêm sự kiện click outside để tắt dropdown
 *
 */
onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

/**
 * Description: Loại bỏ event khi component được unmounted
 *
 */
onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
@import url("./button.css");
</style>
