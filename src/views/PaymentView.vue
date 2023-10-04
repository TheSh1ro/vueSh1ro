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
        <button class="button" @click="handlePaymentConfirmation">Confirmar</button>
        <button class="button" @click="handlePaymentCancel">Cancelar</button>
      </div>
      <div class="content-block username-block">Não comprar como {{ username }}?</div>
    </div>
  </div>
</template>

<script>
import { useAuthStore, usePurchaseStore } from '../stores/store.js'

export default {
  data() {
    return {
      totalPrice: null,
      currentEloName: null,
      currentEloImage: null,
      targetEloName: null,
      targetEloImage: null,
      deadline: null,

      previousPage: null,
      service: null
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
          date: new Date(),
          deadline: this.deadline,
          deadlineDate: deadlineDate,
          currentEloName: this.currentEloName,
          targetEloName: this.targetEloName,
          totalPrice: this.totalPrice
        }

        console.log(dataToBackend)

        // axios
        //   .post('/sua-rota-backend', dataToBackend)
        //   .then((response) => {
        //   })
        //   .catch((error) => {
        //   })
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
    background-color 0.5s,
    color 0.5s;
}

#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.content {
  margin: 20px 40px;
  display: grid;
  padding: 40px 65px;
  margin: 20px;
  gap: 30px;

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

  gap: 10px;
  flex-grow: 1;
}
.method-block > h1 {
  color: rgb(100, 192, 229);
  text-decoration: underline;
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
  gap: 10px;
}
.button {
  color: black;
  padding: 5px 10px;
  border: 5px double black;
  border-radius: 7px;
  cursor: pointer;
  background-color: rgb(86, 158, 230);
}
.button:hover {
  background-color: rgba(86, 158, 230, 0.641);
}
.username-block {
  cursor: pointer;
  text-decoration: underline;
}
.username-block:hover {
  color: rgb(231, 231, 178);
}
</style>
