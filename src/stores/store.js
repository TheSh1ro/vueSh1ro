// store.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    login(username, password, fullname, email) {
      this.isAuthenticated = true
      this.user = { username: username, password: password, fullname: fullname, email: email }
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
    keepPurchase(
      serviceType,
      servicePrice,
      currentElo,
      currentImage,
      targetElo,
      targetImage,
      serviceDeadline
    ) {
      this.purchase = {
        serviceType: serviceType,
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
