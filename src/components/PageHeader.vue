<script>
import { defineComponent } from 'vue'
import { useAuthStore } from '../stores/store.js'

export default defineComponent({
  name: 'PageHeader',
  computed: {
    username() {
      const authStore = useAuthStore()
      return authStore.user ? authStore.user.username : '' // Retorna o username do store ou uma string vazia se não estiver autenticado
    }
  },
  methods: {
    getUsername() {
      if (this.username) {
        return this.username // Correção: referenciar this.username
      } else {
        return 'Entrar'
      }
    }
  }
})
</script>

<template>
  <header id="header">
    <RouterLink to="/" class="item">sh1roJobs</RouterLink>
    <RouterLink to="/account" class="item">{{ getUsername() }}</RouterLink>
    <!-- Correção: chamar a função getUsername() -->
  </header>
</template>

<style scoped>
#header {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: background-color 0.5s;
}
#header:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-inline: 10px;
  transition:
    color 0.5s,
    text-shadow 0.5s;
  height: 100%;
}
.item:hover {
  text-shadow: 0px 0px 5px white;
}
</style>
