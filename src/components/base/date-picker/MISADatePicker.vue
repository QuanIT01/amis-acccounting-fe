<template>
  <label @focus="openMenu" :tabindex="props.tabindex" class="ms-date-picker">
    <div tabindex="-1" ref="focusFlag"></div>
    <VueDatePicker
      :model-value="props.modelValue"
      @update:model-value="setDate"
      :format="formatInput"
      :text-input-options="textInputOptions"
      auto-apply
      keep-action-row
      :enable-time-picker="false"
      hide-input-icon
      :teleport="true"
      :position="props.position"
      space-confirm
      offset="4"
      placeholder="DD/MM/YYYY"
      input-class-name="ms-date-picker__input"
      menu-class-name="ms-date-picker__menu"
      calendar-class-name="ms-date-picker__calendar"
      calendar-cell-class-name="ms-date-picker__calendar-cell"
      ref="datePickerRef"
    >
      <!-- menu header -->
      <template #month-year="{ month, year, handleMonthYearChange }">
        <div class="ms-date-picker__header">
          <div class="ms-date-picker__header-date">
            {{ MISAResource[globalStore.lang]?.Month["M" + (month + 1)] }}, {{ year }}
          </div>
          <div class="ms-date-picker__header-controls">
            <MISAIcon @click="handleMonthYearChange(false)" icon="angle-left" />
            <MISAIcon @click="handleMonthYearChange(true)" icon="angle-right" />
          </div>
        </div>
      </template>

      <!-- calendar header -->
      <template #calendar-header="{ day }">
        <div class="ms-date-picker__calendar-header-item">
          {{ MISAResource[globalStore.lang]?.Day[day] }}
        </div>
      </template>

      <template #action-row>
        <div @click="getToday" class="ms-date-picker__action">
          {{ MISAResource[globalStore.lang]?.Day["Today"] }}
        </div>
      </template>
    </VueDatePicker>
    <MISAIcon icon="date" />
  </label>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import MISAIcon from "../icon/MISAIcon.vue";
import formatDate from "../../../helper/format-date";
import MISAResource from "@/resource/resource";
import { useGlobalStore } from "@/stores/global-store";
import { ref } from "vue";

const emit = defineEmits(["update:modelValue"]);
const datePickerRef = ref(null);
const focusFlag = ref(null);

const globalStore = useGlobalStore();

const props = defineProps({
  // Giá trị
  modelValue: Date,

  // Tabindex
  tabindex: [String, Number],

  // Vị trí của menu: left | right | center
  position: {
    type: String,
    default: "center",
  },
});

const textInputOptions = ref({
  enterSubmit: true,
  tabSubmit: true,
  openMenu: true,
});

/**
 * Description: Update giá trị được chọn
 *
 */
const setDate = (value) => {
  emit("update:modelValue", value);

  focusFlag.value.focus();
};

/**
 * Description: Update giá trị là ngày hôm nay
 *
 */
const getToday = () => {
  try {
    const today = new Date();

    emit("update:modelValue", today);

    // Đóng menu chọn ngày
    if (datePickerRef.value) {
      datePickerRef.value.switchView("year");
      datePickerRef.value.closeMenu();
    }
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Format date hiển thị lên input
 *
 */
const formatInput = (date) => {
  try {
    if (typeof date === "object") {
      return formatDate(date.toJSON(), "DD/MM/YYYY");
    } else {
      return null;
    }
  } catch (error) {
    console.warn(error);
  }
};

const openMenu = () => {
  datePickerRef.value.openMenu();
};
</script>

<style>
@import url("@vuepic/vue-datepicker/dist/main.css");
@import url("./date-picker.css");
</style>
