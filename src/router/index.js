import { createRouter, createWebHistory } from "vue-router";

// import TheDefaultLayout from "../components/layout/default-layout/TheDefaultLayout.vue";
// import TheEmptyLayout from "../components/layout/empty-layout/TheEmptyLayout.vue";

import DashboardPage from "../views/dashboard/DashboardPage.vue";
import EmployeeList from "../views/employee/EmployeeList.vue";
import NotFound from "../views/notfound/NotFound.vue";

const routes = [
  { path: "/", name: "home", component: DashboardPage, meta: { layout: "default" } },
  {
    path: "/employee",
    name: "employee",
    component: EmployeeList,
    meta: { layout: "default" },
  },
  { path: "/:pathMatch(.*)*", component: NotFound, meta: { layout: "empty" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
