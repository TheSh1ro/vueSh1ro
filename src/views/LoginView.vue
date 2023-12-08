<template>
  <main id="main">
    <div class="container" @keyup.enter="handleLoginSubmit">
      <h2>Login</h2>
      <div class="row">
        <input class="input-text" ref="username" id="username" v-model="username" type="text" placeholder="Insira seu usuário" @input="restrictSpecialCharacters" />
        <img class="input-icon" :style="{ left: inputSpace }" src="/assets/people.png" alt="Imagem de login" />
      </div>
      <div class="row">
        <input class="input-text" ref="password" id="password" v-model="password" :type="passwordInputType" placeholder="Insira sua senha" @input="restrictSpaceCharacter" />
        <img class="input-icon" :style="{ left: inputSpace }" src="/assets/padlock.png" alt="Cadeado de senha" />
        <img class="input-icon input-eye" :style="{ right: inputSpace }" src="/assets/visual.png" alt="Botão de mostrar senha" @click="togglePasswordVisibility" />
      </div>
      <div class="others-row">
        <div class="checkbox">
          <input id="remember" v-model="rememberPassword" type="checkbox" />
          <label for="remember">Lembrar senha</label>
        </div>
        <p>Esqueci a senha</p>
      </div>
      <button @click="handleLoginSubmit">Entrar</button>
      <RouterLink class="router" to="/register">Não possui uma conta? Registre-se</RouterLink>
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
      inputSpace: '12px',
      rememberPassword: true,

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
  display: grid;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.8);
}

.container {
  background-color: white;
  color: rgb(60, 155, 220);

  display: flex;
  flex-direction: column;

  width: fit-content;
  height: fit-content;

  margin-inline: 5vw;
  padding: 30px;
  gap: 15px;

  border-radius: 15px;
  border: 1px solid white;
}

h2 {
  text-align: center;
  margin-block: 15px;
}

.row {
  display: flex;
  align-items: center;
  position: relative;
}
.others-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.checkbox {
  display: flex;
  align-items: center;
}
.checkbox > * {
  cursor: pointer;
}
label {
  padding-left: 8px;
}
.others-row > p {
  cursor: pointer;
}

.input-text,
button {
  padding-inline: 38px;
  padding-block: 15px;
  border-radius: 12px;
}
.input-icon {
  position: absolute;
  width: 16px;
}

.input-text {
  width: 100%;
  background-color: transparent;

  color: black;
  outline: none;
  border: none;
  height: 12px;
  background-color: rgb(220, 220, 220);
}

.input-eye {
  cursor: pointer;
}

.router {
  cursor: pointer;
  text-align: center;
}

.container p:hover,
.container label:hover,
.router:hover {
  color: black;
}

button {
  background-color: rgb(60, 155, 220);
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: rgb(30, 125, 190);
}

.invalid-field {
  color: rgb(190, 0, 0);
  outline: 1px solid rgb(190, 0, 0);
}

.invalid-field::placeholder {
  color: rgb(190, 0, 0);
}
</style>
