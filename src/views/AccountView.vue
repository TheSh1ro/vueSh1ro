<template>
  <main>
    <div class="container">
      <nav class="topbar">
        <span @click="selected = 1" class="topbar-item" :class="{ selected: selected == 1 }">Perfil</span>
        <span @click="selected = 2" class="topbar-item" :class="{ selected: selected == 2 }">Minhas compras</span>
      </nav>
      <div class="content">
        <div class="profile">
          <div class="block">
            <h3>Usuário:</h3>
            <input readonly class="readonly" type="text" v-model="user.username" v-if="user" />
          </div>
          <div class="block">
            <h3>Nome completo:</h3>
            <input readonly class="readonly" type="text" placeholder="Texto" v-model="user.fullname" />
          </div>
          <div class="block">
            <h3>E-mail:</h3>
            <input readonly class="readonly" type="text" placeholder="Texto" v-model="user.email" />
          </div>
          <div class="block">
            <h3>Senha:</h3>
            <input readonly class="readonly" type="text" value="**************" />
          </div>
          <div class="block">
            <h3>Confirmar senha:</h3>
            <input readonly class="readonly" type="text" value="**************" />
          </div>
          <div class="block">
            <h3>Data de nascimento:</h3>
            <input readonly class="readonly" type="text" value="20/11/2003" />
          </div>
          <button>Salvar mudança</button>
        </div>
        <div class="historic">
          <h2>Compras</h2>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from '../stores/store.js'

export default {
  data() {
    return {
      selected: 1,

      user: null
    }
  },
  created() {
    const authStore = useAuthStore()

    authStore.user ? (this.user = authStore.user) : this.$router.push('/login')
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated) {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    isAuthenticated() {
      return useAuthStore().isAuthenticated
    }
  },
  methods: {}
}
</script>

<style scoped>
main {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: grid;
  grid-template-rows: 3rem 1fr;
  background-color: rgba(255, 255, 255, 0.1);
  height: 100%;
  width: 100%;
  border: 1px solid white;
}

.topbar {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.topbar-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.topbar-item:last-child {
  background-color: rgba(255, 255, 255, 0.2);
}

.historic {
  background-color: rgba(255, 255, 255, 0.2);
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile,
.historic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
}

input {
  border: none;
  color: white;
  width: 250px;
  padding: 10px;
  background-color: transparent;
  color: yellow;
}

input::placeholder {
  color: white;
}
.block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

button {
  align-self: center;
  margin-top: 20px;
  width: 70%;
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: rgba(0, 0, 255, 0.831);
}

h3 {
  text-align: end;
}
</style>
