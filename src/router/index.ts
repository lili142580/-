import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index.vue')
        },
        {
          path: '/list',
          name: 'list',
          component: () => import('@/views/user/list.vue')
        },
      ]
    },
    {
      path: '/login',
      name: "login",
      component: () => import('@/views/login/login.vue')
    },

  ]
})
router.beforeEach((to, from, next) => {
  let token: string | null = localStorage.getItem('token')
  if (to.name !== 'login' && !token) next({ path: '/login' })
  else next()
})
export default router
