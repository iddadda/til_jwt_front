import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Join from "@/views/Join.vue";
import Login from "@/views/Login.vue";
import Cart from "@/views/Cart.vue";
import OrderForm from "@/views/OrderForm.vue";
import Orders from "@/views/Orders.vue";
import OrederDetail from "@/views/OrederDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/join",
      component: Join,
    },

    {
      path: "/login",
      component: Login,
    },
    {
      path: "/cart",
      component: Cart,
    },
    {
      path: "/order",
      component: OrderForm,
    },
    {
      path: "/orders",
      component: Orders,
    },
    {
      path: "/orders/:id",
      component: OrederDetail,
    },
  ],
});

export default router;
