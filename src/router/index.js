import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EloJobView from '../views/EloJobView.vue'
import DuoJobView from '../views/DuoJobView.vue'
import PaymentView from '../views/PaymentView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
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
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
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
