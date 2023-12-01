import { defineStore } from "pinia";
import enums from "@/helper/enum";

export const useGlobalStore = defineStore("app-global", {
  state: () => ({
    lang: localStorage.getItem("lang") ?? enums?.language?.VN,
    sidebar: {
      isCompact: false,
    },
  }),
  getters: {},
  actions: {
    /**
     * Description: Hàm xử lý đóng mở sidebar
     *
     */
    toggleSidebar() {
      this.sidebar.isCompact = !this.sidebar.isCompact;
    },

    /**
     * Description: Hàm xử lý thay đổi ngôn ngữ
     *
     */
    changeLanguage(langCode) {
      this.lang = langCode;

      // Lưu vào localStorage
      localStorage.setItem("lang", langCode);

      // Reload lại trình duyệt
      window.location.reload();
    },
  },
});
