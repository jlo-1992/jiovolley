import apiService from './api'

// 做事情的時候呼叫 api，也會有錯誤訊息
export default {
  // 註冊
  create(data) {
    return apiService.api.post('/user', data)
  },
  // 登入
  login(data) {
    return apiService.api.post('/user/login', data)
  },
  // 第三方登入
  lineLogin() {
    const callback = window.location.origin + 'user/auth/line/callback'
    return apiService.api.get('/user/auth/line', {
      params: { callback },
    })
  },
  googleLogin() {
    return apiService.api.get('/user/auth/google')
  },

  // 取得使用者資料
  profile() {
    return apiService.apiAuth.get('/user/profile')
  },
  // 更新使用者資料
  updateProfile(data) {
    return apiService.apiAuth.patch('/user/profile', data)
  },
  // token 舊換新
  refresh() {
    return apiService.apiAuth.patch('/user/refresh')
  },
  logout() {
    return apiService.apiAuth.delete('/user/logout')
  },
  getUserById(id) {
    return apiService.api.get(`/user/${id}`)
  },

  updateFavoriteVenues(venueid) {
    return apiService.apiAuth.patch('/user/favoriteVenues', venueid)
  },
  getFavoriteVenues() {
    return apiService.apiAuth.get('/user/favoriteVenues')
  },

  // updateFavoriteProducts(productid) {
  //   return apiService.apiAuth.patch('/user/favoriteProducts' + `${productid}`)
  // },
  // getFavoriteProducts() {
  //   return apiService.apiAuth.get('/user/favoriteProducts')
  // },

  // // 新增商品至購物車
  // cart(data) {
  //   return apiService.apiAuth.patch('/user/cart', data)
  // },
  // // 取得購物車的商品內容
  // getCart() {
  //   return apiService.apiAuth.get('/user/cart')
  // },
}
