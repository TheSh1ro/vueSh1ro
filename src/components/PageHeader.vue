<template>
  <header>
    <div class="content">
      <RouterLink to="/" class="logo">
        <img src="/assets/riven.png" alt="" />
        <h1>ShiroJobs</h1>
      </RouterLink>
      <section class="user">
        <RouterLink to="/register" class="user-item" v-if="!isAuthenticated">Criar conta</RouterLink>
        <div class="user-item" @click="handleLogin">
          <span to="/login">{{ username }}</span>
          <img src="/assets/people.png" alt="Foto de usuário" v-if="isAuthenticated" />
        </div>
      </section>
      <section class="dropdown" v-if="showDropdown">
        <RouterLink to="/account" class="dropdown-item" @click="hideDropdown">Minha conta</RouterLink>
        <span class="dropdown-item" @click="hideDropdown">Dashboard</span>
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
  created() {},
  computed: {
    isAuthenticated() {
      return useAuthStore().isAuthenticated
    },
    username() {
      const authStore = useAuthStore()
      return authStore.user ? authStore.user.username : 'Entrar'
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
}

.user-item:hover {
  color: rgb(200, 200, 200);
}

.dropdown {
  position: absolute;
  right: 20px;
  top: 60px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(95, 194, 230, 0.5);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.dropdown-item {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown-item:last-child {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.dropdown-item:hover {
  background-color: rgba(95, 194, 230, 0.5);
}
</style>
