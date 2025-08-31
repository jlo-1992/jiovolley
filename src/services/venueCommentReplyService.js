import apiService from './api'

export default {
  // 建立回覆
  create(venueId, parentCommentId, data) {
    return apiService.apiAuth.post(`/venueCommentReply/venue/${venueId}/${parentCommentId}`, data)
  },
  // 取得所有回覆
  getReplies(venueId, parentCommentId) {
    return apiService.api.get(`/venueCommentReply/venue/${venueId}/${parentCommentId}`)
  },
  // 檢舉回覆
  reportReply(replyId, data) {
    return apiService.apiAuth.patch(`/venueCommentReply/${replyId}/report`, data)
  },
  // 按讚回覆
  likeReply(replyId) {
    return apiService.apiAuth.patch(`/venueCommentReply/${replyId}/like`)
  },
  // 編輯回覆
  update(replyId, data) {
    return apiService.apiAuth.patch(`/venueCommentReply/${replyId}`, data)
  },
  // 刪除回覆
  deleteReply(replyId) {
    return apiService.apiAuth.delete(`/venueCommentReply/${replyId}`)
  },
}
