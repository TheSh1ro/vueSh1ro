<template>
  <header id="header">
    <RouterLink to="/" class="item">sh1roJobs</RouterLink>
    <div class="item">
      <div class="item-user" @click="redirectToAccount">
        <span>{{ username }}</span>
        <img v-if="isUserLoggedIn" class="user-image" src="../assets/user.webp" alt="" />
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
        <span>Desconectar</span>
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

    isUserLoggedIn() {
      const authStore = useAuthStore()
      return !!authStore.user // Verifica se o usuário está logado
    }
  },

  methods: {
    redirectToAccount() {
      if (this.isUserLoggedIn) {
        this.showDropdown = !this.showDropdown
      } else {
        this.$router.push('/account')
      }
    }
  }
}
</script>

<style scoped>
#header {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 1.2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: background-color 0.2s;
  position: relative;
}

#header:hover {
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
  padding-right: 70px;
  gap: 3px;
}

.dropdown {
  position: absolute;
  right: 0px;
  top: 150%;
  width: 140px;
  margin-right: 60px;

  display: grid;
  flex-direction: column;

  background-color: rgb(8, 58, 91);
  font-size: 1.1rem;
}
.dropdown > header > img {
  width: 140px;
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

.dropdown > body > span {
  padding: 2px;
}
.dropdown > body > span:hover {
  display: block;
  background-color: rgb(8, 98, 121);
}

.user-image {
  height: 4vh;
  border: 1px solid white;
  border-radius: 50px;
}
</style>
