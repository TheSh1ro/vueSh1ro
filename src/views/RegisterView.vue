<template>
  <main id="main">
    <div class="container">
      <h2>Criar conta</h2>
      <div class="row">
        <input class="input-text" ref="fullname" id="fullname" v-model="fullname" type="text" placeholder="Nome completo" @input="restrictNoLetters" />
        <img class="input-icon" :style="{ left: inputSpace }" src="/assets/people.png" alt="Imagem de login" />
      </div>
      <div class="row">
        <input class="input-text" ref="username" id="username" v-model="username" type="text" placeholder="Crie um usuário" @input="restrictSpecialCharacters" />
        <img class="input-icon" :style="{ left: inputSpace }" src="/assets/people.png" alt="Imagem de login" />
      </div>
      <div class="row">
        <input class="input-text" ref="email" id="email" v-model="email" type="text" placeholder="Insira um email existente" @input="restrictSpaceCharacter" />
        <img class="input-icon" :style="{ left: inputSpace }" src="/assets/people.png" alt="Imagem de login" />
      </div>
      <div class="row">
        <input class="input-text" ref="password" id="password" v-model="password" :type="passwordInputType" placeholder="Crie uma senha" @input="restrictSpaceCharacter" />
        <img class="input-icon" :style="{ left: inputSpace }" src="/assets/padlock.png" alt="Cadeado de senha" />
        <img class="input-icon" style="right: 12px; cursor: pointer" src="/assets/visual.png" alt="Botão de mostrar senha" @click="togglePasswordVisibility" />
      </div>
      <button @click="handleRegisterSubmit">Confirmar cadastro</button>
      <RouterLink class="router" to="/login">Fazer login</RouterLink>
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
      inputSpace: '12px',

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
  justify-content: center;

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
  font-size: 0.9rem;
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
