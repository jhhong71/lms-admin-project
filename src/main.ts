import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// [1] 공통 스타일 및 폰트 (가장 먼저 로드)
// Tailwind의 초기화 스타일이 다른 라이브러리에 영향을 주지 않도록 먼저 로드
import './assets/util.scss'
import './assets/style.scss'
import '@mdi/font/css/materialdesignicons.css'

// [2] AG Grid 기본 스타일
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// [3] 커스텀 스타일 (반드시 AG Grid 기본 스타일보다 나중에 로드)
import './assets/grid.scss'

// Vuetify 설정
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    global: { ripple: false },
    VTextField: { variant: 'outlined', density: 'compact', hideDetails: 'auto', bgColor: 'white', color: 'primary' },
    VSelect: { variant: 'outlined', density: 'compact', hideDetails: 'auto', bgColor: 'white', color: 'primary' },
    VBtn: { variant: 'flat', height: 40, class: 'text-capitalize font-weight-bold', rounded: 'md' },
    VCard: { elevation: 0, border: true, rounded: 'lg' },
    VNavigationDrawer: { elevation: 0, border: 'none' },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#2563eb', // Tailwind Blue-600
          secondary: '#475569',
          background: '#f1f5f9',
          surface: '#ffffff',
        },
      },
    },
  },
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')