<template>
  <div id="main">
    <div class="container">
      <h2 class="title-block">Criar conta</h2>
      <div class="input-block">
        <div class="input-item" :class="{ inputRed: placeholder.error.includes(1) }">
          <img src="../assets/people.png" alt="" />
          <input :placeholder="placeholder.fullname" type="text" id="fullname" v-model="formData.fullname" @keyup.enter="handleSubmit" />
        </div>
        <div class="input-item" :class="{ inputRed: placeholder.error.includes(3) }">
          <img src="../assets/people.png" alt="" />
          <input :placeholder="placeholder.email" type="text" id="email" v-model="formData.email" @input="restrictSpecialCharacters" @keyup.enter="handleSubmit" />
        </div>
        <div class="input-item" :class="{ inputRed: placeholder.error.includes(2) }">
          <img src="../assets/people.png" alt="" />
          <input :placeholder="placeholder.login" type="text" id="username" v-model="formData.username" @input="restrictSpecialCharacters" @keyup.enter="handleSubmit" />
        </div>
        <div class="input-item" :class="{ inputRed: placeholder.error.includes(4) }">
          <img src="../assets/padlock.png" alt="" />
          <input :placeholder="placeholder.senha" :type="showPassword ? 'text' : 'password'" id="password" v-model="formData.password" @input="restrictSpecialCharacters" @keyup.enter="handleSubmit" />
          <img src="../assets/visual.png" style="cursor: pointer" @click="togglePasswordVisibility" />
        </div>
      </div>
      <RouterLink class="alternate" to="login">Fazer login</RouterLink>
      <button class="button" @click="handleSubmit">Continuar</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/store.js'

export default {
  data() {
    return {
      showPassword: false,

      formData: {
        username: '',
        password: '',
        email: '',
        fullname: ''
      },

      placeholder: {
        login: 'Usuário',
        senha: 'Senha',
        email: 'E-mail',
        fullname: 'Nome completo',
        error: []
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
      this.placeholder.error = []

      const authStore = useAuthStore()
      const username = this.formData.username
      const password = this.formData.password
      const email = this.formData.email
      const fullname = this.formData.fullname

      if (fullname.length < 3) {
        this.placeholder.fullname = 'Insira seu nome completo'
        this.placeholder.error.push(1)
      }

      if (username.length < 3) {
        this.placeholder.login = 'Insira um login'
        this.placeholder.error.push(2)
      }

      if (email.length < 3) {
        this.placeholder.email = 'Insira um login'
        this.placeholder.error.push(3)
      }

      if (password.length < 3) {
        this.placeholder.senha = 'Insira uma senha'
        this.placeholder.error.push(4)
      }

      if (this.placeholder.error) {
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

  display: flex;
  justify-content: center;
}

.container {
  background-color: white;
  color: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: fit-content;
  padding: 50px;
  margin-top: 20px;
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

.input-item {
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
