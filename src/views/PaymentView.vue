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
        <h1>Sua compra foi realizada com sucesso!</h1>
        <img src="/assets/checkmark.png" alt="Imagem de OK" />
      </div>
    </Transition>
  </main>
</template>

<script>
import { useAuthStore, usePurchaseStore } from '../stores/store.js'
import ServiceAbout from '../components/ServiceAbout.vue'
import ServiceForm from '../components/ServiceForm.vue'

export default {
  components: { ServiceAbout, ServiceForm },
  data() {
    return {
      // Last page absolute URL ( /elojob or /duojob )
      previousPage: null,

      // Component state
      visibleForm: false,
      sentOrder: false,

      // Component data [from service view]
      service: null,
      queue: null,
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
      this.queue = purchaseStore.purchase.queue
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

    sendToBackend() {
      // Handle confirm logic here
      const dataToBackend = {
        // Informações de elo
        currentElo: this.currentEloName,
        targetElo: this.targetEloName,

        // Informações de login
        riot_login: this.riot_login,
        riot_password: this.riot_password,

        // Informações de valor / desconto
        refer_code: this.refer_code,
        price: this.price,
        payment_method: this.selectedMethod.name,

        // Informações de scouting
        riot_id: this.riot_id,
        riot_tag: this.riot_tag,

        // Informações de serviço / modo
        service: this.service,
        queue: this.queue,
        description: this.description,
        time: this.time
      }

      console.log(dataToBackend)

      this.sentOrder = true
      this.clearPurchaseStore()

      // TERMINAR A PARTE DO AXIOS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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

  gap: 30px;

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
  height: 150px;
}
</style>
