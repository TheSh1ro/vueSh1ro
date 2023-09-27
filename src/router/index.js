import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EloJobView from '../views/EloJobView.vue'
import DuoJobView from '../views/DuoJobView.vue'
import PaymentView from '../views/PaymentView.vue'
import AccountView from '../views/AccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
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
