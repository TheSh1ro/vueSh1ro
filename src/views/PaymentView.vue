<template>
  <main id="main">
    <div class="content" v-if="!sentOrder" key="default">
      <TransitionGroup name="form">
        <ServiceAbout
          key="about"
          :clearPurchaseStore="clearPurchaseStore"
          :goToPreviousPage="goToPreviousPage"
          :toggleVisibleForm="toggleVisibleForm"
          :visibleForm="visibleForm"
          :handleSelectMethod="handleSelectMethod"
          :selectedMethod="selectedMethod"
        />

        <ServiceForm key="form" v-if="visibleForm" class="container" :handleSubmitForm="handleSubmitForm" />
      </TransitionGroup>
    </div>
    <Transition name="status">
      <div class="confirmedSent" v-if="sentOrder" key="confirmed">
        <div class="text">
          <h1>Sua compra foi realizada com sucesso!</h1>
          <img src="/assets/checkmark.png" alt="Imagem de OK" />
        </div>
        <RouterLink to="/" class="button">Voltar para o início</RouterLink>
      </div>
    </Transition>
  </main>
</template>

<script>
import OrderService from '@/services/order'

import { useAuthStore, usePurchaseStore } from '../stores/store.js'
import ServiceAbout from '../components/ServiceAbout.vue'
import ServiceForm from '../components/ServiceForm.vue'
import axios from 'axios'

export default {
  components: { ServiceAbout, ServiceForm },
  data() {
    return {
      // from AuthStore
      user: null,

      // Last page absolute URL ( /elojob or /duojob )
      previousPage: null,

      // Component state
      visibleForm: false,
      sentOrder: false,

      // Component data [from service view]
      service: null,
      serviceId: null,
      queue: null,
      queueId: null,
      currentElo: null,
      targetElo: null,
      price: null,
      time: null,
      selectedMethod: null, // from ServiceAbout

      // Component data [from child form]
      riot_id: null, // from ServiceForm
      riot_tag: null, // from ServiceForm
      riot_login: null, // from ServiceForm
      riot_password: null, // from ServiceForm
      refer_code: null, // from ServiceForm
      description: null // from ServiceForm
    }
  },
  computed: {
    currentEloName() {
      const elo = this.currentElo
      if (elo == null) return 'Nome não disponível'
      return elo.isHigh ? elo.name : elo.name + ' ' + (elo.leagueIndex + 1)
    },

    targetEloName() {
      const elo = this.targetElo
      if (elo == null) return 'Nome não disponível'
      return elo.isHigh ? elo.name : elo.name + ' ' + (elo.leagueIndex + 1)
    },
    // Retorna status logado/deslogado do usuário
    isAuthenticated() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    }
  },
  watch: {
    isAuthenticated(newIsAuthenticated) {
      if (!newIsAuthenticated) {
        this.goToPreviousPage()
      }
    }
    // sentOrder(newSentOrder) {
    //   console.log('oi')
    //   if (newSentOrder === true) {
    //     setTimeout(() => {
    //       this.$router.push('/')
    //     }, 10000)
    //   }
    // }
  },

  created() {
    // Initialize stores
    const authStore = useAuthStore()
    const purchaseStore = usePurchaseStore()

    // Save the name of the previous page in lowercase
    this.previousPage = this.$route.query.service.toLowerCase()

    // Check if data is loaded, otherwise redirect to home to avoid errors
    if (!purchaseStore.purchase || !authStore.user) {
      this.goToPreviousPage()
    } else {
      this.user = authStore.user
      this.service = purchaseStore.purchase.service
      this.serviceId = purchaseStore.serviceId
      this.queue = purchaseStore.purchase.queue
      this.queueId = purchaseStore.queueId
      this.currentElo = purchaseStore.purchase.currentElo
      this.targetElo = purchaseStore.purchase.targetElo
      this.price = purchaseStore.purchase.price
      this.time = purchaseStore.purchase.time
    }
  },
  methods: {
    goToPreviousPage() {
      this.$router.push('/' + this.previousPage)
    },
    clearPurchaseStore() {
      usePurchaseStore().clearPurchase()
    },
    handleSelectMethod(method) {
      this.selectedMethod = method
    },

    toggleVisibleForm(checkbox) {
      if (checkbox) this.visibleForm = true
    },

    handleSubmitForm(riot_id, riot_tag, riot_login, riot_password, refer_code, description) {
      this.riot_id = riot_id
      this.riot_tag = riot_tag
      this.riot_login = riot_login
      this.riot_password = riot_password
      this.refer_code = refer_code
      this.description = description

      this.sendToBackend()
    },

    async sendToBackend() {
      // Handle confirm logic here
      const dataToBackend = {
        // Informações de elo
        current_elo: this.currentEloName,
        current_elo_image: this.currentElo.image,
        target_elo: this.targetEloName,
        target_elo_image: this.targetElo.image,
        description: this.description,
        riot_login: this.riot_login,
        riot_password: this.riot_password,
        refer_code: this.refer_code,
        payment_method: this.selectedMethod.name,
        price: this.price,
        riot_id: this.riot_id,
        riot_tag: this.riot_tag,
        time: this.time,
        user: this.user.id,
        service: this.serviceId,
        queue: this.queueId,
        status: 1

        // BACKEND DATA
        // "current_elo": "string",
        // "target_elo": "string",
        // "description": "string",
        // "riot_login": "string",
        // "riot_password": "string",
        // "refer_code": "string",
        // "payment_method": "string",
        // "price": "-18462111.85",
        // "riot_id": "string",
        // "riot_tag": "string",
        // "time": 0,
        // "user": 0,
        // "service": 0,
        // "queue": 0,
        // "status": 0
      }

      try {
        const response = await OrderService.createOrder(dataToBackend)
        // Lógica de sucesso
        console.log('Post em /api/servico realizado:', response)
        this.clearPurchaseStore()
        this.sentOrder = true
      } catch (error) {
        // Lógica de erro
        console.error('Erro ao enviar para o backend:', error)
      }
    }
  }
}
</script>

<style scoped>
#main {
  display: grid;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2vh 2vw 10vh 2vw;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  margin: auto;
  flex-wrap: wrap;

  gap: 30px 90px;

  flex-grow: 1;
}

/* Transition classes */
.form-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.form-move,
.form-enter-active {
  transition:
    opacity 2s ease,
    transform 0.5s ease;
}

/* TransitionGroup status classes */
.status-enter-from {
  opacity: 0;
}
.status-enter-active {
  transition: opacity 3s ease;
}

.confirmedSent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  justify-self: center;
}
.confirmedSent .text {
  display: flex;
  justify-content: center;
  justify-self: center;
  align-self: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
  padding: 20px;
}
.confirmedSent h1 {
  color: rgb(25, 231, 148);
  text-align: center;
}
.confirmedSent img {
  width: 10vw;
}
.confirmedSent .button {
  padding: 18px;
  background-color: transparent;
  border: 3px solid rgb(25, 231, 148);
  color: rgb(25, 231, 148);
  width: 50%;
  text-align: center;
  border-radius: 15px;

  transition: width 0.2s;
}

.confirmedSent .button:hover {
  box-shadow: 0px 0px 10px rgb(25, 231, 148);
}

@media (max-width: 768px) {
  .confirmedSent h1 {
    font-size: 1.5rem;
  }
}
</style>
