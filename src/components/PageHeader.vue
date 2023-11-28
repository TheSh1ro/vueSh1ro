<template>
  <header class="header" :class="{ headerWhileDropdown: showDropdown }">
    <RouterLink to="/" class="item header-logo">
      <img src="../assets/riven.png" />
      <p>ShiroJobs</p>
    </RouterLink>
    <div class="item">
      <div class="item-user" @click="redirectToAccount">
        <span>{{ username }}</span>
        <img v-if="isAuthenticated" class="user-image" src="../assets/user.webp" alt="" />
      </div>
    </div>
    <div v-if="showDropdown" class="dropdown">
      <header>
        <img
          src="https://t.ctcdn.com.br/JlHwiRHyv0mTD7GfRkIlgO6eQX8=/640x360/smart/i257652.jpeg"
          alt=""
        />
      </header>
      <body>
        <RouterLink class="drop-item" to="conta"> Conta </RouterLink>
        <span class="drop-item">Minhas compras</span>
        <span class="drop-item" @click="logoutAccount()">Desconectar</span>
      </body>
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
    username() {
      const authStore = useAuthStore()
      return authStore.user ? authStore.user.username : 'Entrar'
    },

    isAuthenticated() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    }
  },

  methods: {
    redirectToAccount() {
      if (this.isAuthenticated) {
        this.showDropdown = !this.showDropdown
      } else {
        this.$router.push('/login')
      }
    },
    logoutAccount() {
      const authStore = useAuthStore()
      authStore.logout()
      this.showDropdown = false
    }
  }
}
</script>

<style scoped>
.header {
  background-color: rgb(8, 58, 91, 0.8);
  color: white;
  font-size: 1.2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: background-color 0.2s;
  position: relative;
}

.header:hover {
  background-color: rgb(8, 58, 91);
}

.headerWhileDropdown {
  background-color: rgb(8, 58, 91);
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 3px;
  height: 100%;
  padding-inline: 10px;

  cursor: pointer;
  transition: color 0.2s;
}

.item:hover {
  color: lightcyan;
}

.item-user {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.header-logo > img {
  height: 6vh;
}

.dropdown {
  position: absolute;
  right: 0px;
  top: 120%;
  width: 220px;
  margin-right: 10px;

  display: grid;
  flex-direction: column;

  background-color: rgb(8, 58, 91);
  font-size: 1.1rem;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.dropdown > header > img {
  width: 100%;
  height: 40px;
  display: block;
  margin: 0 auto;
  object-fit: cover;
}
.dropdown > body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}

.drop-item {
  padding-block: 12px;
}
.drop-item:last-child {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.drop-item:hover {
  background-color: rgb(8, 78, 121);
}

.user-image {
  height: 4vh;
  border: 1px solid white;
  border-radius: 50px;
}
</style>
