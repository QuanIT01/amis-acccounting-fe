<template>
  <div @click.stop="" class="ms-table-customize">
    <div class="ms-table-customize__header">
      <div class="ms-table-customize__header-title">
        {{ MISAResource[globalStore.lang]?.Table?.CustomTableTitle }}
      </div>
      <div @click="emit('close')" class="ms-table-customize__close">
        <MISAIcon icon="times" />
      </div>
    </div>

    <div class="ms-table-customize__search">
      <MISAInputGroup for="table-customize-search">
        <MISAInputAction>
          <MISAIcon size="20" icon="search" />
        </MISAInputAction>
        <MISAInput
          v-model="search"
          :placeholder="MISAResource[globalStore.lang]?.PlaceHolder?.Search"
          id="table-customize-search"
        />
      </MISAInputGroup>
    </div>

    <div class="ms-table-customize__content">
      <draggable
        v-model="localColumns"
        item-key="key"
        handle=".handle"
        tag="ul"
        class="ms-table-customize__menu"
      >
        <template #item="{ element }">
          <li
            :class="['ms-table-customize__menu-item', { '--sticky': element?.sticky }]"
            v-show="element?.title?.toLowerCase()?.includes(search.toLowerCase())"
          >
            <div class="ms-table-customize__menu-table-name-wrap">
              <MISACheckbox @click="toggleColumn(element?.key)" :checked="!element?.hide" />
              <div class="ms-table-customize__menu-table-name">{{ element?.title }}</div>
            </div>
            <div class="ms-table-customize__menu-item-actions">
              <div class="ms-table-customize__item-action --pin-icon">
                <MISAIcon @click="pinColumn(element?.key)" size="20" icon="paper-clip" />
              </div>
              <div class="ms-table-customize__item-action">
                <MISAIcon size="20" icon="draggable-dots" class="handle" />
              </div>
            </div>
          </li>
        </template>
      </draggable>
    </div>

    <div class="ms-table-customize__footer">
      <MISAButton @click="resetDefault" type="secondary">{{
        MISAResource[globalStore.lang]?.Button?.RestoreDefault
      }}</MISAButton>
      <MISAButton @click="saveChange" type="primary">{{
        MISAResource[globalStore.lang]?.Button?.SaveS
      }}</MISAButton>
    </div>
    <!-- {{ console.log(localColumns) }} -->
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import MISAButton from "../button/MISAButton.vue";
import MISACheckbox from "../checkbox/MISACheckbox.vue";
import MISAIcon from "../icon/MISAIcon.vue";
import MISAInput from "../input/MISAInput.vue";
import MISAInputAction from "../input/MISAInputAction.vue";
import MISAInputGroup from "../input/MISAInputGroup.vue";
import MISAResource from "@/resource/resource";
import { useGlobalStore } from "@/stores/global-store";
import draggable from "vuedraggable";

const emit = defineEmits(["close", "change"]);

const props = defineProps({
  // Mảng các cột của bảng
  columns: {
    type: Array,
    default() {
      return [];
    },
  },

  // Mảng các cột mặc định
  defaultColumns: {
    type: Array,
    default() {
      return [];
    },
  },
});

// Deep clone prop sang state để thực hiện thay đổi
const localColumns = ref(JSON.parse(JSON.stringify(props.columns) ?? []));

const search = ref("");

const globalStore = useGlobalStore();

/**
 * Description: Lưu lại sự thay đổi
 *
 */
const saveChange = () => {
  // Lấy dữ liệu đã được sắp xếp
  const separatedColumns = handleSeparateColumns();

  emit("change", separatedColumns);

  // Đóng menu
  closeMenu();
};

/**
 * Description: Xử lý phân tách các cột được ghim
 * và các cột không được ghim
 *
 */
const handleSeparateColumns = () => {
  try {
    let stickyColumns = [];
    let normalColumns = [];

    localColumns.value?.forEach((column) => {
      if (column.sticky) {
        stickyColumns = [...stickyColumns, column];
      } else {
        normalColumns = [...normalColumns, column];
      }
    });

    let result = [...stickyColumns, ...normalColumns];

    // Deep clone loại bỏ tham chiếu
    result = JSON.parse(JSON.stringify(result));

    return result;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

/**
 * Description: Xử lý ghim/bỏ ghim cột được chọn
 *
 */
const pinColumn = (key) => {
  try {
    let column = localColumns.value.find((column) => column.key === key);

    if (column && column.sticky) {
      column.sticky = "";
    } else if (column) {
      column.sticky = "left";
    }
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Xử lý ẩn/hiện cột được chọn
 *
 */
const toggleColumn = (key) => {
  try {
    let column = localColumns.value.find((column) => column.key === key);

    if (column && column.hide) {
      column.hide = false;
    } else if (column) {
      column.hide = true;
    }
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Xử lý reset về mặc định
 *
 */
const resetDefault = () => {
  try {
    localColumns.value = JSON.parse(JSON.stringify(props.defaultColumns));

    saveChange();
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Đóng menu khi click outside
 *
 */
const closeMenu = () => {
  emit("close");
};

/**
 * Description: Thêm sự kiện click outside
 *
 */
onMounted(() => {
  window.addEventListener("click", closeMenu);
});

/**
 * Description: Huỷ sự kiện click outside
 *
 */
onUnmounted(() => {
  window.removeEventListener("click", closeMenu);
});
</script>

<style scoped>
@import url("./table-customize.css");
</style>
