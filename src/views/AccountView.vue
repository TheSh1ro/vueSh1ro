<template>
  <main>
    <div class="container">
      <nav class="sidebar">
        <span @click="selected = 1" class="sidebar-item" :class="{ selected: selected == 1 }"
          >Perfil</span
        >
        <span @click="selected = 2" class="sidebar-item" :class="{ selected: selected == 2 }"
          >Minhas compras</span
        >
      </nav>
      <div class="content">
        <div class="group">
          <h2>Usuário</h2>
          <input class="readonly" readonly type="text" v-model="user.username" />
        </div>
        <div class="group">
          <h2>Nome completo</h2>
          <input type="text" placeholder="Texto" />
        </div>
        <div class="group">
          <h2>E-mail</h2>
          <input type="text" placeholder="Texto" />
        </div>
        <div class="group">
          <h2>Senha</h2>
          <input readonly type="text" value="**************" />
        </div>
        <button>Mudar senha</button>
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

    authStore.user ? (this.user = authStore.user) : this.$router.push('/')
  },
  computed: {},
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

.sidebar {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.sidebar-item {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.sidebar-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.selected {
  background-color: rgba(255, 255, 255, 0.2);
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  gap: 20px;
  margin: auto;
  background-color: white;
  color: black;
  padding: 30px;
}

input {
  border: none;
  color: white;
  width: 250px;
  padding: 10px;
  background-color: black;
  text-align: center;
}

input::placeholder {
  color: white;
}

button {
  width: 100%;
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: rgba(0, 0, 255, 0.831);
}

.content .group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}
</style>
