<script>
import { defineComponent } from 'vue'
import { useAuthStore } from '../stores/store.js'

export default defineComponent({
  name: 'AccountView',
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      const authStore = useAuthStore()
      // Aqui você pode realizar a verificação do login e senha, mas vamos apenas definir o usuário como autenticado
      authStore.login(this.formData.username) // Assume que o usuário está autenticado
      this.$router.push('/') // Redireciona para a página de sucesso
    }
  }
})
</script>

<template>
  <div id="main">
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <input placeholder="Login" type="text" id="username" v-model="formData.username" />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input placeholder="Senha" type="password" id="password" v-model="formData.password" />
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
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
``
