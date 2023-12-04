<template>
  <main>
    <h2>Insira os dados</h2>
    <div class="refer">
      <input type="text" placeholder="Código de referência (opcional)" v-model="refer_code" />
      <button title="Insira aqui um código de referência ou promoção para ganhar um desconto no custo do serviço">?</button>
    </div>
    <div class="riot">
      <input class="riot-id" type="text" placeholder="Digite seu Riot ID" v-model="riot_id" />
      <input class="riot-tag" type="text" v-model="riot_tag" />
    </div>
    <input type="text" placeholder="Digite seu usuário da Riot" v-model="riot_login" />
    <input type="text" placeholder="Digite sua senha da Riot" v-model="riot_password" />
    <textarea
      name="champion"
      id="champion"
      rows="3"
      v-model="description"
      placeholder="Fale sobre suas preferências (opcional), lembrando que a ShiroJobs não trabalha com campeões ou rotas específicas a menos que haja um combinado prévio, para isso utilize o chat 24h ou envie um e-mail. Ainda assim deixe alguma informação e então o booster seguirá na medida do possível"
    ></textarea>
    <button class="confirm-btn" @click="handleConfirm" style="padding-block: 8px">Confirmar</button>
  </main>
</template>

<script>
// import { useAuthStore, usePurchaseStore } from '../stores/store.js'

export default {
  data() {
    return {
      // component form
      riot_id: '',
      riot_tag: '#',
      riot_login: null,
      riot_password: null,
      refer_code: null,
      description: null
    }
  },
  methods: {},
  watch: {
    refer_code(newValue) {
      if (this.refer_code) this.refer_code = newValue.toUpperCase()
    },
    riot_id(newValue) {
      if (this.riot_id) this.riot_id = newValue.toUpperCase()
    },
    riot_tag(newValue) {
      if (this.riot_tag) {
        this.riot_tag = newValue.toUpperCase()
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

  width: 320px;
  border-radius: 3px;
  padding: 20px 30px;

  gap: 15px;
}

input {
  padding: 7px;
  border: 1px solid black;
  border-radius: 3px;
}

textarea {
  padding: 7px;
  border: 1px solid black;
  border-radius: 3px;
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

.refer {
  display: flex;
  gap: 5px;
}
.refer input {
  flex-grow: 1;
}
.refer button {
  width: 35px;
}

.riot {
  display: flex;
  gap: 5px;
  width: 100%;
}
.riot-id {
  flex-grow: 1;
}
.riot-tag {
  width: 54px;
}
</style>
