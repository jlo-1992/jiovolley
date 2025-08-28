import apiService from './api'

export default {
  // 建立球場
  create(data) {
    return apiService.apiAuth.post('/venue', data)
  },
  getAllAdmin() {
    return apiService.apiAuth.get('/venue/all')
  },
  getAvailable() {
    return apiService.api.get('/venue')
  },
  getId(id) {
    return apiService.api.get('/venue/' + id)
  },
  update(id, data) {
    return apiService.apiAuth.patch(`/venue/${id}`, data)
  },
}
