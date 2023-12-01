<template>
  <header>
    <div class="content">
      <RouterLink to="/" class="logo">
        <img src="/assets/riven.png" alt="" />
        <h1>ShiroJobs</h1>
      </RouterLink>
      <section class="user">
        <RouterLink to="register" class="user-item" v-if="!isAuthenticated">Criar conta</RouterLink>
        <RouterLink to="login" class="user-item" v-if="!isAuthenticated">Entrar</RouterLink>
        <span class="user-item"></span>
      </section>
    </div>
  </header>
</template>

<script>
import { useAuthStore, usePurchaseStore } from '../stores/store.js'
export default {
  data() {
    return {}
  },
  created() {},
  computed: {
    isAuthenticated() {
      return useAuthStore().isAuthenticated
    }
  },
  methods: {
    handleLogin(isAuthenticated) {
      if (isAuthenticated) {
        return
      }
    }
  }
}
</script>

<style scoped>
header {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-block: 10px;
  margin-inline: 10px;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo img {
  height: 40px;
  filter: hue-rotate(300deg);
}

.logo h1 {
  font-size: 20px;
  color: rgb(95, 194, 230);
}

.user {
  display: flex;
  gap: 20px;
}

.user-item {
  cursor: pointer;
}

.user-item:hover {
  color: rgb(200, 200, 200);
}
</style>
