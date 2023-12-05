// store.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    login(username, password, email, fullname) {
      this.isAuthenticated = true
      this.user = { username: username, password: password, email: email, fullname: fullname }
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
