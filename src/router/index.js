import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminDashboard.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,

  // 高亮：當前項目加上 class 名稱
  linkActiveClass: '', // 預設為 router-link-active，模糊比對
  linkExactActiveClass: 'active', // 預設為 router-link-exact-active，嚴格匹配(當有 path:'' 的頁面選到它的 children 不會同時高亮)

  // 換頁回到最上方
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition) // to 前往頁面、from 來自頁面、視窗位置(未存取顯示 null)
    // 當網址路徑含有 '/' 的頁面有 scrollTop
    if (to.fullPath.match('/')) {
      return {
        top: 0,
        left: 0,
        behavior: 'instant' // 'instant' 表示瞬間切換，無平滑效果
      }
    }
    return {}
  }
})

export default router
