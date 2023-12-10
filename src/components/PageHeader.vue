<template>
  <header>
    <div class="content">
      <RouterLink to="/" class="logo">
        <img src="/assets/riven.png" alt="" />
        <h1 class="hiddenName">ShiroJobs</h1>
      </RouterLink>
      <section class="user">
        <div class="user-item" @click="handleLogin">
          <span to="/login">{{ username }}</span>
          <img src="/assets/people.png" alt="Foto de usuário" v-if="isAuthenticated" />
        </div>
      </section>
      <section ref="dropdown" class="dropdown" v-if="showDropdown">
        <RouterLink to="/dashboard" class="dropdown-item" @click="hideDropdown">Dashboard</RouterLink>
        <span class="dropdown-item" @click="handleLogout(), hideDropdown()">Desconectar</span>
      </section>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '../stores/store.js'

export default {
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    isAuthenticated() {
      return useAuthStore().isAuthenticated
    },
    username() {
      const authStore = useAuthStore()

      const userEmail = authStore.user ? authStore.user.email : 'Iniciar sessão'
      const username = userEmail.split('@')[0]

      return username
    }
  },
  methods: {
    handleLogin() {
      if (this.isAuthenticated) {
        this.showDropdown = !this.showDropdown
      } else {
        this.$router.push('/login')
      }
    },
    handleLogout() {
      useAuthStore().logout()
    },
    hideDropdown() {
      this.showDropdown = false
    }
  }
}
</script>

<style scoped>
header {
  display: grid;

  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 10px;
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
  align-items: center;
  gap: 20px;
  margin-right: 10px;
}

.user div {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user img {
  height: 20px;
}

.user-item {
  cursor: pointer;
  color: white;
  transition: color 0.2s;
}

.user-item:hover {
  color: rgb(185, 185, 185);
}

.dropdown {
  position: absolute;
  right: 20px;
  top: 60px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(95, 194, 230, 1);
  background-color: rgba(95, 194, 230, 0.15);
  border-bottom-left-radius: 20px;
}

.dropdown-item {
  padding: 15px 40px;
  cursor: pointer;
  color: rgb(225, 225, 225);
}

.dropdown-item:last-child {
  border-bottom-left-radius: 15px;
}

.dropdown-item:hover {
  background-color: rgba(95, 194, 230, 0.3);
  color: white;
}

@media (max-width: 300px) {
  .hiddenName {
    display: none;
  }
}
</style>
