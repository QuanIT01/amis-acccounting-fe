<template>
  <header :class="['navbar', { '--compact': globalStore.sidebar.isCompact }]">
    <div class="navbar__left">
      <div class="navbar__menu-icon" title="Menu"></div>
      <div class="navbar__logo-container">
        <div class="navbar__logo" title="AMIS Kế toán"></div>
        <div class="navbar__logo-text">{{ MISAResource[globalStore.lang]?.Product }}</div>
      </div>
    </div>
    <div class="navbar__right">
      <div class="navbar__title-wrap">
        <div @click="globalStore.toggleSidebar" class="navbar__sidebar-toggle">
          <MISAIcon icon="menu" />
        </div>

        <div class="navbar__title">
          <p>{{ MISAResource[globalStore.lang]?.Company }}</p>

          <div class="navbar__title-toggle">
            <MISAIcon icon="angle-down" />
          </div>
        </div>
      </div>
      <div class="navbar__controls">
        <div :title="MISAResource[globalStore.lang]?.Tooltip?.Notification" class="navbar__button">
          <MISAIcon icon="bell" />
        </div>

        <div @click.stop="toggleUserMenu" class="navbar__avatar-wrap">
          <img
            class="navbar__avatar"
            src="../../../../assets/img/avatar-default.png"
            :title="MISAResource[globalStore.lang]?.Tooltip?.Account"
            alt=""
          />
          <div class="navbar__avatar-name">
            <span>Trần Xuân Phúc</span>
            <div class="navbar__avatar-toggle">
              <MISAIcon icon="angle-down" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <MISAUserMenu v-if="isOpenUserMenu" @click.stop="" />
  </header>
</template>

<script setup>
import MISAUserMenu from "@/components/base/user-menu/MISAUserMenu.vue";
import MISAIcon from "@/components/base/icon/MISAIcon.vue";
import { useGlobalStore } from "@/stores/global-store";
import MISAResource from "@/resource/resource";
import { onMounted, ref } from "vue";

const isOpenUserMenu = ref(false);
const globalStore = useGlobalStore();

/**
 * Description: Hàm mở menu người dùng
 *
 */
const toggleUserMenu = () => {
  isOpenUserMenu.value = !isOpenUserMenu.value;
};

/**
 * Description: Hàm đóng menu người dùng
 *
 */
const closeUserMenu = () => {
  isOpenUserMenu.value = false;
};

/**
 * Description: Xử lý sự kiện click ra ngoài thì tắt user menu
 *
 */
onMounted(() => {
  window.addEventListener("click", closeUserMenu);
});
</script>

<style scoped>
@import url("./navbar.css");
</style>
