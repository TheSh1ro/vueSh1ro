<script>
import { useAuthStore } from '../stores/store.js'

export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },

      placeholder: {
        login: 'Login',
        password: 'Senha',
        error: 0
      }
    }
  },
  methods: {
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
        this.placeholder.login = 'Insira uma senha'
        this.placeholder.error = 2
        return
      }

      authStore.login(username.toLowerCase(), password) // Assume que o usuário está autenticado
      this.$router.push('/elojob')
    }
  }
}
</script>

<template>
  <div id="main">
    <div class="login">
      <h2>Entrar</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username / Email</label>
          <input
            :placeholder="placeholder.login"
            type="text"
            id="username"
            v-model="formData.username"
            @input="restrictSpecialCharacters"
            :class="{ inputRed: placeholder.error == 1 }"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            :placeholder="placeholder.password"
            type="password"
            id="password"
            v-model="formData.password"
            @input="restrictSpecialCharacters"
            :class="{ inputRed: placeholder.error == 2 }"
          />
        </div>
        <button class="button-submit" type="submit">Done</button>
      </form>
      <button class="button-register">Criar conta</button>
    </div>
  </div>
</template>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  width: fit-content;
  height: fit-content;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 5vh;

  border: 10px double white;
  background-color: rgba(0, 170, 255, 0.2);
  text-align: center;
  border-radius: 15px;
  padding: 100px 75px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  text-align: center;
  margin-bottom: 10px;
}

label {
  display: block;
}

input {
  width: 100%;
  padding: 5px 6px;
  border: 1px solid #ccc;
  color: black;
  text-align: center;
  border-radius: 7px;
  transition: background-color 0.2s;
}

input:focus {
  padding: 5px 2px;
  background-color: transparent;
  color: white;
  font-weight: bold;
}

.button-register {
  position: absolute;
  bottom: 10px;
  right: 10px;

  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
.button-register:hover {
  color: lightblue;
  text-decoration: underline;
}

.button-submit {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  margin-top: 5px;
  cursor: pointer;
}

.inputRed {
  border: 1px solid red;
}
</style>
``
