<script>
import { useAuthStore } from '../stores/store.js'

export default {
  computed: {
    username() {
      const authStore = useAuthStore()
      return authStore.user ? authStore.user.username : 'Entrar'
    },

    isUserLoggedIn() {
      const authStore = useAuthStore()
      return !!authStore.user // Verifica se o usuário está logado
    }
  }
}
</script>

<template>
  <header id="header">
    <RouterLink to="/" class="item">sh1roJobs</RouterLink>
    <RouterLink to="/account" class="item">
      <span>{{ username }}</span>
      <img v-if="isUserLoggedIn" src="../assets/user.webp" alt="" />
    </RouterLink>
  </header>
</template>

<style scoped>
#header {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 1.2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: background-color 0.2s;
}

#header:hover {
  background-color: rgb(8, 58, 91);
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
  gap: 3px;
}

.item:hover {
  text-shadow: 0px 0px 5px white;
}

img {
  height: 4vh;
  border: 1px solid white;
  border-radius: 50px;
}
</style>
