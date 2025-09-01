<template>
  <v-container fluid class="bg-light">
    <v-row>
      <v-col cols="12" md="7" class="mt-12">
        <div class="upper-wrapper d-flex mb-5">
          <h2 class="mr-8 mt-2">
            <span>{{ comments.length }}</span> 則留言
          </h2>
          <div class="text-center">
            <v-menu>
              <template v-slot:activator="{ props: activatorProps, isActive }">
                <v-btn rounded="xl" v-bind="activatorProps" class="btn" color="white">
                  <template v-slot:append>
                    <v-icon-btn
                      :rotate="isActive ? 180 : 0"
                      icon="$dropdown"
                      size="16"
                      variant="plain"
                      hide-overlay
                    ></v-icon-btn>
                  </template>
                  {{ orderSelection.title }}
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  title="最新留言"
                  link
                  @click="selectOrder({ title: '最新留言', value: 'newest' })"
                ></v-list-item>
                <v-list-item
                  title="最多讚留言"
                  link
                  @click="selectOrder({ title: '最多讚留言', value: 'mostLiked' })"
                ></v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>

        <v-form
          class="comment-wrapper d-flex"
          :disabled="isCommentSubmitting"
          @submit.prevent="submitComment"
        >
          <v-text-field
            v-model="comment.value.value"
            :error-messages="comment.errorMessage.value"
            :prepend-icon="icon"
            type="text"
            variant="filled"
            clearable
            label="請輸入留言"
            @click:prepend="changeIcon"
          ></v-text-field>
          <v-btn
            rounded="lg"
            class="btn btn-reply mt-2 ml-5"
            type="submit"
            :disabled="isCommentSubmitting"
            >留言</v-btn
          >
        </v-form>

        <div v-for="(comment, idx) in sortedComments" :key="idx" class="comment-wrapper mb-8 mt-5">
          <v-row>
            <v-col cols="1" class="mt-1">
              <v-icon>mdi-emoticon</v-icon>
            </v-col>
            <v-col cols="10">
              <div class="d-flex align-center">
                <div class="mr-3 font-weight-bold mb-1" style="font-size: 1.2rem">
                  {{ comment.userName }}
                </div>
                <div style="color: gray">{{ comment.CommentTimeAgo }}</div>
              </div>
              <div style="font-size: 1.2rem">{{ comment.comment }}</div>
              <div class="d-flex mt-4 mb-4">
                <v-icon
                  class="icon-like mr-1"
                  @click="toggleLike(comment)"
                  :color="comment.likedBy?.includes(user._id) ? 'blue' : 'grey'"
                  >mdi-thumb-up-outline</v-icon
                >
                <span class="likes-number mt-2">{{ comment.likes }}</span>
                <v-icon class="icon-report ml-5 mr-6" @click="openDialog(comment)"
                  >mdi-flag-outline</v-icon
                >
                <v-btn class="btn btn-reply" rounded="lg" @click="showReplyForm(comment._id)"
                  >回覆</v-btn
                >
              </div>
              <div
                v-if="comment.repliesCount > 0"
                class="show-replies ml-8 mt-3"
                @click="toggleShowReplies(comment)"
              >
                <v-icon
                  class="mr-3"
                  :class="{ 'not-rotated': !comment.showReplies, rotated: comment.showReplies }"
                  >mdi-chevron-down</v-icon
                >
                <span>{{ comment.repliesCount }}則回覆</span>
              </div>

              <div v-if="activeReplyId === comment._id" class="mt-4">
                <v-form :disabled="isReplySubmitting" @submit.prevent="submitReplies">
                  <v-text-field
                    v-model="reply.value.value"
                    :error-messages="reply.errorMessage.value"
                    :prepend-icon="icon"
                    type="text"
                    variant="filled"
                    clearable
                    label="請輸入回覆"
                    @click:prepend="changeIcon"
                  ></v-text-field>
                  <div class="d-flex justify-end">
                    <v-btn
                      rounded="lg"
                      class="btn btn-reply mr-2"
                      type="submit"
                      :disabled="isReplySubmitting"
                      >回覆</v-btn
                    >
                    <v-btn rounded="lg" color="white" class="btn btn-reply" @click="hideReplyForm"
                      >取消</v-btn
                    >
                  </div>
                </v-form>
              </div>
              <div v-if="comment.showReplies && comment.repliesCount > 0">
                <div v-for="reply in comment.replies" :key="reply._id" class="reply-wrapper mt-4">
                  <v-row>
                    <v-col cols="1">
                      <v-icon>mdi-emoticon</v-icon>
                    </v-col>
                    <v-col cols="10">
                      <div class="d-flex align-center">
                        <div class="mr-3 font-weight-bold text-h6">{{ reply.userName }}</div>
                        <div style="color: gray">{{ reply.replyTimeAgo }}</div>
                      </div>
                      <div>{{ reply.reply }}</div>
                      <v-icon
                        class="icon-like mt-2 mr-1"
                        @click="toggleLikeReply(reply, comment)"
                        :color="reply.likedBy?.includes(user._id) ? 'blue' : 'grey'"
                        >mdi-thumb-up-outline</v-icon
                      >
                      <span class="likes-number">{{ reply.likes }}</span>
                      <v-icon class="icon-report mt-2 ml-5 mr-6" @click="openDialog(reply)"
                        >mdi-flag-outline</v-icon
                      >
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" md="3" class="mt-md-12 ml-md-16">
        <h1 class="font-weight-bold mb-5" style="font-size: 1.8rem">其他你可能有興趣的場館</h1>

        <v-card
          v-for="(venue, idx) in venuesWithout"
          :key="idx"
          class="d-flex mb-5 card-recommandVenues"
          :to="`/venueSingle/${venue._id}`"
          width="500"
        >
          <div>
            <v-img width="250" height="150" rounded="lg" :src="venue.images[0]" cover></v-img>
          </div>
          <div>
            <v-card-title class="font-weight-bold" style="white-space: wrap">{{
              venue.name
            }}</v-card-title>
            <v-card-text>{{ venue.city }}{{ venue.address }}</v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent width="300">
    <v-form :disabled="isReportSubmitting" @submit.prevent="submitReport(comment)">
      <v-card class="card-dialog">
        <v-card-title class="text-center mt-3">檢舉留言</v-card-title>
        <v-divider thickness="2" opacity="1" color="black" class="mt-3 mx-10"></v-divider>
        <v-card-text>
          <v-radio-group
            label="檢舉理由"
            v-model="reportReason.value.value"
            :error-messages="reportReason.errorMessage.value"
          >
            <v-radio label="詐騙" value="詐騙"></v-radio>
            <v-radio label="仇恨言論" value="仇恨言論"></v-radio>
            <v-radio label="色情言論" value="色情言論"></v-radio>
            <v-radio label="其他" value="其他"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions class="mb-3 mr-3">
          <v-btn class="btn btn-red" :disabled="isReportSubmitting" @click="closeDialog"
            >取消</v-btn
          >
          <v-btn class="btn" :loading="isReportSubmitting" type="submit">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import venueCommentService from '@/services/venueCommentService'
import venueCommentReplyService from '@/services/venueCommentReplyService'
import venueService from '@/services/venueService'
import userService from '@/services/userService'
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-tw'

dayjs.extend(relativeTime)
dayjs.locale('zh-tw')

const createSnackbar = useSnackbar()
const router = useRouter()
const route = useRoute()
const user = useUserStore()
const isLoggedIn = computed(() => user.isLoggedIn)
const comments = ref([])
const replies = ref([])
const showReplies = ref(false)
const allVenues = ref([])
const venuesWithout = ref([])
const dialog = ref({
  // 控制對話框開關
  open: false,
  // 當前操作的留言 ID
  id: '',
})
const activeReplyId = ref(null)

const orderSelection = ref({
  title: '最新留言',
  value: 'newest',
})

const selectOrder = (item) => {
  orderSelection.value = item
}

const sortedComments = computed(() => {
  const commentsCopy = [...comments.value]
  if (orderSelection.value.value === 'newest') {
    return commentsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else if (orderSelection.value.value === 'mostLiked') {
    return commentsCopy.sort((a, b) => b.likes - a.likes)
  }
  return commentsCopy
})

const icons = [
  'mdi-emoticon',
  'mdi-emoticon-cool',
  'mdi-emoticon-dead',
  'mdi-emoticon-excited',
  'mdi-emoticon-happy',
  'mdi-emoticon-neutral',
  'mdi-emoticon-sad',
  'mdi-emoticon-tongue',
]

const props = defineProps({
  venueId: {
    type: String,
    required: true,
  },
})

const getVenues = async (id) => {
  try {
    const { data } = await venueService.getAvailable()
    allVenues.value = data.venues
    venuesWithout.value = allVenues.value
      .filter((venue) => venue._id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 8)
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '球場取得失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

// 建立 vee-validate 註冊表單
const {
  handleSubmit: handleCommentSubmit,
  isSubmitting: isCommentSubmitting,
  resetForm: resetCommentForm,
} = useForm({
  // 用 yup 定義表單驗證格式
  // https://github.com/jquense/yup
  // 前後端都要做驗證，且驗證的規則要一樣，前端是要回覆給使用者錯誤的原因，後端是要防止錯誤的資料進資料庫
  validationSchema: yup.object({
    comment: yup.string().required('留言內容必填').min(1, '留言不可為空白'),
  }),
  initialValues: {
    comment: '',
  },
})

// 建立 vee-validate 的表單欄位
// 一定要在 useForm 後面
// useField(欄位名稱)
const comment = useField('comment')

const getComments = async () => {
  try {
    const { data } = await venueCommentService.getComments(props.venueId)
    const fetchedComments = data.venueComments

    const commentsWithData = await Promise.all(
      fetchedComments.map(async (comment) => {
        // 取得留言的使用者資料
        const userData = comment.user
          ? (await userService.getUserById(comment.user)).data.user
          : null
        const userName = userData?.name || '未知使用者' // 取得該留言的所有回覆

        return {
          ...comment,
          userName,
          CommentTimeAgo: dayjs(comment.createdAt).fromNow(),
          repliesCount: comment.repliesCount || 0,
          replies: [],
          showReplies: false,
        }
      })
    )

    comments.value = commentsWithData
  } catch (error) {
    console.error('取得場次留言失敗', error)
    createSnackbar({
      text: '無法載入球場留言',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

// vee-validate 的表單送出
// handleSubmit(處理function)
// values 表單所有欄位的值
const submitComment = handleCommentSubmit(async (values) => {
  if (!isLoggedIn.value) {
    createSnackbar({
      text: '請先登入才能留言喔！',
      snackbarProps: {
        color: 'red',
      },
    })
    return router.push('/logInSingUp')
  }
  try {
    await venueCommentService.create(props.venueId, {
      comment: values.comment,
    })
    createSnackbar({
      text: '新增留言成功',
      snackbarProps: {
        color: 'green',
      },
    })
    // 留言成功後，留在原本的頁面
    resetCommentForm()
    await getComments()
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '留言失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})

const {
  handleSubmit: handleReplySubmit,
  isSubmitting: isReplySubmitting,
  resetForm: resetReplyForm,
} = useForm({
  // 用 yup 定義表單驗證格式
  // https://github.com/jquense/yup
  // 前後端都要做驗證，且驗證的規則要一樣，前端是要回覆給使用者錯誤的原因，後端是要防止錯誤的資料進資料庫
  validationSchema: yup.object({
    reply: yup.string().required('回覆內容必填').min(1, '留言不可為空白'),
  }),
  initialValues: {
    reply: '',
  },
})

// 建立 vee-validate 的表單欄位
// 一定要在 useForm 後面
// useField(欄位名稱)
const reply = useField('reply')

const showReplyForm = (commentId) => {
  activeReplyId.value = commentId
}

const hideReplyForm = () => {
  resetReplyForm()
  activeReplyId.value = null
}

const getReplies = async (comment) => {
  try {
    // 檢查回覆是否已經載入過，避免重複請求
    if (comment.replies.length > 0) {
      return
    }

    const { data: repliesData } = await venueCommentReplyService.getReplies(
      props.venueId,
      comment._id
    )

    const repliesWithData = await Promise.all(
      repliesData.venueCommentReplies.map(async (reply) => {
        // ... (回覆的使用者資料處理，與你原來的程式碼類似) ...
        const replyUserData = reply.user
          ? (await userService.getUserById(reply.user)).data.user
          : null
        const replyUserName = replyUserData?.name || '未知使用者'
        return {
          ...reply,
          userName: replyUserName,
          replyTimeAgo: dayjs(reply.createdAt).fromNow(),
        }
      })
    )

    // 將取得的回覆資料賦值給該留言的 replies 屬性
    comment.replies.splice(0, comment.replies.length, ...repliesWithData)
  } catch (replyError) {
    console.error('無法取得回覆資料:', replyError)
    createSnackbar({
      text: '無法載入留言回覆',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const toggleShowReplies = async (comment) => {
  // 切換 showReplies 狀態
  comment.showReplies = !comment.showReplies

  // 如果狀態變為 true 且回覆尚未載入，則執行載入
  if (comment.showReplies && comment.replies.length === 0) {
    await getReplies(comment)
  }
}

// vee-validate 的表單送出
// handleSubmit(處理function)
// values 表單所有欄位的值
const submitReplies = handleReplySubmit(async (values) => {
  if (!isLoggedIn.value) {
    createSnackbar({
      text: '請先登入才能留言喔！',
      snackbarProps: {
        color: 'red',
      },
    })
    return router.push('/logInSingUp')
  }

  // 檢查 activeReplyId 是否存在
  if (!activeReplyId.value) {
    throw new Error('無法取得回覆的留言 ID')
  }

  const parentComment = comments.value.find((comment) => comment._id === activeReplyId.value)
  if (!parentComment) return

  try {
    await venueCommentReplyService.create(props.venueId, parentComment._id, {
      reply: values.reply,
    })
    createSnackbar({
      text: '新增回覆成功',
      snackbarProps: {
        color: 'green',
      },
    })
    await getComments()
    resetReplyForm()
    hideReplyForm()
    const updatedParentComment = comments.value.find(
      (comment) => comment._id === activeReplyId.value
    )
    if (updatedParentComment) {
      updatedParentComment.showReplies = true
      // 呼叫 getReplies 函式，載入剛剛新增的回覆資料
      await getReplies(updatedParentComment)
    }
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '回覆失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})

const toggleLikeReply = async (reply) => {
  if (!isLoggedIn.value) {
    createSnackbar({
      text: '請先登入才能按讚喔！',
      snackbarProps: {
        color: 'red',
      },
    })
    return router.push('/logInSingUp')
  }

  try {
    const { data } = await venueCommentReplyService.likeReply(reply._id)

    const parentComment = comments.value.find((comment) => comment._id === activeReplyId.value)
    if (!parentComment) return
    const originalReply = parentComment.replies.find((reply) => reply._id === reply._id)
    if (!originalReply) return

    if (data.message === '已按讚回覆！') {
      originalReply.likes++
      if (!originalReply.likedBy) originalReply.likedBy = []
      originalReply.likedBy.push(user._id)
    } else if (data.message === '您已收回讚！') {
      originalReply.likes--
      if (originalReply.likedBy) {
        const userIndex = originalReply.likedBy.indexOf(user._id)
        if (userIndex > -1) {
          originalReply.likedBy.splice(userIndex, 1)
        }
      }
    }
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '按讚/取消按讚失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const toggleLike = async (comment) => {
  if (!isLoggedIn.value) {
    createSnackbar({
      text: '請先登入才能按讚喔！',
      snackbarProps: {
        color: 'red',
      },
    })
    return router.push('/logInSingUp')
  }
  const commentId = comment._id
  try {
    const { data } = await venueCommentService.likeComment(commentId)

    const originalComment = comments.value.find((c) => c._id === commentId)
    if (!originalComment) return

    if (data.message === '已按讚留言！') {
      originalComment.likes++
      if (!originalComment.likedBy) originalComment.likedBy = []
      originalComment.likedBy.push(user._id)
    } else if (data.message === '您已收回讚！') {
      originalComment.likes--
      if (originalComment.likedBy) {
        const userIndex = originalComment.likedBy.indexOf(user._id)
        if (userIndex > -1) {
          originalComment.likedBy.splice(userIndex, 1)
        }
      }
    }
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '按讚/取消按讚失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

const openDialog = (comment) => {
  if (!isLoggedIn.value) {
    createSnackbar({
      text: '請先登入才能檢舉留言喔！',
      snackbarProps: {
        color: 'red',
      },
    })
    return router.push('/logInSingUp')
  }

  dialog.value.open = true
  dialog.value.id = comment._id
}

const closeDialog = () => {
  dialog.value.open = false
  dialog.value.id = ''
  resetReportForm()
}

const {
  handleSubmit: handleReportSubmit,
  isSubmitting: isReportSubmitting,
  resetForm: resetReportForm,
} = useForm({
  validationSchema: yup.object({
    reportReason: yup.string().required('請至少選擇一項檢舉理由'),
  }),
})

const reportReason = useField('reportReason')

const submitReport = handleReportSubmit(async (values) => {
  try {
    const commentId = dialog.value.id
    const reportReasonValue = values.reportReason
    const { data } = await venueCommentService.reportComment(commentId, {
      reason: reportReasonValue,
    })
    createSnackbar({
      text: data.message,
      snackbarProps: {
        color: 'green',
      },
    })
    closeDialog()
    resetReportForm()
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: error?.response?.data?.message || '檢舉留言失敗，請稍後再試！',
      snackbarProps: {
        color: 'red',
      },
    })
  }
})

const iconIndex = ref(0)
const icon = computed(() => {
  return icons[iconIndex.value]
})
function changeIcon() {
  iconIndex.value === icons.length - 1 ? (iconIndex.value = 0) : iconIndex.value++
}

onMounted(() => {
  getComments()
  getVenues()
})
</script>

<style lang="scss" scoped>
.card-dialog {
  border: 2px solid black;
  background: #f1f1f1;
}
.btn-red {
  background-color: red;
}

.comment-wrapper {
  background: white;
  padding: 15px 10px;
  border-radius: 16px;
  border: 2px solid black;
  box-shadow: 3px 6px 1px black;
}

.show-replies {
  width: 130px;
  padding: 5px 7px;
}

.icon-report,
.icon-like {
  padding: 20px;
}

.show-replies:hover,
.icon-report:hover,
.icon-like:hover {
  background: lightgray;
  border-radius: 16px;
  cursor: pointer;
}

.order-wrapper:hover {
  background: lightgray;
  border-radius: 16px;
  padding-left: 0;
  cursor: pointer;
}

.more-comments-btn {
  width: 300px;
  border-radius: 32px;
  margin-bottom: 50px;
  height: 40px;
  margin-left: 20%;
}

.rotated {
  transform: rotate(180deg);
  transition: transform 0.1s ease;
}

.not-rotated {
  transition: transform 0.1s ease;
}

.btn-reply {
  font-size: 0.9rem;
}

.card-recommandVenues:hover {
  box-shadow: 3px 6px 1px black;
}

@media (min-width: 768px) {
  .comment-wrapper,
  .upper-wrapper {
    margin-left: 290px;
    color: vars.$primary-color;
  }

  .more-comments-btn {
    width: 500px;
    margin-left: 470px;
    border-radius: 32px;
    margin-bottom: 50px;
    height: 40px;
  }
}
</style>
