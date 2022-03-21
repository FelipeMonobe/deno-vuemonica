import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "transposer",
      component: () => import("@/views/Transposer.vue"),
    },
  ],
});

export default router;
