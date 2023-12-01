<template>
  <div @dblclick.stop="" @click.stop="handleChecked" class="ms-checkbox">
    <input :checked="!!props.checked" type="checkbox" class="ms-checkbox__input" />
    <div class="ms-checkbox__check-mark"></div>

    <div v-if="props.label" class="ms-checkbox__label">{{ props.label }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  // Giá trị đã được chọn của checkbox
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: "",
  },

  // Giá trị của checkbox
  value: {
    type: [String, Number, Boolean],
    default: "",
  },

  // Hiển thị label cho checkbox
  label: {
    type: String,
    default: "",
  },

  // Trạng thái checked
  checked: {
    type: Boolean,
    default: false,
  },
});

const prev = ref(props.modelValue);

/**
 * Description: Hàm xử lý checked khi modelValue nhận vào
 * một mảng hoặc một giá trị bất kỳ
 *
 */
const handleChecked = () => {
  try {
    if (Array.isArray(props.modelValue)) {
      // Nếu là mảng:
      // Push phần tử vào mảng nếu chưa có trong mảng
      // ngược lại xoá phần tử đó khỏi mảng

      let prevArr = [...props.modelValue];

      if (prevArr.includes(props.value)) {
        prevArr = prevArr.filter((value) => value !== props.value);
      } else {
        prevArr.push(props.value);
      }

      emit("update:modelValue", prevArr);
    } else {
      // Nếu không phải mảng:
      // Là giá trị của checkbox nếu được checked
      // ngược lại lấy giá trị ban đầu

      if (props.modelValue !== props.value) {
        emit("update:modelValue", props.value);
      } else {
        emit("update:modelValue", prev.value);
      }
    }
  } catch (error) {
    console.warn(error);
  }
};
</script>

<style scoped>
@import url("./checkbox.css");
</style>
