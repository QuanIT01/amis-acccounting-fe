<template>
  <div
    @focusin="openDropdown"
    @click="openDropdown"
    @keydown.stop="preSelectOnPressArrow"
    ref="comboboxRef"
    tabindex="-1"
    :class="['ms-select', { '--show-search': props.search }]"
  >
    <input
      @mousedown.stop=""
      :tabindex="props.tabindex"
      class="ms-select__input"
      :readonly="!props.search"
      type="text"
      :id="props.id"
      :placeholder="props.placeholder"
      v-model="searchValue"
    />

    <div @mousedown.stop="" class="ms-select__toggle" title="Combobox">
      <MISAIcon size="16" icon="angle-down" />
    </div>

    <div @focusin.stop="" @click.stop="clearSelectedValue" tabindex="-1" class="ms-select__clear">
      <MISAIcon size="16" icon="times" />
    </div>

    <div
      @mousedown.stop=""
      @click.stop=""
      @focusin.stop=""
      tabindex="-1"
      v-show="isOpen"
      class="ms-select__list-container"
    >
      <ul class="ms-select__select-list">
        <li :class="['ms-select__item', { '--selected': !selectedValue }]">
          -- {{ props.placeholder }} --
          <div class="ms-select__item-icon">
            <MISAIcon icon="check" />
          </div>
        </li>
        <li
          @click="selectOption(option, index)"
          v-for="(option, index) in optionWithSearch"
          :key="option.value"
          :class="[
            'ms-select__item',
            { '--selected': option.value === selectedValue },
            { '--pre-select': option.value === preSelectValue?.value },
          ]"
          ref="menuItemRef"
        >
          {{ option.label }}
          <div class="ms-select__item-icon">
            <MISAIcon icon="check" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import enums from "@/helper/enum";
import MISAIcon from "../icon/MISAIcon.vue";
import { computed, onMounted, onUnmounted, watch } from "vue";
import { ref } from "vue";

const emit = defineEmits(["update:modelValue", "close"]);

const props = defineProps({
  // Danh sách các lựa chọn
  options: {
    type: Array,
    default() {
      return [];
    },
  },

  // Giá trị được chọn
  modelValue: {
    type: String,
    default: "",
  },

  // Placeholder khi không được chọn
  placeholder: {
    type: String,
    default: "Chọn giá trị",
  },

  // Search giá trị (combobox)
  search: {
    type: Boolean,
    default: false,
  },

  // Thuộc tính id cho label focus
  id: {
    type: String,
  },

  // Tabindex
  tabindex: {
    type: String,
    default: "-1",
  },
});

const isOpen = ref(false);
const comboboxRef = ref(null);
const menuItemRef = ref([]);
const selectedValue = ref(null);
const preSelectValue = ref(null);
const preSelectIndex = ref(0);
const searchValue = ref("");

/**
 * Description: Chuyển giá trị của prop modelValue cho state
 * mỗi khi modelValue được thay đổi
 *
 */
watch(
  () => [props.modelValue, props.options],
  () => {
    selectedValue.value = props.modelValue;
  },
  { immediate: true }
);

/**
 * Description: Reset giá trị đã chọn về rỗng
 * khi input search được xoá rỗng (ở chế độ search)
 *
 */
watch(
  () => searchValue.value,
  () => {
    if (props.search && searchValue.value === "") {
      selectedValue.value = null;
      emit("update:modelValue", null);
    }
  }
);

/**
 * Description: Xử lý search option khi ở chế độ search (combobox)
 *
 */
const optionWithSearch = computed(() => {
  try {
    if (props.search) {
      return props.options.filter((option) =>
        option?.label?.toLowerCase()?.includes(searchValue.value?.toLowerCase() || "")
      );
    } else {
      return props.options;
    }
  } catch (error) {
    console.warn(error);
    return props.options;
  }
});

/**
 * Description: Tìm đối tượng được chọn (label, value)
 * từ value của prop
 *
 */
const selectedOption = computed(() => {
  try {
    return props.options.find((option) => option.value === selectedValue.value) ?? {};
  } catch (error) {
    console.warn(error);
    return {};
  }
});

/**
 * Description: Gán giá trị cho input search khi option được chọn
 *
 */
watch(
  () => selectedOption.value,
  () => {
    searchValue.value = selectedOption.value.label;
  }
);

/**
 * Description: Hàm chọn giá trị của combobox
 *
 */
const selectOption = (option, index) => {
  selectedValue.value = option.value;
  emit("update:modelValue", option.value);

  // Set vị trí cuộn cho phẩn tử được chọn
  if (index !== undefined) {
    preSelectIndex.value = index;
  }

  // Đóng dropdown khi chọn xong giá trị
  isOpen.value = false;
};

/**
 * Description: Xử lý di chuyển qua giá trị
 * khi bấm nút mũi tên
 *
 */
const preSelectOnPressArrow = (e) => {
  try {
    const keyCode = e.keyCode;
    const lastIndex = optionWithSearch.value.length - 1;
    const currentIndex = optionWithSearch.value.findIndex(
      (option) => option.value === preSelectValue.value?.value
    );

    if (keyCode === enums.key.ARROW_UP) {
      // Di chuyển lên, nếu đến đầu thì quay về cuối
      if (currentIndex > 0) {
        preSelectValue.value = optionWithSearch.value[currentIndex - 1];
        preSelectIndex.value = currentIndex - 1;
      } else {
        preSelectValue.value = optionWithSearch.value[lastIndex];
        preSelectIndex.value = lastIndex;
      }
    } else if (keyCode === enums.key.ARROW_DOWN) {
      // Di chuyển xuống, nếu đến cuối thì quay lại đầu
      if (currentIndex < lastIndex) {
        preSelectValue.value = optionWithSearch.value[currentIndex + 1];
        preSelectIndex.value = currentIndex + 1;
      } else {
        preSelectValue.value = optionWithSearch.value[0];
        preSelectIndex.value = 0;
      }
    } else if (keyCode === enums.key.ENTER) {
      // Chọn giá trị khi nhấn phím ENTER
      selectOption(preSelectValue.value);
    } else if (keyCode === enums.key.TAB) {
      closeDropdown();
    }

    // Cuộn item lên khung nhìn nếu item bị ẩn
    handleScrollToView(preSelectIndex.value);
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Reset giá trị đã chọn về rỗng (chế độ dropdown list)
 *
 */
const clearSelectedValue = () => {
  try {
    // Cập nhật binding hai chiều
    emit("update:modelValue", null);
    selectedValue.value = null;

    // Xoá search value
    searchValue.value = "";

    // Cuộn về phần tử đầu tiên
    preSelectIndex.value = 0;
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Xử lý scroll item ẩn lên khung nhìn
 *
 */
const handleScrollToView = (index) => {
  try {
    setTimeout(() => {
      if (menuItemRef.value.length > 0) {
        menuItemRef.value[index]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }, 100);
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Sự kiện mở Dropdown
 *
 */
const openDropdown = () => {
  isOpen.value = true;

  //Set lại giá trị cho preSelectValue khi mở dropdown
  preSelectValue.value = selectedOption.value;

  // Cuộn đến phần tử được chọn khi mở dropdown
  handleScrollToView(preSelectIndex.value);
};

/**
 * Description: Sự kiện đóng Dropdown
 *
 */
const closeDropdown = () => {
  if (isOpen.value) {
    emit("close");
  }

  isOpen.value = false;
};

/**
 * Description: Sự kiện click outside
 *
 */
onMounted(() => {
  window.addEventListener("mousedown", closeDropdown);
});

/**
 * Description: Huỷ sự kiện click outside
 *
 */
onUnmounted(() => {
  window.removeEventListener("mousedown", closeDropdown);
});

/**
 * Description: Xử lý auto focus khi gọi từ component cha
 *
 */
const autoFocus = () => {
  if (comboboxRef.value) {
    comboboxRef.value.focus();
  }
};

// Expose ra ngoài component cha
defineExpose({ autoFocus });
</script>

<style scoped>
@import url("./select.css");
</style>
