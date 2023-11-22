<template>
  <main>
    <div class="content">
      <div class="methods">
        <h2 class="methods-title">Forma de pagamento</h2>
        <button
          :class="{ selectedMethod: method.name == selectedMethod }"
          v-for="method in paymentMethods"
          :key="method"
          @click="selectedMethod = method.name"
        >
          <img :src="method.image" alt="" />
          <p>{{ method.name }}</p>
        </button>
      </div>
      <div class="inputs">
        <h2 class="inputs-title">Informações do serviço</h2>
        <input readonly class="readonly" type="text" :value="user.name" />

        <div class="riot">
          <input
            type="text"
            placeholder="Digite aqui seu RIOT ID"
            v-model="riotid"
            @input="upperCase"
          />
          <input type="text" v-model="riottag" @input="preventHashRemoval" />
        </div>
        <div class="service">
          <input
            readonly
            class="readonly"
            type="text"
            :value="currentEloName + ' ao ' + targetEloName"
          />
          <img :src="currentEloImage" alt="" />
          <img :src="targetEloImage" alt="" />
        </div>
        <input readonly class="readonly" type="text" :value="'Fila ' + getQueue" />
        <input readonly class="readonly" type="text" :value="serviceType" />
        <input
          readonly
          class="readonly"
          type="text"
          :value="
            totalPrice.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          "
        />
        <div class="checkbox">
          <input type="checkbox" id="checkbox" />
          <label for="checkbox"
            >Estou ciente de que jogar na conta na fila contratada (Solo/Duo ou Flexível) durante o
            andamento do serviço afetará o resultado final ou mesmo o prazo deste.</label
          >
        </div>
        <h2 class="others-title">Opcional</h2>
        <input type="text" placeholder="Cupom promocional" />
        <div class="refer">
          <input type="text" placeholder="ID de indicação" />
          <button title="Insira aqui o ID de algum amigo que te indicou o nosso site">?</button>
        </div>
        <div class="formButtons">
          <button class="paymentButton" @click="handlePaymentCancel">Voltar</button>
          <button class="paymentButton" @click="handlePaymentConfirmation">Confirmar</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore, usePurchaseStore } from '../stores/store.js'
import axios from 'axios'

export default {
  data() {
    return {
      riotid: null,
      riottag: '#BR1',
      paymentMethods: [
        { name: 'Pix', image: '/assets/pix.png' },
        { name: 'Crédito', image: '/assets/credit.png' },
        { name: 'Débito', image: '/assets/debit.png' }
      ],
      selectedMethod: null,
      user: { name: 'Gabriel Monteiro de Albuquerque' },

      serviceQueue: 0,
      serviceType: null,
      totalPrice: null,
      currentName: null,
      currentImage: null,
      targetName: null,
      targetImage: null,
      deadline: null,

      previousPage: null
    }
  },

  created() {
    this.selectedMethod = this.paymentMethods.length > 0 ? this.paymentMethods[0].name : null

    const purchaseStore = usePurchaseStore()
    this.previousPage = this.$route.query.service

    // Checa se os dados estão carregados, caso contrário volta para a home para evitar erros
    if (purchaseStore.purchase) {
      this.serviceType = purchaseStore.purchase.serviceType
      this.totalPrice = purchaseStore.purchase.totalPrice
      this.currentEloName = purchaseStore.purchase.currentEloName
      this.currentEloImage = purchaseStore.purchase.currentEloImage
      this.targetEloName = purchaseStore.purchase.targetEloName
      this.targetEloImage = purchaseStore.purchase.targetEloImage
      this.deadline = purchaseStore.purchase.deadline
    } else {
      this.$router.push('/' + this.previousPage)
    }
  },
  computed: {
    getQueue() {
      return this.serviceQueue ? 'ranqueada solo/duo' : 'ranqueada flexível'
    },

    username() {
      const authStore = useAuthStore()
      return authStore.user ? authStore.user.username : ''
    },

    isAuthenticated() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    }
  },
  methods: {
    upperCase() {
      this.riotid = this.riotid.toUpperCase()
      this.riottag = this.riottag.toUpperCase()
    },

    preventHashRemoval(event) {
      this.upperCase(event)

      if (!this.riottag.includes('#')) {
        this.riottag = '#'
      }
    },

    handlePaymentConfirmation() {
      if (!this.isAuthenticated) {
        this.$router.push({
          path: '/account',
          query: { currentPath: this.$route.fullPath }
        })
      } else {
        const deadlineDate = new Date()
        deadlineDate.setDate(deadlineDate.getDate() + parseInt(this.deadline))

        const dataToBackend = {
          user: 1, // Defina o ID do usuário apropriado
          purchase_date: new Date().toISOString(),
          deadline: deadlineDate.toISOString(),
          completed: false,
          price: parseFloat(this.totalPrice), // Certifique-se de que o preço seja um número
          modalidade: 1, // Defina o ID da modalidade apropriada
          fila: 1, // Defina o ID da fila apropriada
          elo_inicial: 1, // Defina o ID do elo inicial apropriado
          elo_final: 2 // Defina o ID do elo final apropriado
        }

        console.log(dataToBackend)

        axios
          .post('http://0.0.0.0:19003/servico/', dataToBackend)
          .then((response) => {})
          .catch((error) => {})
      }
    },

    handlePaymentCancel() {
      const purchaseStore = usePurchaseStore()
      purchaseStore.clearPurchase()
      this.$router.push('/' + this.previousPage)
    }
  }
}
</script>

<style scoped>
* {
  transition:
    background-color 0.2s,
    color 0s;
}

main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  padding: 40px;
}

.content {
  display: flex;
  flex-direction: column;

  background-color: white;
  color: black;

  padding: 30px;
  border-radius: 15px;
  width: 400px;

  margin: auto;
}

.methods {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 20px;
}

.methods-title {
  grid-column: 1 / 4;
  text-align: center;
}

.inputs-title {
  margin-top: 10px;
  text-align: center;
}

.others-title {
  margin-top: 10px;
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

.inputs > button {
  padding-block: 10px;
}

.paymentButton {
  background-color: black;
  color: white;
  font-size: 1rem;
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

.refer {
  display: flex;
  gap: 5px;
}

.refer input {
  flex-grow: 1;
}

.refer button {
  width: 2rem;
}

.formButtons {
  border-radius: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.formButtons button {
  padding: 8px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
  margin-inline: 5px;
}

.checkbox label {
  font-weight: bold;
}
</style>
