import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "harmonica",
      component: () => import("@/views/Harmonica.vue"),
    },
  ],
});

export default router;
