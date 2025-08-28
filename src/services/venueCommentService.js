import apiService from './api'

export default {
  // 建立留言
  create(venueid, data) {
    return apiService.apiAuth.post(`/venueComment/venue/${venueid}`, data)
  },
  // 取得所有留言
  getComments(venueid) {
    return apiService.api.get(`/venueComment/venue/${venueid}`)
  },
  // 檢舉留言
  reportComment(commentId, data) {
    return apiService.apiAuth.patch(`/venueComment/${commentId}/report`, data)
  },
  // 按讚留言
  likeComment(commentId) {
    return apiService.apiAuth.patch(`/venueComment/${commentId}/like`)
  },
  // 編輯留言
  update(commentId, data) {
    return apiService.apiAuth.patch(`/venueComment/${commentId}`, data)
  },
  // 刪除留言
  deleteComment(commentId) {
    return apiService.apiAuth.delete(`/venueComment/${commentId}`)
  },
}
