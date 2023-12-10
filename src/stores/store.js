import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import authService from '../services/auth'

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    token: null,
    loggedIn: false
  })

  const loggedIn = computed(() => state.loggedIn)
  const token = computed(() => state.token)

  const login = async (user) => {
    try {
      const data = await authService.login(user)
      state.token = data.access
      state.loggedIn = true
    } catch (error) {
      state.token = null
      state.loggedIn = false
      return Promise.reject(error)
    }
  }

  const logout = () => {
    state.token = null
    state.loggedIn = false
  }

  return { loggedIn, token, login, logout }
})

export const usePurchaseStore = defineStore('purchase', {
  state: () => ({
    purchase: null,

    serviceId: null,
    queueId: null
  }),
  actions: {
    keepPurchase(service, queue, currentElo, targetElo, price, days) {
      this.purchase = {
        service: service,
        queue: queue,
        currentElo: currentElo,
        targetElo: targetElo,
        price: price,
        time: days
      }
    },
    submitServiceId(id) {
      this.serviceId = id
    },
    submitQueueId(id) {
      this.queueId = id
    },
    clearPurchase() {
      this.purchase = null
    }
  }
})
