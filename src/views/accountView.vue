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
    login() {
      const authStore = useAuthStore()

      if (this.formData.username.length < 3) {
        this.placeholder.login = 'Insira um login'
        this.placeholder.error = 1
        return
      }

      if (!this.formData.password) {
        this.placeholder.login = 'Insira uma senha'
        this.placeholder.error = 2
        return
      }

      authStore.login(this.formData.username) // Assume que o usuário está autenticado
      this.$router.push('/elojob')
    }
  }
}
</script>

<template>
  <div id="main">
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            :placeholder="placeholder.login"
            type="text"
            id="username"
            v-model="formData.username"
            :class="{ inputRed: placeholder.error == 1 }"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            :placeholder="placeholder.password"
            type="password"
            id="password"
            v-model="formData.password"
            :class="{ inputRed: placeholder.error == 2 }"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  padding: 40px;
}

.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
}

input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: black;
  text-align: center;
  border-radius: 7px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
}

.inputRed {
  border: 1px solid red;
}
</style>
``
