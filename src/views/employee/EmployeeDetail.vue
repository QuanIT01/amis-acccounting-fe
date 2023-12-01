<template>
  <Teleport to="#app">
    <MISAPopup
      v-focustrap
      @close="employeeStore.closeForm"
      @submit="handleSubmitForm()"
      :width="880"
      :title="
        employeeStore.mode === enums.form.mode.CREATE
          ? MISAResource[globalStore.lang]?.Page?.Employee?.Form?.CreateTitle
          : MISAResource[globalStore.lang]?.Page?.Employee?.Form?.UpdateTitle
      "
    >
      <template #header-controls>
        <MISACheckboxVue
          v-model="formData.isCustomer"
          :value="true"
          :checked="formData.isCustomer"
          :label="MISAResource[globalStore.lang]?.Page?.Employee?.IsCustomer?.Title"
        />
        <MISACheckboxVue
          v-model="formData.isSupplier"
          :value="true"
          :checked="formData.isSupplier"
          :label="MISAResource[globalStore.lang]?.Page?.Employee?.IsSupplier?.Title"
        />
      </template>

      <template #default>
        <MISARow :gutter="{ x: 24 }">
          <MISACol span="6">
            <MISARow :gutter="{ x: 8 }">
              <MISACol span="5">
                <MISAFormGroup
                  :error-msg="errorMessages.employeeCode"
                  :label="MISAResource[globalStore.lang]?.Page?.Employee?.EmployeeCode?.Title"
                  for="input-id"
                  required-mark
                  space-bottom
                >
                  <MISAInput
                    tabindex="1"
                    v-model="formData.employeeCode"
                    @blur="validateEmployeeCode"
                    @input="errorMessages.employeeCode = null"
                    focus
                    id="input-id"
                  />
                </MISAFormGroup>
              </MISACol>
              <MISACol span="7">
                <MISAFormGroup
                  :error-msg="errorMessages.fullName"
                  :label="MISAResource[globalStore.lang]?.Page?.Employee?.FullName?.Title"
                  for="input-name"
                  required-mark
                  space-bottom
                >
                  <MISAInput
                    tabindex="2"
                    v-model="formData.fullName"
                    @blur="validateFullName"
                    @input="errorMessages.fullName = null"
                    id="input-name"
                  />
                </MISAFormGroup>
              </MISACol>
              <MISACol span="12">
                <MISAFormGroup
                  :error-msg="errorMessages.department"
                  :label="MISAResource[globalStore.lang]?.Page?.Employee?.Department?.Title"
                  for="input-department"
                  required-mark
                  space-bottom
                >
                  <MISASelect
                    tabindex="3"
                    v-model="formData.departmentId"
                    @focusout="validateDepartment"
                    :options="departmentOptions"
                    id="input-department"
                    :placeholder="MISAResource[globalStore.lang]?.PlaceHolder?.SelectAValue"
                  />
                </MISAFormGroup>
              </MISACol>
              <MISACol span="12">
                <MISAFormGroup
                  :label="MISAResource[globalStore.lang]?.Page?.Employee?.Position?.Title"
                  for="input-position"
                  space-bottom
                >
                  <MISASelect
                    tabindex="4"
                    v-model="formData.positionId"
                    :options="positionOptions"
                    :search="true"
                    id="input-position"
                    :placeholder="MISAResource[globalStore.lang]?.PlaceHolder?.SelectAValue"
                  />
                </MISAFormGroup>
              </MISACol>
            </MISARow>
          </MISACol>
          <MISACol span="6">
            <MISARow :gutter="{ x: 8 }">
              <MISACol span="5">
                <MISAFormGroup
                  :label="MISAResource[globalStore.lang]?.Page?.Employee?.DateOfBirth?.Title"
                  for="input-date-of-birth"
                  space-bottom
                >
                  <MISADatePicker
                    tabindex="5"
                    v-model="formData.dateOfBirth"
                    position="left"
                    id="input-date-of-birth"
                  />
                  <!-- {{ console.log(formData.dateOfBirth) }} -->
                </MISAFormGroup>
              </MISACol>
              <MISACol span="7">
                <MISAFormGroup
                  :label="MISAResource[globalStore.lang]?.Page?.Employee?.Gender?.Title"
                  for=""
                  space-bottom
                >
                  <div class="d-flex col-gap-16">
                    <MISARadioButton
                      tabindex="6"
                      v-model="formData.gender"
                      :value="enums.gender.MALE + ''"
                      :label="MISAResource[globalStore.lang]?.Gender?.Male"
                    />
                    <MISARadioButton
                      tabindex="7"
                      v-model="formData.gender"
                      :value="enums.gender.FEMALE + ''"
                      :label="MISAResource[globalStore.lang]?.Gender?.Female"
                    />
                    <MISARadioButton
                      tabindex="8"
                      v-model="formData.gender"
                      :value="enums.gender.OTHER + ''"
                      :label="MISAResource[globalStore.lang]?.Gender?.Other"
                    />
                  </div>
                </MISAFormGroup>
              </MISACol>
              <MISACol span="7">
                <MISAFormGroup
                  v-tooltip.top="
                    MISAResource[globalStore.lang]?.Page?.Employee?.IdentityNumber?.Desc
                  "
                  :label="MISAResource[globalStore.lang]?.Page?.Employee?.IdentityNumber?.Title"
                  for="input-identity-number"
                  space-bottom
                >
                  <MISAInput
                    tabindex="9"
                    v-model="formData.identityNumber"
                    id="input-identity-number"
                  />
                </MISAFormGroup>
              </MISACol>
              <MISACol span="5">
                <MISAFormGroup
                  :label="MISAResource[globalStore.lang]?.Page?.Employee?.IdentityDate?.Title"
                  for="input-identity-date"
                  space-bottom
                >
                  <MISADatePicker
                    tabindex="10"
                    v-model="formData.identityDate"
                    position="right"
                    id="input-identity-date"
                  />
                </MISAFormGroup>
              </MISACol>
              <MISACol span="12">
                <MISAFormGroup
                  :label="MISAResource[globalStore.lang]?.Page?.Employee?.IdentityPlace?.Title"
                  for="input-identity-place"
                  space-bottom
                >
                  <MISAInput
                    tabindex="11"
                    v-model="formData.identityPlace"
                    id="input-identity-place"
                  />
                </MISAFormGroup>
              </MISACol>
            </MISARow>
          </MISACol>
        </MISARow>

        <MISARow :gutter="{ x: 8 }">
          <MISACol span="12">
            <MISAFormGroup
              :label="MISAResource[globalStore.lang]?.Page?.Employee?.Address?.Title"
              for="input-address"
              space-bottom
            >
              <MISAInput tabindex="12" v-model="formData.address" id="input-address" />
            </MISAFormGroup>
          </MISACol>
        </MISARow>

        <MISARow :gutter="{ x: 8 }">
          <MISACol span="3">
            <MISAFormGroup
              v-tooltip.top="MISAResource[globalStore.lang]?.Page?.Employee?.MobilePhone?.Desc"
              :error-msg="errorMessages.mobilePhoneNumber"
              :label="MISAResource[globalStore.lang]?.Page?.Employee?.MobilePhone?.Title"
              for="input-mobile-phone"
              space-bottom
            >
              <MISAInput
                tabindex="13"
                v-model="formData.mobilePhoneNumber"
                @blur="validateMobilePhone"
                @input="errorMessages.mobilePhoneNumber = null"
                id="input-mobile-phone"
              />
            </MISAFormGroup>
          </MISACol>
          <MISACol span="3">
            <MISAFormGroup
              v-tooltip.top="MISAResource[globalStore.lang]?.Page?.Employee?.LandlinePhone?.Desc"
              :label="MISAResource[globalStore.lang]?.Page?.Employee?.LandlinePhone?.Title"
              for="input-landline-phone"
              space-bottom
            >
              <MISAInput
                tabindex="14"
                v-model="formData.landlineNumber"
                id="input-landline-phone"
              />
            </MISAFormGroup>
          </MISACol>
          <MISACol span="3">
            <MISAFormGroup
              :error-msg="errorMessages.email"
              :label="MISAResource[globalStore.lang]?.Page?.Employee?.Email?.Title"
              for="input-email"
              space-bottom
            >
              <MISAInput
                tabindex="15"
                v-model="formData.email"
                @blur="validateEmail"
                @input="errorMessages.email = null"
                id="input-email"
              />
            </MISAFormGroup>
          </MISACol>
        </MISARow>

        <MISARow :gutter="{ x: 8 }">
          <MISACol span="3">
            <MISAFormGroup
              :label="MISAResource[globalStore.lang]?.Page?.Employee?.BankAccount?.Title"
              for="bank-account"
            >
              <MISAInput tabindex="16" v-model="formData.bankAccount" id="bank-account" />
            </MISAFormGroup>
          </MISACol>
          <MISACol span="3">
            <MISAFormGroup
              :label="MISAResource[globalStore.lang]?.Page?.Employee?.BankName?.Title"
              for="bank-name"
            >
              <MISAInput tabindex="17" v-model="formData.bankName" id="bank-name" />
            </MISAFormGroup>
          </MISACol>
          <MISACol span="3">
            <MISAFormGroup
              :label="MISAResource[globalStore.lang]?.Page?.Employee?.BankBranch?.Title"
              for="branch"
            >
              <MISAInput tabindex="18" v-model="formData.bankBranch" id="branch" />
            </MISAFormGroup>
          </MISACol>
        </MISARow>
      </template>

      <template #controls-left>
        <MISAButton tabindex="21" @click="employeeStore.closeForm" type="secondary">{{
          MISAResource[globalStore.lang]?.Button?.Cancel
        }}</MISAButton>
      </template>
      <template #controls-right>
        <MISAButton
          tabindex="20"
          @click="handleSubmitForm(false)"
          :loading="loading.submit"
          type="secondary"
        >
          {{ MISAResource[globalStore.lang]?.Button?.Save }}
        </MISAButton>
        <MISAButton
          tabindex="19"
          @click="handleSubmitForm()"
          :loading="loading.submitAndContinue"
          type="primary"
        >
          {{ MISAResource[globalStore.lang]?.Button?.SaveAndContinue }}
        </MISAButton>
      </template>
    </MISAPopup>

    <!-- delete confirm dialog -->
    <MISADialog
      v-if="dialogState.active"
      v-bind="dialogState"
      @cancel="closeDialog"
      @ok="closeDialog"
      :ok-text="MISAResource[globalStore.lang]?.Button?.OK"
    />
  </Teleport>
</template>

<script setup>
import MISAPopup from "@/components/base/popup/MISAPopup.vue";
import MISADialog from "@/components/base/dialog/MISADialog.vue";
import MISAButton from "@/components/base/button/MISAButton.vue";
import MISAFormGroup from "@/components/base/input/MISAFormGroup.vue";
import MISAInput from "@/components/base/input/MISAInput.vue";
import MISADatePicker from "@/components/base/date-picker/MISADatePicker.vue";
import MISARadioButton from "@/components/base/radio-button/MISARadioButton.vue";
import MISACheckboxVue from "@/components/base/checkbox/MISACheckbox.vue";
import MISASelect from "@/components/base/select/MISASelect.vue";
import MISARow from "@/components/base/grid/MISARow.vue";
import MISACol from "@/components/base/grid/MISACol.vue";

import { ref } from "vue";
import employeeApi from "@/api/employee-api";
import departmentApi from "@/api/department-api";
import positionApi from "@/api/position-api";
import formatDate from "@/helper/format-date";
import { useGlobalStore } from "@/stores/global-store";
import { useEmployeeStore } from "@/stores/employee-store";
import { useToastStore } from "@/stores/toast-store";
import enums from "@/helper/enum";
import MISAResource from "@/resource/resource";
import { validator, required, codeFormat, email, mobilePhoneFormat } from "@/helper/validator";

const emit = defineEmits(["submit"]);

const globalStore = useGlobalStore();
const employeeStore = useEmployeeStore();
const toastStore = useToastStore();

const departmentOptions = ref([]);
const positionOptions = ref([]);
const dialogState = ref({
  active: false,
  type: "warning",
  title: "",
  description: "",
});
const loading = ref({
  submit: false,
  submitAndContinue: false,
  form: false,
});

const initialFormData = {
  employeeCode: "",
  fullName: "",
  departmentId: "",
  positionId: null,
  dateOfBirth: null,
  gender: enums.gender.MALE + "",
  identityNumber: null,
  identityDate: null,
  identityPlace: null,
  isCustomer: false,
  isSupplier: false,
  address: null,
  mobilePhoneNumber: null,
  landlineNumber: null,
  email: null,
  bankAccount: null,
  bankName: null,
  bankBranch: null,
};
const formData = ref({ ...initialFormData });

const errorMessages = ref({
  employeeCode: null,
  fullName: null,
  department: null,
  mobilePhoneNumber: null,
  landlineNumber: null,
  email: null,
});

/**
 * Description: Hàm xử lý gọi api lấy mã nhân viên mới nhất
 *
 */
const getNewEmployeeCode = async () => {
  try {
    if (
      employeeStore.mode === enums.form.mode.CREATE ||
      employeeStore.mode === enums.form.mode.DUPLICATE
    ) {
      const response = await employeeApi.getNewCode();

      formData.value.employeeCode = response.data;
    }
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Hàm xử lý gọi api lấy dữ liệu đơn vị
 *
 */
const getDepartmentData = async () => {
  try {
    const response = await departmentApi.getAll();

    departmentOptions.value = response.data?.map((department) => ({
      label: department.DepartmentName,
      value: department.DepartmentId,
    }));
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Hàm xử lý gọi api lấy dữ liệu chức danh
 *
 */
const getPositionData = async () => {
  try {
    const response = await positionApi.getAll();

    positionOptions.value = response.data?.map((position) => ({
      label: position.PositionName,
      value: position.PositionId,
    }));
  } catch (error) {
    console.warn(error);
  }
};

getNewEmployeeCode();
getDepartmentData();
getPositionData();

/**
 * Description: Hàm đóng dialog
 *
 */
const closeDialog = () => {
  dialogState.value.active = false;
};

/**
 * Description: Hàm validate input
 *
 */
const handleValidateInputs = () => {
  try {
    const employeeResult = validateEmployeeCode();
    const fullNameResult = validateFullName();
    const departmentResult = validateDepartment();
    const emailResult = validateEmail();

    return employeeResult && fullNameResult && departmentResult && emailResult;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

/**
 * Description: Hàm validate employee code
 *
 */
const validateEmployeeCode = () => {
  try {
    const result = validator({
      value: formData.value.employeeCode,
      rules: [
        {
          checker: required,
          errorMsg: MISAResource[globalStore.lang]?.Page?.Employee?.Validate?.EmployeeCode,
        },
        {
          checker: codeFormat,
          errorMsg: MISAResource[globalStore.lang]?.Page?.Employee?.Validate?.CodeFormat,
        },
      ],
    });

    errorMessages.value.employeeCode = result;
    return !result;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

/**
 * Description: Hàm validate full name
 *
 */
const validateFullName = () => {
  try {
    const result = validator({
      value: formData.value.fullName,
      rules: [
        {
          checker: required,
          errorMsg: MISAResource[globalStore.lang]?.Page?.Employee?.Validate?.FullName,
        },
      ],
    });

    errorMessages.value.fullName = result;
    return !result;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

/**
 * Description: Hàm validate department
 *
 */
const validateDepartment = () => {
  try {
    const result = validator({
      value: formData.value.departmentId,
      rules: [
        {
          checker: required,
          errorMsg: MISAResource[globalStore.lang]?.Page?.Employee?.Validate?.Department,
        },
      ],
    });

    errorMessages.value.department = result;
    return !result;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

/**
 * Description: Hàm validate email
 *
 */
const validateEmail = () => {
  try {
    const result = validator({
      value: formData.value.email,
      rules: [
        {
          checker: email,
          errorMsg: MISAResource[globalStore.lang]?.Page?.Employee?.Validate?.EmailFormat,
        },
      ],
    });

    errorMessages.value.email = result;
    return !result;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

/**
 * Description: Hàm validate số điện thoại di động
 *
 */
const validateMobilePhone = () => {
  try {
    const result = validator({
      value: formData.value.mobilePhoneNumber,
      rules: [
        {
          checker: mobilePhoneFormat,
          errorMsg: MISAResource[globalStore.lang]?.Page?.Employee?.Validate?.MobilePhoneFormat,
        },
      ],
    });

    errorMessages.value.mobilePhoneNumber = result;
    return !result;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

/**
 * Description: Hàm reset lại các input về trạng thái ban đầu
 *
 */
const resetInputs = async () => {
  try {
    if (
      employeeStore.mode === enums.form.mode.CREATE ||
      employeeStore.mode === enums.form.mode.DUPLICATE
    ) {
      if (employeeStore.mode === enums.form.mode.CREATE) {
        formData.value = {
          ...initialFormData,
        };
      }

      await getNewEmployeeCode();
    }
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Hàm xử lý submit form ở các chế độ create/update/duplicate
 *
 */
const handleSubmitForm = async (isContinue = true) => {
  try {
    let result = false;

    if (handleValidateInputs()) {
      // Bắt đầu loading
      if (isContinue) {
        loading.value.submitAndContinue = true;
      } else {
        loading.value.submit = true;
      }

      if (employeeStore.mode === enums.form.mode.CREATE) {
        result = await handleCreateEmployee();
      } else if (employeeStore.mode === enums.form.mode.UPDATE) {
        result = await handleUpdateEmployee();
      } else if (employeeStore.mode === enums.form.mode.DUPLICATE) {
        result = await handleDuplicateEmployee();
      }
    }

    if (result && isContinue) {
      // Reset intpus và reload bảng
      await resetInputs();
      emit("submit");
    } else if (result) {
      // Đóng form và reload lại bảng
      employeeStore.closeForm();
      emit("submit");
    }

    // Tắt loading
    loading.value.submit = false;
    loading.value.submitAndContinue = false;
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Xử lý format data trước khi gửi
 *
 */
const generateData = () => {
  try {
    const data = {
      ...formData.value,
      dateOfBirth: formatDate(formData.value.dateOfBirth, "YYYY-MM-DD"),
      identityDate: formatDate(formData.value.identityDate, "YYYY-MM-DD"),
      gender: Number(formData.value.gender),
    };

    return data;
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Hàm xử lý gọi api tạo nhân viên
 *
 */
const handleCreateEmployee = async () => {
  try {
    if (employeeStore.mode === enums.form.mode.CREATE) {
      const data = generateData();

      await employeeApi.create(data);

      // Hiện toast message thành công
      toastStore.pushSuccessMessage({
        message: MISAResource[globalStore.lang]?.Page?.Employee?.Toast?.CreateSuccess,
      });

      return true;
    }
  } catch (error) {
    console.warn(error);

    // Hiện dialog báo lỗi
    dialogState.value = {
      active: true,
      type: "error",
      title: MISAResource[globalStore.lang]?.Dialog?.ErrorTitle,
      description: MISAResource[globalStore.lang]?.ErrorMessage[error?.response?.data?.ErrorCode],
    };

    return false;
  }
};

/**
 * Description: Hàm load dữ liệu để thực hiện update/duplicate
 *
 */
const handleLoadDataForUpdate = async () => {
  try {
    if (
      employeeStore.mode === enums.form.mode.UPDATE ||
      employeeStore.mode === enums.form.mode.DUPLICATE
    ) {
      const employeeId = employeeStore.currentEmployee?.EmployeeId;

      // Gọi API lấy thông tin nhân viên cần sửa
      const response = await employeeApi.get(employeeId);
      const employeeData = response.data;

      // Binding dữ liệu vào form
      formData.value = {
        employeeCode: employeeData.EmployeeCode,
        fullName: employeeData.FullName,
        departmentId: employeeData.DepartmentId,
        positionId: employeeData.PositionId,
        dateOfBirth: new Date(employeeData.DateOfBirth),
        gender: employeeData.Gender + "",
        identityNumber: employeeData.IdentityNumber,
        identityDate: new Date(employeeData.IdentityDate),
        identityPlace: employeeData.IdentityPlace,
        isCustomer: employeeData.IsCustomer,
        isSupplier: employeeData.IsSupplier,
        address: employeeData.Address,
        mobilePhoneNumber: employeeData.MobilePhoneNumber,
        landlineNumber: employeeData.LandlineNumber,
        email: employeeData.Email,
        bankAccount: employeeData.BankAccount,
        bankName: employeeData.BankName,
        bankBranch: employeeData.BankBranch,
      };

      // Lấy mã nhân viên mới để nhân bản
      if (employeeStore.mode === enums.form.mode.DUPLICATE) {
        await getNewEmployeeCode();
      }
    }
  } catch (error) {
    console.warn(error);
  }
};
handleLoadDataForUpdate();

/**
 * Description: Hàm xử lý gọi api cập nhật nhân viên
 *
 */
const handleUpdateEmployee = async () => {
  try {
    if (employeeStore.mode === enums.form.mode.UPDATE) {
      const employeeId = employeeStore.currentEmployee.EmployeeId;

      const data = generateData();

      await employeeApi.update(employeeId, data);

      // Hiện toast message thành công
      toastStore.pushSuccessMessage({
        message: MISAResource[globalStore.lang]?.Page?.Employee?.Toast?.UpdateSuccess,
      });

      return true;
    }
  } catch (error) {
    console.warn(error);

    // Hiện dialog báo lỗi
    dialogState.value = {
      active: true,
      type: "error",
      title: MISAResource[globalStore.lang]?.Dialog?.ErrorTitle,
      description: MISAResource[globalStore.lang]?.ErrorMessage[error?.response?.data?.ErrorCode],
    };

    return false;
  }
};

/**
 * Description: Hàm xử lý gọi api nhân bản nhân viên
 *
 */
const handleDuplicateEmployee = async () => {
  try {
    if (employeeStore.mode === enums.form.mode.DUPLICATE) {
      const data = {
        ...formData.value,
        gender: Number(formData.value.gender),
      };

      await employeeApi.create(data);

      // Hiện toast message nhân bản thành công
      toastStore.pushSuccessMessage({
        message: MISAResource[globalStore.lang]?.Page?.Employee?.Toast?.DuplicateSuccess,
      });

      return true;
    }
  } catch (error) {
    console.warn(error);

    // Hiện dialog báo lỗi
    dialogState.value = {
      active: true,
      type: "error",
      title: MISAResource[globalStore.lang]?.Dialog?.ErrorTitle,
      description: MISAResource[globalStore.lang]?.ErrorMessage[error?.response?.data?.ErrorCode],
    };

    return false;
  }
};
</script>

<style scoped></style>
