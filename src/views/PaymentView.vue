<template>
  <div id="main">
    <div class="content">
      <div class="content-block method-block">
        <h1>Confirmar compra</h1>
      </div>
      <div class="content-block elo-block">
        <span class="elo-block-item">
          <p>Inicial</p>
          <img :src="currentEloImage" alt="" />
          <p>{{ currentEloName }}</p>
        </span>
        <span class="elo-block-item">
          <p>Final</p>
          <img :src="targetEloImage" alt="" />
          <p>{{ targetEloName }}</p>
        </span>
      </div>
      <div class="content-block estimate-block">
        <p>Prazo de {{ previousPage }} estimado em {{ deadline }} dias</p>
        <p>
          pelo valor de
          <span style="color: rgb(200, 200, 60); font-weight: bold">R${{ totalPrice }}</span>
        </p>
      </div>
      <div class="content-block button-block">
        <button class="button" @click="handlePaymentCancel">Voltar</button>
        <button class="button" @click="handlePaymentConfirmation">Continuar</button>
      </div>
    </div>
    <div class="testcontainer">
      <p v-for="item in dataToBackend" :key="item">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore, usePurchaseStore } from '../stores/store.js'
import axios from 'axios'

export default {
  data() {
    return {
      dataToBackend: {
        totalPrice: null,
        currentName: null,
        currentImage: null,
        targetName: null,
        targetImage: null,
        deadline: null
      },

      previousPage: null
    }
  },

  created() {
    const purchaseStore = usePurchaseStore()
    this.previousPage = this.$route.query.service

    // Checa se os dados estão carregados, caso contrário volta para a home para evitar erros
    if (purchaseStore.purchase) {
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
    background-color 0.3s,
    color 0.5s;
}

#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
}

.content {
  margin: 20px 40px;
  display: grid;
  padding: 20px 35px;
  margin: 20px;
  gap: 40px;

  width: fit-content;
  height: fit-content;
  border: 10px double black;
  border-radius: 40px;
  background-color: rgb(29, 117, 151, 0.3);
}
.content-block {
  display: flex;
  justify-content: center;
  align-items: center;
}
.method-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-block: 20px;
}
.method-block > h1 {
  color: rgb(100, 192, 229);
}
.method-block > div {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  gap: 5px;
}
.method-block > div > span {
  cursor: pointer;
  padding: 5px;
}

.method-block > div > span:hover {
  color: cyan;
}

.elo-block {
  justify-content: space-evenly;
}
.elo-block-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.elo-block-item > img {
  height: 4rem;
}

.estimate-block {
  display: flex;
  flex-direction: column;
}

.button-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
}
.button {
  text-align: center;
  padding: 7px 25px;
  border-radius: 10px;
  border: 3px double black;
  background-color: rgb(29, 117, 151, 0.6);
  cursor: pointer;
}
.button:nth-child(even):hover {
  background-color: rgb(29, 117, 151, 0.4);
}
.button:nth-child(odd):hover {
  background-color: rgb(29, 117, 151, 0.4);
}
</style>
