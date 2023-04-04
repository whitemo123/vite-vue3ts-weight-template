import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/layouts/HomePage.vue'
import IndexView from "@/views/Index/IndexView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: HomePage,
      redirect: "/home",
      children: [
        // 首页
        {
          path: "/home",
          name: "home",
          component: IndexView
        }
      ]
    },
    // 登录页
    {
      path: "/login",
      name: "login",
      component: () => import("@/layouts/LoginPage.vue")
    }
  ]
})

export default router
