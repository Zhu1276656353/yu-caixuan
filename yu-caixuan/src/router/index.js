import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'//除了登录页面，所有页面都放在LayOut.vue中
import { useLoginStore } from '@/stores/login'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: "/",
      name: "layout",
      component: Layout,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'freshwaterFish',
          name: 'freshwaterFish',
          component: () => import('../views/FreshwaterFish.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'saltwaterFish',
          name: 'saltwaterFish',
          component: () => import('../views/SaltwaterFish.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: "fishTool",
          name: "fishTool",
          component: () => import('../views/fishTool.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: "upload",
          name: "upload",
          component: () => import('../views/uploadView.vue'),
        },
        {
          path: "/user",
          name: "user",
          component: () => import('../views/UserView.vue'),
          meta: {
            requireAuth: true
          },
        },
        {
          path: "/productDetails/:cid",
          name: "productDetails",
          component: () => import('../views/productDetails.vue'),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
  ],
})
// 在路由跳转之前进行验证
router.beforeEach((to, form, next) => {
  if (to.meta.requireAuth) {
    const loginStore = useLoginStore()
    let token = loginStore.token
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
export default router
