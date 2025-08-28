import apiService from './api'

export default {
  // 建立報名
  create(socialid, data) {
    return apiService.apiAuth.post(`/socialParticipant/social/${socialid}/participants`, data)
  },
  // 會員本人查詢所有已報名的場次
  getMyParticipations(params) {
    return apiService.apiAuth.get('/socialParticipant/my-participations', { params })
  },
  // 會員可查詢場次的球員名單
  getParticipantsList(socialid) {
    return apiService.apiAuth.get(`/socialParticipant/social/${socialid}/participants`)
  },
  // 會員本人取消某個場次的報名（更改報名狀態）
  update(socialid, data) {
    return apiService.apiAuth.patch(`/socialParticipant/social/${socialid}/my-participation`, data)
  },
  checkIn(socialid, data) {
    return apiService.apiAuth.patch(`/socialParticipant/social/${socialid}/checkin`, data)
  },
}
