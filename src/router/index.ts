import { createRouter, createWebHistory } from 'vue-router'
import LectureStatusView from '../views/LectureStatusView.vue'
import ComingSoonView from '../views/ComingSoonView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'lectures',
      component: LectureStatusView,
      meta: { title: '강의 개설 현황', category: '학사 관리' }
    },
    {
      path: '/students',
      name: 'students',
      component: ComingSoonView,
      meta: { title: '수강생 관리', category: '학사 관리' }
    },
    {
      path: '/professors',
      name: 'professors',
      component: ComingSoonView,
      meta: { title: '교수진 관리', category: '학사 관리' }
    },
    {
      path: '/stats',
      name: 'stats',
      component: ComingSoonView,
      meta: { title: '통계 대시보드', category: '시스템' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: ComingSoonView,
      meta: { title: '설정', category: '시스템' }
    }
  ]
})

export default router