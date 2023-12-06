<template>
  <main id="main">
    <div class="container">
      <h2>Criar conta</h2>
      <div class="block">
        <div class="input-row">
          <input ref="fullname" id="fullname" v-model="fullname" type="text" placeholder="Nome completo" @input="restrictNoLetters" />
          <img class="input-icon" style="left: 12px" src="/assets/people.png" alt="Imagem de login" />
        </div>
        <div class="input-row">
          <input ref="username" id="username" v-model="username" type="text" placeholder="Crie um usuário" @input="restrictSpecialCharacters" />
          <img class="input-icon" style="left: 12px" src="/assets/people.png" alt="Imagem de login" />
        </div>
        <div class="input-row">
          <input ref="email" id="email" v-model="email" type="text" placeholder="Insira um email existente" @input="restrictSpaceCharacter" />
          <img class="input-icon" style="left: 12px" src="/assets/people.png" alt="Imagem de login" />
        </div>
        <div class="input-row">
          <input ref="password" id="password" v-model="password" :type="passwordInputType" placeholder="Crie uma senha" @input="restrictSpaceCharacter" />
          <img class="input-icon" style="left: 12px" src="/assets/padlock.png" alt="Cadeado de senha" />
          <img class="input-icon" style="right: 12px; cursor: pointer" src="/assets/visual.png" alt="Botão de mostrar senha" @click="togglePasswordVisibility" />
        </div>
        <RouterLink class="router" to="/login">Fazer login</RouterLink>
      </div>

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
      passwordInputType: 'password',

      // new user data
      fullname: null,
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
    restrictNoLetters(event) {
      const input = event.target
      input.value = input.value.replace(/[^\w\s]/gi, '')
      input.value = input.value.replace(/[!\d]/gi, '')
    },

    togglePasswordVisibility() {
      this.passwordInputType = this.passwordInputType === 'text' ? 'password' : 'text'
    },

    handleRegisterSubmit() {
      this.resetFieldClasses()
      this.hasInvalidField = false

      const fullname = this.fullname
      const username = this.username
      const password = this.password
      const email = this.email

      if (!fullname || fullname.length < 10) {
        this.hasInvalidField = true
        this.$refs.fullname.classList.add('invalid-field')
      }

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
