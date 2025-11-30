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
    //前端路由
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
          path: "/user",
          name: "user",
          component: () => import('../views/UserView.vue'),
          meta: {
            requireAuth: true
          },
        },
        // {
        //   path:"/user/orders",
        //   name:"userOrders",
        //   component: () => import('../views/userOrder.vue'),
        //   meta: {
        //     requireAuth: true
        //   },
        // },
        {
          path: "/productDetails/:id",
          name: "productDetails",
          component: () => import('../views/productDetails.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "/checkout",
          name: "checkout",
          component: () => import('../views/checkout.vue'),
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    // 后台管理系统路由
    {
      path: "/backend",
      name: "backend",
      component: () => import('../views/Backend/backend.vue'),
      children: [
        {
          path: "/backend/backendHome",
          name: "backendHome",
          component: () => import('../views/Backend/backendHome.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "/backend/usersManage",
          name: "userManage",
          component: () => import('../views/Backend/userManage.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "/backend/upload",
          name: "upload",
          component: () => import('../views/Backend/uploadView.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "/backend/backendOrder",
          name: "backendOrder",
          component: () => import('../views/Backend/backendOrder.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: "/backend/goodsManage",
          name: "goodsManage",
          component: () => import('../views/Backend/goodsManage.vue'),
          children: [
            {
              path: "/backend/goodsManage/freshwaterFishManage",
              name: "freshwaterFishManage",
              component: () => import('../views/Backend/freshwaterFishManage.vue'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: "/backend/goodsManage/saltwaterFishManage",
              name: "saltwaterFishManage",
              component: () => import('../views/Backend/saltwaterFishManage.vue'),
              meta: {
                requireAuth: true
              }
            },
            {
              path: "/backend/goodsManage/fishToolManage",
              name: "fishToolManage",
              component: () => import('../views/Backend/fishToolManage.vue'),
              meta: {
                requireAuth: true
              }
            }
          ]
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
