<template>
  <main>
    <h2>Insira os dados</h2>
    <div class="refer">
      <input type="text" placeholder="Código de referência (opcional)" v-model="refer_code" />
      <button title="Insira aqui um código de referência ou promoção para ganhar um desconto no custo do serviço">?</button>
    </div>
    <div class="riot">
      <input ref="riot_id" class="riot-id" type="text" placeholder="Digite seu Riot ID" v-model="riot_id" />
      <input ref="riot_tag" class="riot-tag" type="text" placeholder="#" v-model="riot_tag" />
    </div>
    <input ref="riot_login" type="text" placeholder="Digite seu usuário da Riot" v-model="riot_login" />
    <input ref="riot_password" type="text" placeholder="Digite sua senha da Riot" v-model="riot_password" />
    <textarea
      name="champion"
      id="champion"
      rows="3"
      v-model="description"
      placeholder="Fale sobre suas preferências (opcional), lembrando que a ShiroJobs não trabalha com campeões ou rotas específicas a menos que haja um combinado prévio, para isso utilize o chat 24h ou envie um e-mail. Ainda assim deixe alguma informação e então o booster seguirá na medida do possível"
    ></textarea>
    <button class="confirm-btn" @click="handleSubmit" style="padding-block: 8px">Confirmar</button>
  </main>
</template>

<script>
// import { useAuthStore, usePurchaseStore } from '../stores/store.js'

export default {
  props: ['handleSubmitForm'],
  data() {
    return {
      // component form
      riot_id: null,
      riot_tag: '#',
      riot_login: null,
      riot_password: null,
      refer_code: null,
      description: null,

      // caso algum campo esteja com um dado inválido
      hasInvalidField: false
    }
  },
  methods: {
    handleSubmit() {
      // Resetar as classes dos campos e hasInvalidField antes de verificar novamente
      this.resetFieldClasses()
      this.hasInvalidField = false

      if (!this.riot_id || this.riot_id.trim().length < 3) {
        this.setFieldClass('riot_id')
        this.hasInvalidField = true
      }

      if (!this.riot_tag || this.riot_tag.trim().length < 4) {
        this.setFieldClass('riot_tag')
        this.hasInvalidField = true
      }

      if (!this.riot_login || this.riot_login.trim().length < 3) {
        this.setFieldClass('riot_login')
        this.hasInvalidField = true
      }

      if (!this.riot_password || this.riot_password.trim().length < 6) {
        this.setFieldClass('riot_password')
        this.hasInvalidField = true
      }

      if (this.hasInvalidField) return

      this.handleSubmitForm(this.riot_id, this.riot_tag, this.riot_login, this.riot_password, this.refer_code, this.description)
    },

    resetFieldClasses() {
      Object.keys(this.$refs).forEach((ref) => {
        if (this.$refs[ref].classList) {
          this.$refs[ref].classList.remove('invalid-field')
        }
      })
    },

    setFieldClass(fieldName) {
      if (this.$refs[fieldName]) {
        this.$refs[fieldName].classList.add('invalid-field')
      }
    }
  },
  watch: {
    refer_code(newValue) {
      if (this.refer_code) this.refer_code = newValue.toUpperCase().replace(/[^\w\d]/gi, '')
    },
    riot_id(newValue) {
      if (this.riot_id) this.riot_id = newValue.toUpperCase().replace(/[^\w\d\s]/gi, '')
    },
    riot_tag(newValue) {
      if (this.riot_tag) {
        this.riot_tag = newValue.toUpperCase().replace(/[^\w\d]/gi, '')
        if (this.riot_tag[0] !== '#') {
          this.riot_tag = '#' + this.riot_tag
        }
      }
    }
  }
}
</script>

<style scoped>
* {
  user-select: none;
}

main {
  background-color: white;
  color: black;
  text-align: center;

  display: flex;
  flex-direction: column;

  width: 290px;
  min-height: 420px;
  border-radius: 5px;
  padding: 20px 30px;

  gap: 15px;
}

input,
textarea {
  padding: 7px;
  border: 1px solid black;
  border-radius: 3px;
}

textarea {
  flex-grow: 1;
}

button {
  border: 1px solid black;
  background-color: black;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background-color: darkblue;
  border-color: darkblue;
}

.refer,
.riot {
  display: flex;
  gap: 5px;
  width: 100%;
}

.refer input {
  flex-grow: 1;
}

.refer button {
  width: 35px;
}

.riot-id {
  flex-grow: 1;
}

.riot-tag {
  width: 54px;
}

.invalid-field {
  color: red;
}

.invalid-field::placeholder {
  color: red;
}
</style>
