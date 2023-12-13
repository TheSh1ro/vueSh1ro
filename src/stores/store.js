import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import authService from '../services/auth'
import api from '../plugins/api' // Certifique-se de importar a instância do api

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    token: { access: null, refresh: null },
    isAuthenticated: false,
    user: null // Adicione um estado para armazenar as informações do usuário
  })

  const isAuthenticated = computed(() => state.isAuthenticated)
  const token = computed(() => state.token)
  const user = computed(() => state.user)

  const login = async (user) => {
    try {
      const data = await authService.login(user)
      state.token.access = data.access
      state.token.refresh = data.refresh
      state.isAuthenticated = true

      // Após o login bem-sucedido, obtenha as informações do usuário
      await getUserData()
    } catch (error) {
      state.token.access = null
      state.token.refresh = null
      state.isAuthenticated = false
      return Promise.reject(error)
    }
  }

  const logout = () => {
    state.token.access = null
    state.token.refresh = null
    state.isAuthenticated = false
    state.user = null // Limpe as informações do usuário ao fazer logout
  }

  const getUserData = async () => {
    try {
      const userData = await authService.getUserData()
      state.user = userData
      console.log('getUserData: ' + userData.email)
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error)
    }
  }

  const updateToken = async () => {
    try {
      const refreshResponse = await authService.refreshToken(state.token.refresh)
      state.token.access = refreshResponse.access

      // Atualizar o token de acesso na instância do Axios
      api.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.access}`
    } catch (error) {
      console.error('Erro ao atualizar o token de acesso:', error)
    }
  }

  return { isAuthenticated, token, user, login, logout, updateToken }
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
