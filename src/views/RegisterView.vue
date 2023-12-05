<template>
  <main id="main">
    <div class="container">
      <h2>Login</h2>
      <div class="input-row">
        <input ref="username" id="username" v-model="username" type="text" placeholder="Insira um usuário" @input="restrictSpecialCharacters" />
        <img class="input-icon" style="left: 12px" src="/assets/people.png" alt="Imagem de login" />
      </div>
      <div class="input-row">
        <input ref="email" id="email" v-model="email" type="text" placeholder="Insira um email existente" @input="restrictSpaceCharacter" />
        <img class="input-icon" style="left: 12px" src="/assets/people.png" alt="Imagem de login" />
      </div>
      <div class="input-row">
        <input ref="password" id="password" v-model="password" :type="passwordInputType" placeholder="Insira uma senha" @input="restrictSpaceCharacter" />
        <img class="input-icon" style="left: 12px" src="/assets/padlock.png" alt="Cadeado de senha" />
        <img class="input-icon" style="right: 12px; cursor: pointer" src="/assets/visual.png" alt="Botão de mostrar senha" @click="togglePasswordVisibility" />
      </div>
      <RouterLink class="router" to="/login">Entrar</RouterLink>

      <button @click="handleRegisterSubmit">Confirmar cadastro</button>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      // password input status ( text / password ) to change pwd visibility
      passwordInputType: 'text',

      // new user data
      username: null,
      password: null,
      email: null
    }
  },
  created() {},
  computed: {},
  methods: {
    restrictSpecialCharacters(event) {
      const input = event.target
      input.value = input.value.toLowerCase().replace(/[^\w\d]/gi, '')
    },
    restrictSpaceCharacter(event) {
      const input = event.target
      input.value = input.value.replace(/\s/g, '')
    },

    togglePasswordVisibility() {
      this.passwordInputType = this.passwordInputType === 'text' ? 'password' : 'text'
    },

    handleRegisterSubmit() {
      const authStore = useAuthStore()

      this.resetFieldClasses()
      this.hasInvalidField = false

      const username = this.username
      const password = this.password
      const email = this.email

      if (!username || username.length < 5) {
        this.hasInvalidField = true
        this.$refs.username.classList.add('invalid-field')
      }

      if (!email || email.length < 12) {
        this.hasInvalidField = true
        this.$refs.email.classList.add('invalid-field')
      }

      if (!password || password.length < 5) {
        this.hasInvalidField = true
        this.$refs.password.classList.add('invalid-field')
      }

      if (this.hasInvalidField) return

      window.alert('Usuário criado com sucesso!')

      this.$router.push('/login')
    },

    resetFieldClasses() {
      Object.keys(this.$refs).forEach((ref) => {
        if (this.$refs[ref].classList) {
          this.$refs[ref].classList.remove('invalid-field')
        }
      })
    }
  }
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);
  padding-bottom: 20vh;
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  padding: 30px;
  border-radius: 5px;
  gap: 8px;
  background-color: white;
  color: rgb(80, 145, 225);
  text-align: center;
}

h2 {
  margin-bottom: 15px;
  user-select: none;
}

.input-row {
  position: relative;
  display: flex;
  align-items: center;
}

input {
  padding: 12px;
  padding-inline: 40px;
  color: black;
  border-radius: 10px;
  background-color: rgb(205, 205, 205);
  border: none;
  outline: none;
}

.input-icon {
  position: absolute;
  width: 15px;
}

.router {
  cursor: pointer;
  user-select: none;
  margin-top: 5px;
}
.router:hover {
  color: black;
}

button {
  margin-top: 15px;
  padding: 8px;
  background-color: rgb(80, 145, 225);
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
}
button:hover {
  background-color: rgb(40, 65, 205);
}

.invalid-field {
  color: darkred;
}
.invalid-field::placeholder {
  color: darkred;
}
</style>
