// store.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    login(username) {
      // Aqui você pode realizar a verificação do login e senha, mas vamos apenas definir isAuthenticated como verdadeiro
      this.isAuthenticated = true;
      this.user = { username };
    },
  },
});
