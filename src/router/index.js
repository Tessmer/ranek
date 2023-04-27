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
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: NotFound,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/produto/:id",
    name: "produto",
    component: ProductView,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/usuario",
    component: UserView,
    meta: {
      login: true,
    },
    children: [
      {
        path: "",
        name: "usuario",
        component: UserProductsView,
      },
      {
        path: "compras",
        name: "compras",
        component: UserShopsView,
      },
      {
        path: "vendas",
        name: "vendas",
        component: UserSalesView,
      },
      {
        path: "editar",
        name: "usuario-editar",
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.login)) {
    if (!window.localStorage.token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
