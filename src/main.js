import "./assets/css/main.css";

import { createApp } from "vue/dist/vue.esm-bundler";
import router from "./router";
import { createPinia } from "pinia";
import App from "./App.vue";
import handleTooltip from "./directives/tooltip";
import focusTrapDirective from "./directives/focus-trap";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.directive("tooltip", handleTooltip);

app.directive("focustrap", focusTrapDirective);

app.mount("#app");
