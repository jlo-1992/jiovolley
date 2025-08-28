import apiService from './api'

export default {
  // 建立場次
  create(data) {
    return apiService.apiAuth.post('/social', data)
  },
  getAll(params) {
    return apiService.apiAuth.get('/social/all', { params })
  },
  getAvailable() {
    return apiService.api.get('/social')
  },
  getId(socialId) {
    return apiService.api.get(`/social/${socialId}`)
  },
  getQrCode(socialId) {
    return apiService.apiAuth.get(`/social/${socialId}/qrcode/admin`)
  },
  update(socialId, data) {
    return apiService.apiAuth.patch(`/social/${socialId}`, data)
  },
}
