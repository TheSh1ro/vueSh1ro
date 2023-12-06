<template>
  <main id="main">
    <div class="container" @keyup.enter="handleLoginSubmit">
      <h2>Login</h2>
      <div class="block">
        <div class="input-row">
          <input ref="username" id="username" v-model="username" type="text" placeholder="Insira seu usuário" @input="restrictSpecialCharacters" />
          <img class="input-icon" style="left: 12px" src="/assets/people.png" alt="Imagem de login" />
        </div>
        <div class="input-row">
          <input ref="password" id="password" v-model="password" :type="passwordInputType" placeholder="Insira sua senha" @input="restrictSpaceCharacter" />
          <img class="input-icon" style="left: 12px" src="/assets/padlock.png" alt="Cadeado de senha" />
          <img class="input-icon" style="right: 12px; cursor: pointer" src="/assets/visual.png" alt="Botão de mostrar senha" @click="togglePasswordVisibility" />
        </div>
        <RouterLink class="router" to="/register">Criar conta</RouterLink>
      </div>
      <button @click="handleLoginSubmit">Entrar</button>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      previousPath: null,

      // password input status ( text / password ) to change pwd visibility
      passwordInputType: 'password',

      // login form data
      username: null,
      password: null
    }
  },
  created() {
    this.previousPath = this.$route.query.previousPath
  },
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

    handleLoginSubmit() {
      const authStore = useAuthStore()

      this.resetFieldClasses()
      this.hasInvalidField = false

      const username = this.username
      const password = this.password
      const email = 'usuarioteste@gmail.com'
      const fullname = 'Garry A. Leeds'

      if (!username || username.length < 5) {
        this.hasInvalidField = true
        this.$refs.username.classList.add('invalid-field')
      }

      if (!password || password.length < 5) {
        this.hasInvalidField = true
        this.$refs.password.classList.add('invalid-field')
      }

      if (this.hasInvalidField) return

      authStore.login(username, password, email, fullname)

      if (this.previousPath) {
        this.$router.push(this.previousPath)
      } else {
        this.$router.push('/')
      }
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  border-radius: 10px;
  gap: 8px;
  background-color: white;
  color: rgb(80, 145, 225);
  text-align: center;
  height: fit-content;
  margin-bottom: 20vh;
}
.block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

h2 {
  margin-bottom: 25px;
  user-select: none;
}

.input-row {
  position: relative;
  display: flex;
  align-items: center;
}

input,
button {
  padding: 16px;
  font-size: 0.8rem;
}
input {
  width: 250px;
  padding-inline: 49px;
  color: black;
  border-radius: 10px;
  background-color: rgb(205, 205, 205);
  border: none;
  outline: none;
}

.input-icon {
  position: absolute;
  width: 20px;
}

.router {
  cursor: pointer;
  user-select: none;
  margin-block: 10px 20px;
  width: fit-content;
  align-self: center;
}

.router:hover {
  color: black;
}

button {
  margin-top: 15px;
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
