<template>
  <main>
    <div class="content">
      <div class="container">
        <div class="card">
          <h1>{{ serviceType }}</h1>
          <p @click="toggleServiceType">
            {{
              serviceType == 'Solo'
                ? 'Um dos nossos boosters irá jogar na sua conta de acordo com os dias que combinaremos após a compra. O progresso do serviço poderá ser acompanhado via discord ou outros meios de contato'
                : 'Tchau'
            }}
          </p>
        </div>
        <div class="card">
          <h1>Elo inicial</h1>
          <img :src="currentEloImage" alt="" />
          <h2>{{ currentEloName }}</h2>
        </div>
        <div class="card">
          <h1>Elo final</h1>
          <img :src="targetEloImage" alt="" />
          <h2>{{ targetEloName }}</h2>
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
      dataToBackend: {
        serviceType: null,
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
    toggleServiceType() {
      console.log('oi');
      this.serviceType = this.serviceType === 'Duo' ? 'Solo' : 'Duo'
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

  height: 100%;
  width: 100%;
}

.container {
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(auto-fit, 350px);
  grid-template-rows: repeat(auto-fit, 350px);

  height: 100%;
  width: 100%;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border: 3px solid rgb(0, 100, 100);
  border-radius: 15px;
  color: white;
  background-color: rgba(0, 100, 100, 0.5);
  cursor: pointer;
}

.card:hover {
  background-color: rgba(0, 100, 100, 0.2);
}

.card h1 {
  text-align: center;
  padding-block: 10px;
  border-bottom: 3px solid rgb(0, 100, 100);
  width: 100%;
  font-size: 2rem;
}

.card h2 {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.card p {
  text-align: center;
  margin: auto 20px;
  font-size: 1.2rem;
}

img {
  height: 150px;
}
</style>
