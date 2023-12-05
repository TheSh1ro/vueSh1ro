<template>
  <main id="main">
    <div class="content">
      <ServiceAbout :goToPreviousPage="goToPreviousPage" :toggleVisibleForm="toggleVisibleForm" :visibleForm="visibleForm" :handleSelectMethod="handleSelectMethod" :selectedMethod="selectedMethod" />

      <Transition name="form">
        <ServiceForm v-if="visibleForm" class="container" :sendFormData="verifyToBackend" />
      </Transition>
    </div>
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
      // Component state
      previousPage: null,
      visibleForm: false,
      service: null,
      queue: null,
      currentElo: null,
      targetElo: null,
      price: null,
      time: null,
      selectedMethod: null
    }
  },
  computed: {
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
    }
  },
  methods: {
    goToPreviousPage() {
      this.$router.push('/' + this.previousPage)
    },
    handleSelectMethod(method) {
      this.selectedMethod = method
    },
    toggleVisibleForm(checkbox) {
      if (checkbox) this.visibleForm = true
    },
    verifyToBackend(riot_id, riot_tag, riot_login, riot_password, refer_code, description) {
      // Handle confirm logic here
      const dataToBackend = {
        riot_id: riot_id,
        riot_tag: riot_tag,
        riot_login: riot_login,
        riot_password: riot_password,
        refer_code: refer_code,
        description: description
      }

      console.log(dataToBackend)
      // Add logic to send data to the backend
    }
  }
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  padding-bottom: 20vh;
}

.content {
  display: flex;
  justify-content: space-evenly;
  height: fit-content;
  row-gap: 40px;
  margin: 20px;
}

@media (max-width: 900px) {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.container {
  transition: transform 5.5s;
}

/* Transition classes */
.form-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.form-enter-active {
  transition:
    opacity 3s ease,
    transform 0.5s ease;
}

.form-leave-to {
  opacity: 0;
}
.form-leave-active {
  transition: opacity 1s ease;
}
</style>
