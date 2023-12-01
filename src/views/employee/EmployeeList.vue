<template>
  <div class="page-container">
    <div class="page__header">
      <div class="page__title-wrapper">
        <h1 class="page__title">{{ MISAResource[globalStore.lang]?.Page?.Employee?.Title }}</h1>
        <MISAIcon icon="angle-down" />
      </div>

      <div class="page__header-controls">
        <MISAButtonGroup>
          <MISAButton @click="employeeStore.openFormForCreate" type="primary">{{
            MISAResource[globalStore.lang]?.Page?.Employee?.AddButton
          }}</MISAButton>
          <MISAButton type="primary">
            <template #icon>
              <MISAIcon size="16" icon="angle-down" />
            </template>
            <template #dropdown>
              <MISAContextMenu width="204" small>
                <MISAContextItem>
                  <input type="file" name="" id="" hidden />
                  <template #icon><MISAIcon icon="import" /></template>
                  {{ MISAResource[globalStore.lang]?.ContextMenu?.ImportFromExcel }}
                </MISAContextItem>
                <MISAContextItem>
                  <template #icon><MISAIcon icon="download" /></template>
                  {{ MISAResource[globalStore.lang]?.ContextMenu?.DownloadSampleFile }}
                </MISAContextItem>
              </MISAContextMenu>
            </template>
          </MISAButton>
        </MISAButtonGroup>
      </div>
    </div>

    <div class="page__content">
      <div class="filter-container">
        <div class="filter__left">
          <div :class="['filter__select-infor', { '--active': selectedRowsState.length > 0 }]">
            <div>
              {{ MISAResource[globalStore.lang]?.Text?.Selected }}
              <span id="selected-count" class="text-bold">{{ selectedRowsState.length }}</span>
            </div>
            <MISAButton @click="uncheckedAllRows()" type="link" class="ms-16">{{
              MISAResource[globalStore.lang]?.Button?.UnChecked
            }}</MISAButton>
            <MISAButton
              @click="
                showDeleteConfirmDialog(
                  MISAResource[globalStore.lang]?.Page?.Employee?.Dialog.MultipleDeleteConfirmDesc(
                    selectedRowsState.length
                  )
                )
              "
              type="danger"
              class="ms-24"
              >{{ MISAResource[globalStore.lang]?.Button?.Delete }}</MISAButton
            >
          </div>
        </div>
        <div class="filter__right">
          <MISAInputGroup for="search-input">
            <MISAInput
              @keydown.enter="handleSearchEmployee"
              v-model="searchFieldState"
              :placeholder="MISAResource[globalStore.lang]?.Page?.Employee?.SearchPlaceholder"
              id="search-input"
            />
            <MISAInputAction @click="handleSearchEmployee">
              <MISAIcon size="20" icon="search" />
            </MISAInputAction>
          </MISAInputGroup>

          <MISAButton
            @click="handleResetFilter"
            v-tooltip.left="MISAResource[globalStore.lang]?.Tooltip?.Reload"
            type="secondary"
          >
            <template #icon><MISAIcon size="20" icon="reload" /></template>
          </MISAButton>

          <MISAButton :loading="loading.excel" type="secondary">
            <template #icon><MISAIcon icon="excel-gray" no-color /></template>

            <template #dropdown>
              <MISAContextMenu width="215" small>
                <MISAContextItem @click="downloadAllRecords">
                  {{ MISAResource[globalStore.lang]?.ContextMenu?.ExportAllToExcel }}
                </MISAContextItem>
                <MISAContextItem @click="downloadSelectedRecords">
                  {{ MISAResource[globalStore.lang]?.ContextMenu?.ExportListToExcel }}
                </MISAContextItem>
              </MISAContextMenu>
            </template>
          </MISAButton>

          <MISAButton @click.stop="isCustomizeTable = true" type="secondary">
            <template #icon><MISAIcon icon="setting" /></template>
          </MISAButton>
        </div>
      </div>

      <!-- table -->
      <MISATable
        :columns="columns"
        :data-source="employeeData"
        :selected-rows="selectedRowsState"
        :active-row="activeRowState"
        :loading="loading.table"
        :total-page="pagingInfoState.totalPage"
        :total-records="pagingInfoState.totalRecords"
        :current-page="filterParamsState.page"
        :page-size="filterParamsState.pageSize"
        @select-row="selectTableRows"
        @active-row="setActiveRow"
        @next-page="handleNextPage"
        @prev-page="handlePrevPage"
        @select-page-size="handleChangePageSize"
        @double-click="employeeStore.openFormForUpdate"
      >
        <template #context-menu>
          <MISAContextMenu small>
            <MISAContextItem @click="employeeStore.openFormForDuplicate(activeRowState)">{{
              MISAResource[globalStore.lang]?.ContextMenu?.Duplicate
            }}</MISAContextItem>
            <MISAContextItem
              @click="
                showDeleteConfirmDialog(
                  MISAResource[globalStore.lang]?.Page?.Employee?.Dialog.DeleteConfirmDesc(
                    activeRowState.FullName
                  )
                )
              "
              >{{ MISAResource[globalStore.lang]?.ContextMenu?.Delete }}</MISAContextItem
            >
            <MISAContextItem>{{
              MISAResource[globalStore.lang]?.ContextMenu?.StopUsing
            }}</MISAContextItem>
          </MISAContextMenu>
        </template>
      </MISATable>

      <!-- Modal -->
      <Teleport to="#app">
        <MISADialog v-if="dialogState.active" v-bind="dialogState" @cancel="hideConfirmDialog">
          <MISAButton @click="hideConfirmDialog" type="secondary">{{
            MISAResource[globalStore.lang]?.Button?.Cancel
          }}</MISAButton>
          <MISAButton @click="handleDeleteEmployee" type="danger">{{
            MISAResource[globalStore.lang]?.Button?.Delete
          }}</MISAButton>
        </MISADialog>
      </Teleport>

      <!-- Employee detail -->
      <EmployeeDetail v-if="employeeStore.isOpenForm" @submit="getEmployeeData"></EmployeeDetail>

      <!-- Table customize -->
      <MISATableCusomize
        :columns="columns"
        :default-columns="defaultColumns"
        @change="applyTableCustomize"
        @close="isCustomizeTable = false"
        v-if="isCustomizeTable"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import MISAIcon from "@/components/base/icon/MISAIcon.vue";
import MISAButton from "@/components/base/button/MISAButton.vue";
import MISAButtonGroup from "@/components/base/button/MISAButtonGroup.vue";
import MISAInput from "@/components/base/input/MISAInput.vue";
import MISAInputGroup from "@/components/base/input/MISAInputGroup.vue";
import MISAInputAction from "@/components/base/input/MISAInputAction.vue";
import MISATable from "@/components/base/table/MISATable.vue";
import MISATableCusomize from "@/components/base/table-customize/MISATableCustomize.vue";
import MISAContextMenu from "@/components/base/context-menu/MISAContextMenu.vue";
import MISAContextItem from "@/components/base/context-menu/MISAContextItem.vue";
import MISADialog from "@/components/base/dialog/MISADialog.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import employeeApi from "@/api/employee-api";
import formatDate from "@/helper/format-date";
import enums from "@/helper/enum";
import MISAResource from "@/resource/resource";
import { useGlobalStore } from "@/stores/global-store";
import { useEmployeeStore } from "@/stores/employee-store";
import { useToastStore } from "@/stores/toast-store";

const employeeData = ref([]);
const searchFieldState = ref("");
const filterParamsState = ref({
  page: 1,
  pageSize: 10,
  search: "",
});
const pagingInfoState = ref({
  totalPage: 0,
  totalRecords: 0,
});
const selectedRowsState = ref([]);
const activeRowState = ref(null);
const dialogState = ref({
  active: false,
  type: "warning",
  title: "",
  description: "",
});
const loading = ref({
  table: false,
  excel: false,
});
const isCustomizeTable = ref(false);

const globalStore = useGlobalStore();
const employeeStore = useEmployeeStore();
const toastStore = useToastStore();

const defaultColumns = [
  {
    key: 1,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.EmployeeCode?.SubTitle,
    dataIndex: "EmployeeCode",
    originName: "EmployeeCode",
    width: 130,
    sticky: "left",
  },
  {
    key: 2,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.FullName?.SubTitle,
    dataIndex: "FullName",
    originName: "FullName",
    width: 200,
    sticky: "left",
  },
  {
    key: 3,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.Gender?.Title,
    dataIndex: "GenderFormated",
    originName: "Gender",
  },
  {
    key: 4,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.DateOfBirth?.Title,
    dataIndex: "DateOfBirthFormated",
    originName: "DateOfBirth",
    align: "center",
  },
  {
    key: 5,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.IdentityNumber?.Title,
    dataIndex: "IdentityNumber",
    originName: "IdentityNumber",
    desc: MISAResource[globalStore.lang]?.Page?.Employee?.IdentityNumber?.Desc,
    align: "right",
  },
  {
    key: 6,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.Position?.Title,
    dataIndex: "PositionName",
    originName: "PositionName",
    width: 180,
  },
  {
    key: 7,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.Department?.Title,
    dataIndex: "DepartmentName",
    originName: "DepartmentName",
    width: 240,
  },
  {
    key: 8,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.BankAccount?.SubTitle,
    dataIndex: "BankAccount",
    originName: "BankAccount",
    align: "right",
    width: 180,
  },
  {
    key: 9,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.BankName?.Title,
    dataIndex: "BankName",
    originName: "BankName",
    width: 180,
  },
  {
    key: 10,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.BankBranch?.SubTitle,
    dataIndex: "BankBranch",
    originName: "BankBranch",
    desc: MISAResource[globalStore.lang]?.Page?.Employee?.BankBranch?.Desc,
    width: 240,
  },
];
const columns = ref([]);

/**
 * Description: Gán lại giá trị cột khi ngôn ngữ thay đổi
 */
watch(
  () => globalStore.lang,
  () => {
    columns.value = defaultColumns;
  },
  {
    immediate: true,
  }
);

/**
 * Description: Hàm load dữ liệu danh sách nhân viên từ api
 */
const getEmployeeData = async () => {
  try {
    loading.value.table = true;

    const response = await employeeApi.filter(filterParamsState.value);

    // Format dữ liệu hiển thị ra bảng
    employeeData.value = response.data?.Data?.map((employee) => {
      employee.key = employee.EmployeeId;
      employee.DateOfBirthFormated = formatDate(employee.DateOfBirth);
      employee.GenderFormated =
        employee.Gender === enums.gender.MALE
          ? MISAResource[globalStore.lang]?.Gender?.Male
          : employee.Gender === enums.gender.FEMALE
          ? MISAResource[globalStore.lang]?.Gender?.Female
          : MISAResource[globalStore.lang]?.Gender?.Other;

      return employee;
    });

    // Lấy dữ liệu phân trang
    const totalRecords = response.data.TotalRecords;
    const pageSize = filterParamsState.value.pageSize;

    pagingInfoState.value.totalRecords = totalRecords;
    pagingInfoState.value.totalPage = Math.ceil(totalRecords / pageSize);

    loading.value.table = false;
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Download excel danh sách nhân viên
 *
 */
const downloadExcel = async (columns = [], employeeIds = []) => {
  try {
    loading.value.excel = true;
    const response = await employeeApi.downloadExcel(columns, employeeIds);

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);

    const linkElement = document.createElement("a");
    linkElement.href = url;
    linkElement.download = "employee.xlsx";
    linkElement.click();

    loading.value.excel = false;
  } catch (error) {
    console.warn(error);
    loading.value.excel = false;
  }
};

/**
 * Description: Download tất cả danh sách nhân viên
 *
 */
const downloadAllRecords = async () => {
  try {
    // Lấy danh sách các cột không bị ẩn
    const requestColumns = columns.value.filter((col) => !col.hide).map((col) => col.originName);

    await downloadExcel(requestColumns);
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Download tất cả danh sách nhân viên
 *
 */
const downloadSelectedRecords = async () => {
  try {
    // Lấy danh sách các cột không bị ẩn
    const requestColumns = columns.value.filter((col) => !col.hide).map((col) => col.originName);

    // Danh sách Id của các bản ghi cần xuất
    const employeeIds = selectedRowsState.value.map((employee) => employee.EmployeeId);

    if (employeeIds.length > 0) {
      await downloadExcel(requestColumns, employeeIds);
    }
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Xử lý theo dõi sự thay đổi của filter
 * để get lại dữ liệu tương ứng
 *
 */
watch(
  () => filterParamsState.value,
  () => {
    getEmployeeData();
  },
  { immediate: true, deep: true }
);

/**
 * Description: Hàm xoá nhân viên active hoặc đang được chọn
 *
 */
const handleDeleteEmployee = async () => {
  try {
    if (activeRowState.value) {
      // Nếu có hàng đang được active thì xoá hàng đó trước
      await deleteActiveEmployee();
    } else {
      // Xoá các hàng đang checked
      await deleteSelectedEmployee();
    }
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Hàm xoá nhiều nhân viên đã được chọn
 *
 */
const deleteSelectedEmployee = async () => {
  try {
    const deleteIds = selectedRowsState.value.map((row) => row.EmployeeId);

    await employeeApi.delete(deleteIds);

    dialogState.value.active = false;
    await getEmployeeData();
    uncheckedAllRows();

    // Hiện toast message xoá thành công
    toastStore.pushSuccessMessage({
      message: MISAResource[globalStore.lang]?.Page?.Employee?.Toast?.DeleteSuccess,
    });
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Hàm xoá một nhân viên đang active
 *
 */
const deleteActiveEmployee = async () => {
  try {
    await employeeApi.deleteById(activeRowState.value?.EmployeeId);

    dialogState.value.active = false;
    await getEmployeeData();
    setActiveRow(null);

    // Hiện toast message xoá thành công
    toastStore.pushSuccessMessage({
      message: MISAResource[globalStore.lang]?.Page?.Employee?.Toast?.DeleteSuccess,
    });
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Lấy các bản ghi đã được chọn trả về từ bảng.
 * Author:
 */
const selectTableRows = (value) => {
  selectedRowsState.value = value;
};

/**
 * Description: Bỏ chọn toàn bộ bản ghi trong bảng.
 *
 */
const uncheckedAllRows = () => {
  selectedRowsState.value = [];
};

/**
 * Description: Xử lý chọn chỉ một hàng (chờ xoá/nhân bản)
 *
 */
const setActiveRow = (row) => {
  activeRowState.value = row;
};

/**
 * Description: Hiện dialog xác nhận xoá
 *
 */
const showDeleteConfirmDialog = (description) => {
  dialogState.value = {
    active: true,
    title: MISAResource[globalStore.lang]?.Page?.Employee?.Dialog?.DeleteConfirmTitle,
    type: "warning",
    description: description,
  };
};

/**
 * Description: Ẩn dialog xác nhận và bỏ hàng được chọn
 *
 */
const hideConfirmDialog = () => {
  dialogState.value.active = false;
  selectedRowsState.value = [];
};

/**
 * Description: Xử lý chuyển trang trang tiếp theo
 *
 */
const handleNextPage = (nextPage) => {
  filterParamsState.value.page = nextPage;
};

/**
 * Description: Xử lý chuyển trang trang trước đó
 *
 */
const handlePrevPage = (prevPage) => {
  filterParamsState.value.page = prevPage;
};

/**
 * Description: Xử lý thay đổi filter để bắt đầu tìm kiếm
 *
 */
const handleSearchEmployee = () => {
  filterParamsState.value.page = 1;
  filterParamsState.value.search = searchFieldState.value;
};

/**
 * Description: Xử lý thay đổi pageSize
 *
 */
const handleChangePageSize = (newPageSize) => {
  filterParamsState.value.pageSize = newPageSize;

  // Reset lại số trang hiện tại
  filterParamsState.value.page = 1;
};

/**
 * Description: Reset filter và load lại dữ liệu
 *
 */
const handleResetFilter = () => {
  filterParamsState.value = {
    ...filterParamsState.value,
    page: 1,
    pageSize: 10,
    search: "",
  };

  searchFieldState.value = "";
};

/**
 * Description: Áp dụng thay đổi khi customize bảng
 *
 */
const applyTableCustomize = (newColums) => {
  columns.value = newColums;
};
</script>

<style scoped></style>
