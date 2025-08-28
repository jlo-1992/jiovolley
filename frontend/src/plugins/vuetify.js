/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VIconBtn } from 'vuetify/labs/VIconBtn'
import { VCalendar } from 'vuetify/labs/VCalendar'
import { VPie } from 'vuetify/labs/VPie'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

// Composables
import { createVuetify } from 'vuetify'

import { VVideo } from 'vuetify/labs/VVideo'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'system',
  },
  display: {
    mobileBreakpoint: 'sm', // 設定在 md 尺寸及以下為行動裝置
    thresholds: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  components: {
    VVideo,
    VIconBtn,
    VCalendar,
    VPie,
    VFileUpload,
  },
  icons: {
    defaultSet: 'mdi',
  },
})
