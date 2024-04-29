import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: () => import("../mainPages/LandingPage.vue"),
    },
    {
      path: "/Display",
      name: "Display",
      component: () => import("../mainPages/DisplayUser.vue"),
    },
    {
      path: "/edit",
      name: "edit",
      component: () => import("../mainPages/EditUser.vue"),
    },

  ],
});

export default router;
