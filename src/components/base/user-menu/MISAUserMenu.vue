<template>
  <div class="ms-user-menu">
    <div class="ms-user-menu__avatar-wrapper">
      <img src="../../../assets/img/avatar-default.png" alt="" class="ms-user-menu__avatar" />
    </div>
    <div class="ms-user-menu__info-wrapper">
      <h4 class="ms-user-menu__display-name">Trần Xuân Phúc</h4>
      <p class="ms-user-menu__user-desc">dev.xuanphuc@gmail.com</p>
    </div>

    <div class="ms-user-menu__company">
      {{ MISAResource[globalStore.lang]?.Company }}
      <MISAIcon size="16" icon="angle-right" />
    </div>

    <ul class="ms-user-menu__menu">
      <li class="ms-user-menu__menu-item">
        <MISAIcon icon="key" />{{ MISAResource[globalStore.lang]?.UserMenu?.ChangePassword }}
      </li>
      <li class="ms-user-menu__menu-item">
        <MISAIcon icon="user-circle" />{{
          MISAResource[globalStore.lang]?.UserMenu?.AccountSettings
        }}
      </li>
      <li class="ms-user-menu__menu-item">
        <MISAIcon icon="shield" />{{ MISAResource[globalStore.lang]?.UserMenu?.SecuritySettings }}
      </li>
      <li class="ms-user-menu__menu-item">
        <MISAIcon icon="newspaper" />{{
          MISAResource[globalStore.lang]?.UserMenu?.LicenseAndPayment
        }}
      </li>
      <li class="ms-user-menu__menu-item">
        <MISAIcon icon="gift" />{{ MISAResource[globalStore.lang]?.UserMenu?.ReferralsEarnPoints }}
      </li>
      <li @click="toggleLanguageDropdown" class="ms-user-menu__menu-item">
        <MISAIcon :icon="globalStore.lang" />
        {{ MISAResource[globalStore.lang]?.UserMenu?.Language }}:
        {{ MISAResource[globalStore.lang]?.Language }}
        <MISAIcon size="16" icon="angle-down" />
        <div class="language-dropdown">
          <ul v-if="isOpenLanguageDropdown" class="language-dropdown__menu">
            <li
              v-for="language in languages"
              :key="language.LanguageCode"
              @click="changeLanguage(language)"
              :class="[
                'language-dropdown__menu-item',
                { '--active': language.LanguageCode === globalStore.lang },
              ]"
            >
              {{ language.Language }}
              <div class="language-dropdown__menu-icon">
                <MISAIcon icon="check" />
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <div class="ms-user-menu__sign-out">
      <MISAIcon icon="sign-out" />
      {{ MISAResource[globalStore.lang]?.UserMenu?.SignOut }}
    </div>
  </div>
</template>

<script setup>
import MISAIcon from "../icon/MISAIcon.vue";
import MISAResource from "@/resource/resource";
import { useGlobalStore } from "../../../stores/global-store";
import { computed, ref } from "vue";

const globalStore = useGlobalStore();
const isOpenLanguageDropdown = ref(false);

/**
 * Description: Chuyển đổi đối tượng resource sang mảng
 * để chọn ngôn ngữ
 *
 */
const languages = computed(() => {
  try {
    const languageKeys = Object.keys(MISAResource);

    return languageKeys.map((key) => {
      return MISAResource[key];
    });
  } catch (error) {
    console.warn(error);
    return [];
  }
});

/**
 * Description: Hàm đóng/mở language dropdown
 *
 */
const toggleLanguageDropdown = () => {
  isOpenLanguageDropdown.value = !isOpenLanguageDropdown.value;
};

/**
 * Description: Hàm thay đổi ngôn ngữ
 *
 */
const changeLanguage = (language) => {
  globalStore.changeLanguage(language.LanguageCode);
};
</script>

<style scoped>
@import url("./user-menu.css");
</style>
