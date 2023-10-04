import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EloJobView from '../views/EloJobView.vue'
import DuoJobView from '../views/DuoJobView.vue'
import PaymentView from '../views/PaymentView.vue'
import AccountView from '../views/AccountView.vue'
import TipsView from '../views/TipsView.vue'
import Md5View from '../views/Md5View.vue'

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
      name: 'Account',
      component: AccountView
    },
    {
      path: '/eloJob',
      name: 'EloJob',
      component: EloJobView
    },
    {
      path: '/duoJob',
      name: 'DuoJob',
      component: DuoJobView
    },
    {
      path: '/tips',
      name: 'Tips',
      component: TipsView
    },
    {
      path: '/md5',
      name: 'MD5',
      component: Md5View
    },
    {
      path: '/payment',
      name: 'Payment',
      component: PaymentView
    }
  ]
})

export default router
