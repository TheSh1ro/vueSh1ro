// store.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    login(username, password) {
      this.isAuthenticated = true
      this.user = { username: username, password: password }
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
    keepPurchase(servicePrice, currentElo, currentImage, targetElo, targetImage, serviceDeadline) {
      this.purchase = {
        totalPrice: servicePrice,
        currentEloName: currentElo,
        currentEloImage: currentImage,
        targetEloName: targetElo,
        targetEloImage: targetImage,
        deadline: serviceDeadline
      }
    },
    clearPurchase() {
      this.purchase = null
    }
  }
})
