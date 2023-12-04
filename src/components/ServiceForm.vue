<template>
  <main>
    <h2>Insira os dados</h2>
    <div class="refer">
      <input type="text" placeholder="Código de referência (opcional)" />
      <button title="Insira aqui um código de referência ou promoção para ganhar um desconto no custo do serviço">?</button>
    </div>
    <div class="riot">
      <input class="riot-id" type="text" placeholder="Digite seu Riot ID" v-model="riot_id" />
      <input class="riot-tag" type="text" v-model="riot_tag" />
    </div>
    <input type="text" placeholder="Digite seu usuário da Riot" v-model="riot_login" />
    <input type="text" placeholder="Digite sua senha da Riot" v-model="riot_password" />
    <textarea name="champion" id="champion" rows="3" v-model="description" placeholder="Fale sobre suas preferências (opcional)"></textarea>
    <button class="confirm-btn" @click="handleConfirm" style="padding-block: 8px">Confirmar</button>
  </main>
</template>

<script>
// import { useAuthStore, usePurchaseStore } from '../stores/store.js'

export default {
  data() {
    return {
      // component form
      riot_id: null,
      riot_tag: '#',
      riot_login: null,
      riot_password: null,
      refer_code: null,
      description: null
    }
  },
  created() {},
  computed: {
    computed: {}
  },
  methods: {
    upperCase() {
      this.riottag ? (this.riottag = this.riottag.toUpperCase()) : undefined
      this.riotid ? (this.riotid = this.riotid.toUpperCase()) : undefined

      if (this.riottag[0] != '#') {
        this.riottag[0] = '#'
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
