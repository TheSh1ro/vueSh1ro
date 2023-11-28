<template>
  <div id="main">
    <div class="container">
      <h2 class="title-block">Acesse sua conta</h2>
      <div class="input-block">
        <div class="input-user" :class="{ inputRed: placeholder.error == 1 }">
          <img src="../assets/people.png" alt="" />
          <input
            :placeholder="placeholder.login"
            type="text"
            id="username"
            v-model="formData.username"
            @input="restrictSpecialCharacters"
            @keyup.enter="handleSubmit"
          />
        </div>
        <div class="input-password" :class="{ inputRed: placeholder.error == 2 }">
          <img src="../assets/padlock.png" alt="" />
          <input
            :placeholder="placeholder.senha"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="formData.password"
            @input="restrictSpecialCharacters"
            @keyup.enter="handleSubmit"
          />
          <img
            src="../assets/visual.png"
            style="cursor: pointer"
            @click="togglePasswordVisibility"
            alt=""
          />
        </div>
      </div>
      <RouterLink class="alternate" to="register">Registrar-se</RouterLink>
      <button class="button" @click="handleSubmit">Entrar</button>
    </div>
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
        login: 'Usuário',
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

    handleSubmit() {
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
  background-color: white;
  color: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 50px;
  gap: 30px;
}

h2 {
  color: rgb(0, 160, 255);
  padding-block: 15px;
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
  background-color: rgb(205, 205, 205);
  flex-grow: 1;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 10px;
}

input {
  background-color: rgb(205, 205, 205);
  padding: 10px;
  border: none;
  width: 100%;
  border: none;
  min-width: 200px;
  border-radius: 10px;
}

input:focus {
  outline: none;
}

img {
  height: 16px;
  padding: 10px;
}

.alternate {
  text-decoration: underline;
}

.button {
  background-color: rgb(0, 160, 215);
  color: white;
  padding: 12px 20px;
  width: 100%;
  border: none;
  cursor: pointer;
}

.button:hover {
  background: none;
  background-color: rgb(0, 120, 175);
}

.inputRed {
  border: 1px solid red;
}
</style>
``
