<template>
  <main>
    <div class="content" :class="{ redBorder: error == 1 }">
      <div class="methods">
        <h2 class="methods-title">Forma de pagamento</h2>
        <button :class="{ selectedMethod: method.name == selectedMethod }" v-for="method in paymentMethods" :key="method" @click="selectedMethod = method.name">
          <img :src="method.image" alt="" />
          <p>{{ method.name }}</p>
        </button>
      </div>
      <div class="inputs">
        <h2 class="inputs-title">Informações da compra</h2>
        <input readonly class="readonly" type="text" v-model="user.username" />
        <div class="service">
          <input readonly class="readonly" type="text" :value="currentEloName + ' ao ' + targetEloName" />
          <img :src="currentElo.image" alt="" />
          <img :src="targetElo.image" alt="" />
        </div>
        <div class="group-info">
          <input readonly class="readonly" type="text" :value="'Fila ' + queue" />
          <input readonly class="readonly" type="text" :value="service" />
        </div>
        <input
          readonly
          class="readonly"
          type="text"
          :value="
            price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          "
        />
        <input readonly class="readonly" type="text" :value="'Prazo de ' + time + ' dias'" />
      </div>

      <div class="checkbox">
        <input type="checkbox" id="checkbox" v-model="checkbox" />
        <label for="checkbox" :class="{ redText: error.includes(1) }">Estou ciente de que jogar na conta na fila contratada (Solo/Duo ou Flexível) durante o andamento do serviço afetará o resultado final ou mesmo o prazo deste.</label>
      </div>
      <div class="formButtons">
        <button class="paymentButton" @click="handlePaymentCancel">Voltar</button>
        <button class="paymentButton" @click="handlePaymentConfirmation">Continuar</button>
      </div>
      <div class="promotion" v-if="showAll">Sem código de indicação</div>
    </div>

    <div class="content" v-if="showAll">
      <h2 class="others-title">Insira os dados</h2>
      <div class="refer">
        <input v-model="refer_code" type="text" placeholder="Código de indicação (opcional)" />
        <button title="Insira aqui o ID de algum amigo que te indicou o nosso site">?</button>
      </div>
      <div class="riot">
        <input type="text" placeholder="Digite aqui seu RIOT ID" v-model="riotid" @input="upperCase" :class="{ redText: error.includes(2) }" />
        <input type="text" v-model="riottag" @input="upperCase" :class="{ redText: error.includes(21) }" />
      </div>

      <input v-model="riot_login" type="text" placeholder="Riot Login" :class="{ redText: error.includes(3) }" />
      <input v-model="riot_password" type="text" placeholder="Riot Password" :class="{ redText: error.includes(4) }" />
      <textarea v-model="description_champion" type="text" placeholder="Preferências de campeão, escreva aqui (opcional), não obrigatóriamente será seguido pelo booster" />
      <textarea v-model="description_lane" type="text" placeholder="Preferências de rota, escreva aqui (opcional), não obrigatóriamente será seguido pelo booster" />
      <button class="paymentButton" @click="handlePaymentConfirmation">Confirmar</button>
    </div>
  </main>
</template>

<script>
import { useAuthStore, usePurchaseStore } from '../stores/store.js'
import axios from 'axios'

export default {
  data() {
    return {
      // Status da página
      previousPage: null,
      error: [],
      showAll: false,

      paymentMethods: [
        { name: 'Pix', image: '/assets/pix.png' },
        { name: 'Crédito', image: '/assets/credit.png' },
        { name: 'Débito', image: '/assets/debit.png' }
      ],

      selectedMethod: null,

      // AuthStore
      user: null,

      // PurchaseStore
      service: null,
      queue: null,
      currentElo: null,
      targetElo: null,
      price: null,
      time: null,

      // Formulários
      riotid: null,
      riottag: '#',
      checkbox: false,
      refer_code: null,
      riot_login: null,
      riot_password: null,
      description_lane: null,
      description_champion: null
    }
  },

  created() {
    this.selectedMethod = this.paymentMethods.length > 0 ? this.paymentMethods[0].name : null

    const authStore = useAuthStore()
    const purchaseStore = usePurchaseStore()

    this.previousPage = this.$route.query.service.toLowerCase()

    // Checa se os dados estão carregados, caso contrário volta para a home para evitar erros
    if (purchaseStore.purchase && authStore.user) {
      this.user = authStore.user

      this.service = purchaseStore.purchase.service
      this.queue = purchaseStore.purchase.queue
      this.currentElo = purchaseStore.purchase.currentElo
      this.targetElo = purchaseStore.purchase.targetElo
      this.price = purchaseStore.purchase.price
      this.time = purchaseStore.purchase.time
    } else {
      this.$router.push('/' + this.previousPage.toLowerCase())
    }
  },
  computed: {
    currentEloName() {
      const elo = this.currentElo
      return elo.isHigh ? elo.name : elo.name + ' ' + (elo.leagueIndex + 1)
    },

    targetEloName() {
      const elo = this.targetElo
      return elo.isHigh ? elo.name : elo.name + ' ' + (elo.leagueIndex + 1)
    },

    getRiotFullname() {
      return this.riotid ? this.riotid + this.riottag : null
    },

    username() {
      const authStore = useAuthStore()
      return authStore.user ? authStore.user.username : ''
    }
  },
  methods: {
    upperCase() {
      this.riottag ? (this.riottag = this.riottag.toUpperCase()) : undefined
      this.riotid ? (this.riotid = this.riotid.toUpperCase()) : undefined

      if (this.riottag[0] != '#') {
        this.riottag = '#'
      }
    },

    handlePaymentCancel() {
      // Limpar todas as seleções de elo feitas
      usePurchaseStore().clearPurchase()
      // Voltar para a página de escolha de elo
      this.$router.push('/' + this.previousPage)
    },

    handlePaymentConfirmation() {
      this.error = []

      if (!this.checkbox) {
        this.error.push(1)
      } else {
        this.showAll = true
      }

      if (!this.riotid) {
        this.error.push(2)
      }

      if (this.riottag == '#') {
        this.error.push(21)
      }

      if (!this.riot_login) {
        this.error.push(3)
      }

      if (!this.riot_password) {
        this.error.push(4)
      }

      // const dataToBackend = {}
      // axios
      //   .post('http://0.0.0.0:19003/servico/', dataToBackend)
      //   .then((response) => {})
      //   .catch((error) => {})
    }
  }
}
</script>

<style scoped>
* {
  transition:
    background-color 0.2s,
}

main {
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10vw;
  padding: 40px;
  row-gap: 40px;
}

.content {
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  padding: 30px;
  width: 350px;
  height: fit-content;
  justify-content: space-between;
  gap: 25px;
}

.content:last-child {
  gap: 10px;
}

.methods {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.methods-title {
  grid-column: 1 / 4;
  text-align: center;
}

.inputs-title,
.others-title {
  text-align: center;
}

.methods button {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 3px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid black;
  font-weight: bold;
}

.selectedMethod {
  background-color: black;
  color: white;
}

.methods img {
  height: 25px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
}

button {
  padding-block: 10px;
}

.paymentButton {
  background-color: black;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.paymentButton:hover {
  background-color: rgb(30, 30, 30);
}

.readonly {
  background-color: rgb(220, 220, 220);
  cursor: default;
}

.riot {
  display: flex;
  gap: 5px;
}

.riot input:first-child {
  flex-grow: 1;
}

.riot input:last-child {
  width: 3rem;
}

.service {
  display: flex;
  gap: 5px;
}

.service input {
  flex-grow: 1;
}

.service img {
  width: 2rem;
}

.group-info {
  display: flex;
  gap: 5px;
}

.group-info input {
  width: 100%;
}

.refer {
  display: flex;
  gap: 5px;
}

.refer input {
  flex-grow: 1;
}

.refer button {
  width: 2.5rem;
}

.formButtons {
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 15px;
}

.checkbox label {
  font-weight: bold;
}

.promotion {
  text-align: center;
  background-color: red;
  color: white;
  width: 100%;
  padding-block: 10px;
  align-self: end;
  cursor: default;
}

textarea {
  padding: 5px;
  min-height: 4rem;
  height: 100%;
}

.redBorder {
  border: 3px solid red;
}

.redText {
  color: red;
}

.redText::placeholder {
  color: red;
}
</style>
