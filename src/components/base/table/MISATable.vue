<template>
  <div class="ms-table">
    <div ref="tableContainerRef" class="ms-table__container">
      <table class="ms-table__table">
        <thead>
          <!-- header -->
          <tr>
            <th class="--sticky-left">
              <MISACheckbox
                @click="selectRow(props.dataSource)"
                :checked="props.selectedRows.length === props.dataSource.length"
              />

              <!-- fake borders -->
              <span class="ms-table__border-bottom"></span>
            </th>

            <template v-for="column in columsWithPos" :key="column.key">
              <th
                v-if="!column.hide"
                :style="{
                  width: column.width ? column.width + 'px' : '',
                  maxWidth: column.width ? column.width + 'px' : '',
                  left: column.sticky && column.left + 'px',
                }"
                :class="[`--align-${column.align || ''}`, `--sticky-${column.sticky}`]"
                v-tooltip.bottom="column.desc || column.title"
                ref="columsRef"
              >
                <div class="ms-table__table-text-wrap">
                  {{ column.title }}
                </div>

                <!-- resize column -->
                <span @mousedown="activeResize($event, column)" class="ms-table__col-resize"></span>

                <!-- fake borders -->
                <span class="ms-table__border-bottom"></span>
                <span class="ms-table__border-right"></span>
              </th>
            </template>

            <th :style="{ width: '108px' }" class="--sticky-right --align-center">
              {{ MISAResource[globalStore.lang]?.Table?.Functions }}
              <!-- fake borders -->
              <span class="ms-table__border-left"></span>
              <span class="ms-table__border-bottom"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- records -->
          <template v-if="!props.loading">
            <tr
              v-for="row in dataSourceWithSelectedRows"
              @dblclick="returnRow(row)"
              :key="row.key"
              :class="[{ '--active': row.checked || row.key === props.activeRow?.key }]"
            >
              <td class="--sticky-left">
                <MISACheckbox @click="selectRow(row)" :checked="row.checked" />

                <!-- fake borders -->
                <span class="ms-table__border-bottom"></span>
              </td>

              <template v-for="column in columsWithPos" :key="column.key">
                <td
                  v-if="!column.hide"
                  :style="{
                    width: column.width ? column.width + 'px' : '',
                    maxWidth: column.width ? column.width + 'px' : '',
                    left: column.sticky && column.left + 'px',
                  }"
                  :class="[`--align-${column.align || ''}`, `--sticky-${column.sticky}`]"
                  :title="row[column.dataIndex] || ''"
                >
                  <slot :name="column.dataIndex" v-bind="row">
                    <div class="ms-table__table-text-wrap">
                      {{ row[column.dataIndex] }}
                    </div>
                  </slot>

                  <!-- fake borders -->
                  <span class="ms-table__border-bottom"></span>
                  <span class="ms-table__border-right"></span>
                </td>
              </template>

              <!-- table action -->
              <td :style="{ width: '108px' }" class="--sticky-right">
                <div class="ms-table__action">
                  <div @click="returnRow(row)" class="ms-table__action-text">
                    {{ MISAResource[globalStore.lang]?.Button?.Update }}
                  </div>
                  <div
                    @dblclick.stop=""
                    @click.stop="setActionContextPos($event, row)"
                    class="ms-table__action-toggle"
                  >
                    <MISAIcon icon="triangle-down" />
                  </div>
                </div>
                <!-- fake borders -->
                <span class="ms-table__border-left"></span>
                <span class="ms-table__border-bottom"></span>
              </td>
            </tr>
          </template>

          <!-- skeleton loading -->
          <MISASkeletonRow v-else :columns="props.columns.length + 1" />
        </tbody>
      </table>

      <!-- table context menu -->
      <div
        v-if="actionContextMenu.isShow"
        :style="{ top: actionContextMenu.top + 'px' }"
        class="ms-table__action-context"
      >
        <slot name="context-menu"></slot>
      </div>
    </div>

    <!-- table footer -->
    <div class="ms-table__footer">
      <p class="total-row">
        <span>{{ MISAResource[globalStore.lang]?.Paging?.TotalRecords }}: </span>
        <span class="text-bold">{{ props.totalRecords }}</span>
      </p>
      <div class="ms-table__page-infor">
        <!-- page size dropdown -->
        <div class="ms-table__page-size">
          <div>{{ MISAResource[globalStore.lang]?.Paging?.ItemsPerPage }}:</div>
          <div @click="togglePageSizeDropdown" class="ms-table__page-size-btn">
            {{ props.pageSize }}
            <div class="ms-table__page-size-btn-icon" title="Dropdown">
              <MISAIcon icon="angle-down" />
            </div>
          </div>
          <ul v-if="pageSizeDropdown.isShow" class="ms-table__page-size-dropdown">
            <li
              v-for="(item, index) in pageSizeDropdown.items"
              :key="index"
              @click="handleSelectPageSize(item)"
              class="ms-table__page-size-item"
            >
              {{ item }}
              <span v-if="props.pageSize === item" class="ms-table__page-size-icon">
                <MISAIcon icon="check" />
              </span>
            </li>
          </ul>
        </div>

        <!-- records range -->
        <div class="ms-table__records-range">
          <p>
            {{ recordsRange.min }} -
            <span class="text-bold">{{ recordsRange.max }}</span>
            {{ MISAResource[globalStore.lang]?.Paging?.Records }}
          </p>
        </div>

        <!-- page controls -->
        <div class="ms-table__page-controls">
          <span
            @click="handlePrevPage"
            :class="['ms-table__prev-btn', { '--disable': props.currentPage <= 1 }]"
            :title="MISAResource[globalStore.lang]?.Paging?.PrevPage"
            ><MISAIcon icon="angle-left"
          /></span>
          <span
            @click="handleNextPage"
            :class="['ms-table__next-btn', { '--disable': props.currentPage >= props.totalPage }]"
            :title="MISAResource[globalStore.lang]?.Paging?.NextPage"
          >
            <MISAIcon icon="angle-right" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import MISASkeletonRow from "../skeleton-loader/MISASkeletonRow.vue";
import MISACheckbox from "../checkbox/MISACheckbox.vue";
import MISAIcon from "@/components/base/icon/MISAIcon.vue";
import MISAResource from "@/resource/resource";
import { useGlobalStore } from "@/stores/global-store";

const emit = defineEmits([
  "double-click",
  "select-row",
  "active-row",
  "next-page",
  "prev-page",
  "select-page-size",
]);

const props = defineProps({
  // Định nghĩa các cột - các trường
  // một trường bao gồm: key, title, dataIndex, width, align, desc, sticky
  columns: {
    type: Array,
    default() {
      return [];
    },
    required: true,
  },

  // Định nghĩa dữ liệu - các bản ghi
  // một bản ghi bao gồm: key, tên trường (dataIndex)
  dataSource: {
    type: Array,
    default() {
      return [];
    },
    required: true,
  },

  // Các bản ghi đã được chọn
  selectedRows: {
    type: Array,
    default() {
      return [];
    },
  },

  // Hàng đang được active
  activeRow: {
    type: Object,
  },

  // Trang hiện tại
  currentPage: {
    type: Number,
    default: 1,
  },

  // Tổng số trang
  totalPage: {
    type: Number,
    default: 0,
  },

  // Tổng số bản ghi
  totalRecords: {
    type: Number,
    default: 0,
  },

  // Số phần tử trên trang
  pageSize: {
    type: Number,
    default: 0,
  },

  // Trạng thái loading dữ liệu
  loading: {
    type: Boolean,
    default: false,
  },
});

// ----- State -----
const pageSizeDropdown = ref({
  isShow: false,
  items: [10, 25, 50, 100],
});

const tableContainerRef = ref(null);
const columsRef = ref(null);
const columsWithPos = ref(props.columns);
const actionContextMenu = ref({
  isShow: false,
  top: 0,
});

const globalStore = useGlobalStore();

/**
 * Description: Truyền prop columns cho columsWithPos
 * mỗi khi columns thay đổi (thay đổi ngôn ngữ)
 *
 */
watch(
  () => props.columns,
  () => {
    columsWithPos.value = props.columns;

    // Tính toán lại vị trí cột ghim
    calculateColumnsPos();
  }
);

/**
 * Description: Xử lý thêm trường "checked" với bản ghi
 * đã được chọn
 *
 */
const dataSourceWithSelectedRows = computed(() => {
  try {
    return props.dataSource?.map((row) => {
      row["checked"] = props.selectedRows?.find((selectedItem) => selectedItem.key == row.key)
        ? true
        : false;
      return row;
    });
  } catch (error) {
    console.warn(error);
    return [];
  }
});

/**
 * Description: Xử lý chọn một/nhiều hàng sau đó trả về
 * một mảng các phần tử được chọn
 *
 */
const selectRow = (value) => {
  try {
    let localSelectedRows = [...props.selectedRows];

    // Chọn tất cả các hàng hàng
    if (Array.isArray(value)) {
      if (localSelectedRows.length === props.dataSource?.length) {
        localSelectedRows = [];
      } else {
        localSelectedRows = value;
      }

      // Chọn một hàng
    } else {
      if (localSelectedRows.find((selectedRow) => selectedRow.key == value.key)) {
        localSelectedRows = localSelectedRows.filter(
          (selectedRow) => selectedRow.key !== value.key
        );
      } else {
        localSelectedRows.push(value);
      }
    }

    // Cập nhật các cột ra ngoài
    emit("select-row", localSelectedRows);

    // Bỏ các cột đang active
    emit("active-row", null);
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Bỏ chọn toàn bộ bản ghi trong bảng.
 * .
 */
const uncheckedAllRows = () => {
  emit("select-row", []);
};

/**
 * Description: Active một hàng (chờ xoá/nhân bản)
 *
 */
const setActiveRow = (row) => {
  emit("active-row", row);
  uncheckedAllRows();
};

/**
 * Description: Trả về data của hàng khi double click vào hàng đó
 *
 */
const returnRow = (row) => {
  emit("double-click", row);
};

/**
 * Description: Tính toán khoảng của các phần tử
 * đang hiển thị trên trang hiện tại (phân trang)
 *
 */
const recordsRange = computed(() => {
  try {
    if (props.currentPage && props.pageSize) {
      let maxRange = props.currentPage * props.pageSize;
      let minRange = maxRange - props.pageSize + 1;

      if (props.currentPage === props.totalPage) {
        maxRange = props.totalRecords;
      }

      return {
        min: minRange,
        max: maxRange,
      };
    } else {
      return {
        min: 0,
        max: 0,
      };
    }
  } catch (error) {
    console.warn(error);
    return {
      min: 0,
      max: 0,
    };
  }
});

/**
 * Description: Xử lý sự kiện chuyển trang tiếp theo
 *
 */
const handleNextPage = () => {
  try {
    if (props.currentPage && props.totalPage && props.currentPage < props.totalPage) {
      const nextPage = props.currentPage + 1;
      emit("next-page", nextPage);
    }
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Xử lý sự kiện chuyển trang trước đó
 *
 */
const handlePrevPage = () => {
  try {
    if (props.currentPage && props.currentPage > 1) {
      const prevPage = props.currentPage - 1;
      emit("prev-page", prevPage);
    }
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Xử lý ẩn/hiện danh sách page size
 *
 */
const togglePageSizeDropdown = () => {
  pageSizeDropdown.value.isShow = !pageSizeDropdown.value.isShow;
};

/**
 * Description: Xử lý chọn page size
 *
 */
const handleSelectPageSize = (pageSize) => {
  if (props.pageSize !== pageSize) {
    emit("select-page-size", pageSize);
    pageSizeDropdown.value.isShow = false;
  }
};

/**
 * Description: Xử lý tính toán vị trí của các cột
 * khi ghim cột
 *
 */
const calculateColumnsPos = () => {
  try {
    const defaultWidth = 140;
    const firstColumnWidth = 50;
    columsWithPos.value.forEach((column, index) => {
      // Nếu không được chỉ định chiều dài thì sẽ được set mặc định
      if (!column.width) {
        column.width = defaultWidth;
      }

      // Vị trí của cột hiện tại so với vị trí đầu bảng
      // bằng tổng chiều dài của các cột đứng trước nó
      // (không tính cột bị ẩn)
      const leftPos = columsWithPos.value.reduce((left, column, currentIndex) => {
        if (currentIndex < index && !column.hide) {
          return left + (column.width || defaultWidth);
        } else {
          return left;
        }
      }, 0);

      column.left = leftPos + firstColumnWidth;
    });
  } catch (error) {
    console.warn(error);
  }
};
calculateColumnsPos();

/**
 * Description: Xử lý sự kiện thay đổi kích thước cột
 * bằng cách nhấn giữ và kéo trang phải/trái
 *
 */
const activeResize = (e, column) => {
  try {
    const thElement = e.target.parentElement;
    const thElementRect = thElement.getBoundingClientRect();

    // Resize cột
    const resizeColumn = (e) => {
      const mouseX = e.clientX;

      column.width = mouseX - thElementRect.left + 4;

      // Tính toán lại vị trí cột ghim
      calculateColumnsPos();
    };

    window.addEventListener("mousemove", resizeColumn);

    // Huỷ sự kiện resize cột
    window.onmouseup = () => {
      window.removeEventListener("mousemove", resizeColumn);
    };
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Xử lý hiện context menu
 * phía trên hoặc dưới dropdown theo diện tích hiển thị
 *
 */
const setActionContextPos = (e, row) => {
  try {
    if (e.target && tableContainerRef.value) {
      const actionElement = e.target;
      const actionPos = actionElement.getBoundingClientRect();
      const tablePos = tableContainerRef.value.getBoundingClientRect();
      const contextMenuHeight = 124;
      const headRowHeight = 48;
      const space = 24;

      if (actionPos.y - contextMenuHeight > tablePos.y + headRowHeight) {
        // Hiện lên trên của dropdown
        actionContextMenu.value = {
          isShow: true,
          top: actionPos.y - contextMenuHeight,
        };
      } else {
        // Hiện bên dưới dropdown
        actionContextMenu.value = {
          isShow: true,
          top: actionPos.y + space,
        };
      }

      // set active cho hàng hiện tại
      setActiveRow(row);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Description: Tắt context menu
 *
 */
const hideContextMenu = () => {
  actionContextMenu.value.isShow = false;
};

/**
 * Description: Tắt context menu khi bấm ra
 * vị trí bất kỳ ngoài context menu
 *
 */
onMounted(() => {
  document.addEventListener("click", hideContextMenu);
});

/**
 * Description: Huỷ sự kiện bấm ra ngoài context menu
 *
 */
onUnmounted(() => {
  document.removeEventListener("click", hideContextMenu);
});
</script>

<style scoped>
@import url("./table.css");
</style>
