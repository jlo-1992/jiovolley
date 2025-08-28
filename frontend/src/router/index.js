/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores/userStore'
import userService from '@/services/userService'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
  // 可跳轉到頁面的指定 section
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth' })
        }, 500) // 等待 500 毫秒，確保頁面渲染完成
      })
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  // 檢查 URL 是否包含 token 參數
  const token = to.query.token
  console.log('取得的 token:', token)
  if (token) {
    try {
      console.log('開始處理 token')
      // 儲存 token 到 pinia
      user.token = token
      // 重新取得使用者資料
      const { data } = await userService.profile()
      user.login(data.user)

      // 清除 URL 中的 token 參數但保留其他參數
      const query = { ...to.query }
      delete query.token
      await router.replace({ path: to.path, query })

      console.log('登入成功，token 已儲存')
    } catch (error) {
      console.error('登入處理失敗:', error)

      // 發生錯誤時清除 token
      user.token = ''
    }
  }

  // 第一次進入網站初始導航時，如果有 token，取使用者資料
  if (from === START_LOCATION && user.isLoggedIn) {
    try {
      const { data } = await userService.profile()
      user.login(data.user)
    } catch (error) {
      console.error(error)
      // 取得使用者資料失敗就清空 token = 登出
      user.token = ''
    }
  }

  // 根據登入狀態和頁面路徑進行導航守衛
  // 去未登入限定頁面，例如註冊頁和登入頁，但使用者有登入 => 導航回首頁
  if (user.isLoggedIn) {
    if (to.meta.login === 'no-login-only') {
      next('/')
      // 去登入限定頁面，但使用者沒有登入 => 導航到登入頁
    } else if (to.meta.admin && !user.isAdmin) {
      next('/')
      // 不阻擋
    } else {
      next()
    }
  } else {
    if (to.meta.requiresAuth || to.meta.login === 'login-only' || to.meta.admin) {
      // 當使用者被導到登入頁時
      // 把他們原本想去的路徑 (to.fullPath) 加在 query 中
      next({ path: '/logInSingUp', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | JIOVOLLEY`
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
