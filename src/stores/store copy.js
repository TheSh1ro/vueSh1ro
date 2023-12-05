// store.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    async login(username, password, email, fullname) {
      try {
        const { data } = await axios.post('o_endereco/token', {
          email: username, password
        })
        console.log(data)
        salvar o data.access no state.actions
        this.user = { username: username, password: password, email: email, fullname: fullname }
        this.isAuthenticated = true
      } catch(e) {
        console.log(e)
        this.isAuthenticated = false
        this.user = null
      }
    },
    logout() {
      this.isAuthenticated = false
      this.user = null
    }
  }
})

export const usePurchaseStore = defineStore('purchase', {
  state: () => ({
    purchase: null
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
    clearPurchase() {
      this.purchase = null
      this.isStored = false
    }
  }
})
