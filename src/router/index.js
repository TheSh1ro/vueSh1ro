import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EloJobView from '../views/EloJobView.vue'
import DuoJobView from '../views/DuoJobView.vue'
import PaymentView from '../views/PaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/eloJob',
      name: 'eloJob',
      component: EloJobView
    },
    {
      path: '/duoJob',
      name: 'duoJob',
      component: DuoJobView
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView
    }
  ]
})

export default router
