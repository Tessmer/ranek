import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import LoginView from "../views/LoginView.vue";
import UserView from "../views/user/UserView.vue";
import UserProductsView from "../views/user/UserProductsView.vue";
import UserSalesView from "../views/user/UserSalesView.vue";
import UserShopsView from "../views/user/UserShopsView.vue";
import UserEditView from "../views/user/UserEditView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductView,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/user",
    component: UserView,
    children: [
      {
        path: "",
        name: "user",
        component: UserProductsView,
      },
      {
        path: "shops",
        name: "shops",
        component: UserShopsView,
      },
      {
        path: "sales",
        name: "sales",
        component: UserSalesView,
      },
      {
        path: "edit",
        name: "user-edit",
        component: UserEditView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

export default router;
