<template>
  <div id="main">
    <form class="container" @submit.prevent="login">
      <h2 class="title-block">Acesse sua conta</h2>
      <div class="input-block">
        <div class="input-user" :class="{ inputRed: placeholder.error == 1 }">
          <img src="../assets/usuario.png" alt="" />
          <input
            :placeholder=placeholder.login
            type="text"
            id="username"
            v-model="formData.username"
            @input="restrictSpecialCharacters"
          />
        </div>
        <div class="input-password" :class="{ inputRed: placeholder.error == 2 }">
          <img src="../assets/senha.png" alt="" />
          <input
            :placeholder="placeholder.senha"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="formData.password"
            @input="restrictSpecialCharacters"
          />
          <img
            src="../assets/olho.png"
            style="cursor: pointer"
            @click="togglePasswordVisibility"
            alt=""
          />
        </div>
      </div>
      <div class="button-block">
        <button type="submit">Entrar</button>
        <button>Registrar-se</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/store.js'

export default {
  data() {
    return {
      previousPath: null,
      showPassword: false,

      formData: {
        username: '',
        password: ''
      },

      placeholder: {
        login: 'Usuário ou e-mail',
        senha: 'Senha',
        error: 0
      }
    }
  },

  created() {
    this.previousPath = this.$route.query.currentPath
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },

    restrictSpecialCharacters(event) {
      const input = event.target
      input.value = input.value.replace(/[^\w.@]/gi, '')
    },

    login() {
      const authStore = useAuthStore()
      const username = this.formData.username
      const password = this.formData.password

      if (username.length < 3) {
        this.placeholder.login = 'Insira um login'
        this.placeholder.error = 1
        return
      }

      if (!password) {
        this.placeholder.senha = 'Insira uma senha'
        this.placeholder.error = 2
        return
      }

      authStore.login(username.toLowerCase(), password)

      if (this.previousPath != null) {
        this.$router.push(this.previousPath)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  border: 10px double rgb(0, 160, 255);
  background-color: white;
  color: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 30px;
  gap: 30px;
}

h2 {
  color: rgb(0, 160, 255);
  padding-block: 10px;
}

.input-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.input-user,
.input-password {
  position: relative;
  display: flex;
  align-items: center;
  background-color: rgb(235, 235, 235);
  flex-grow: 1;
  width: 100%;
  border: 1px solid transparent;
}

input {
  background-color: rgb(235, 235, 235);
  padding: 10px;
  border: none;
  width: 100%;
  border: none;
  min-width: 200px;
}

input:focus {
  outline: none;
}

img {
  height: 16px;
  padding: 10px;
}

span {
  position: absolute;
  right: 5px;
}

.button-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

button {
  color: white;
  border-radius: 10px;
  padding: 7px 25px;
  cursor: pointer;
  transition: color 0.2s;
  border: none;
}

button:nth-child(odd) {
  background: linear-gradient(45deg, rgba(9, 98, 121, 1) 30%, rgba(0, 212, 255, 1) 100%);
}
button:nth-child(even) {
  background: linear-gradient(45deg, rgba(150, 150, 150, 1) 0%, rgba(35, 35, 35, 1) 100%);
}

button:hover {
  color: black;
}

.inputRed {
  border: 1px solid red;
}
</style>
``
