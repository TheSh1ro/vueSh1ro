<template>
  <main id="main">
    <div class="content">
      <ServiceAbout :toggleVisibleForm="toggleVisibleForm" :visibleForm="visibleForm" />
      <Transition name="form">
        <ServiceForm v-if="visibleForm" class="container" />
      </Transition>
    </div>
  </main>
</template>

<script>
import { useAuthStore, usePurchaseStore } from '../stores/store.js'
// import axios from 'axios'

import ServiceAbout from '../components/ServiceAbout.vue'
import ServiceForm from '../components/ServiceForm.vue'

export default {
  components: { ServiceAbout, ServiceForm },
  data() {
    return {
      previousPage: null, // Nome da página anterior (elojob / duojob)
      visibleForm: false
    }
  },
  created() {
    const authStore = useAuthStore()
    const purchaseStore = usePurchaseStore()

    // Salva o nome da página anterior em lowercase
    this.previousPage = this.$route.query.service.toLowerCase()

    // Checa se os dados estão carregados, caso contrário volta para a home para evitar erros
    if (!purchaseStore.purchase || !authStore.user) {
      this.$router.push('/' + this.previousPage.toLowerCase())
    }
  },
  computed: {},
  methods: {
    toggleVisibleForm(checkbox) {
      if (checkbox) this.visibleForm = true
    }
  }
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  padding: 20px 20px 0px 20px;
}

.content {
  display: flex;
  justify-content: center;
  height: fit-content;
  gap: 10vw;
  margin: auto;
}

.container {
  transition: transform 5.5s;
}

/* we will explain what these classes do next! */
.form-enter-active,
.form-leave-active {
  transition:
    opacity 3s ease,
    transform 0.5s ease;
}

.form-enter-from,
.form-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
