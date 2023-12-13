<template>
  <main>
    <div class="container" v-if="services">
      <template v-for="service in services.results" :key="service">
        <div class="card">
          <div class="header">
            <h1>{{ service.current_elo }} ao {{ service.target_elo }}</h1>
            <button>{{ service.status ? 'Em andamento' : 'Concluído' }}</button>
          </div>
          <div class="body">
            <div class="important">
              <ul>
                <li>Prazo restante:</li>
                <li>Nick da conta:</li>
                <li>Comprador:</li>
                <li>Data inicial:</li>
                <li>Data final:</li>
              </ul>
              <ul>
                <li>{{ calculateRemainingDays(calculateDeadlineDate(service.purchase_date, service.time)) }} dias</li>
                <li>{{ service.riot_id + service.riot_tag }}</li>
                <li>User ID: {{ service.user }}</li>
                <li>{{ formatDate(service.purchase_date) }}</li>
                <li>{{ formatDate(calculateDeadlineDate(service.purchase_date, service.time)) }}</li>
              </ul>
            </div>
            <div class="description">
              <p v-if="service.description">{{ service.description }}</p>
              <p v-if="!service.description">Sem descrição</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import OrderService from '@/services/order'

import { useAuthStore } from '../stores/store.js'

export default {
  data() {
    return {
      services: null,
      user: null
    }
  },
  async mounted() {
    try {
      const response = await OrderService.getAllOrders()
      this.services = response
    } catch (error) {
      console.error('Error fetching order data:', error)
    }
  },
  created() {
    const authStore = useAuthStore()

    authStore.user ? (this.user = authStore.user) : this.$router.push('/login')
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated) {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    isAuthenticated() {
      return useAuthStore().isAuthenticated
    }
  },
  methods: {
    formatDate(date) {
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    calculateDeadlineDate(startDate, daysToAdd) {
      const startDateObject = new Date(startDate)
      const deadlineDate = new Date(startDateObject.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
      return deadlineDate.toISOString().split('T')[0] // Retorna a data no formato 'YYYY-MM-DD'
    },
    calculateRemainingDays(deadlineDate) {
      const currentDate = new Date()
      const deadline = new Date(deadlineDate)
      const timeDifference = deadline.getTime() - currentDate.getTime()
      const remainingDays = Math.ceil(timeDifference / (24 * 60 * 60 * 1000))
      return remainingDays > 0 ? remainingDays : 0
    }
  }
}
</script>

<style scoped>
img {
  height: 36px;
}

main {
  display: flex;
  background-color: rgba(0, 0, 0, 0.8);
  padding-inline: 1em;
  padding-block: 1em;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;

  background-color: rgba(20, 20, 35, 0.75);
  gap: 1em;
}

.card {
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid rgb(255, 255, 255, 0.5);
}

.header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  background-color: rgb(25, 25, 40);
}
h1 {
  border-right: 1px solid transparent;
  text-align: center;
  font-size: 1.3em;
  padding-block: 0.5em;
  color: whitesmoke;
  padding-left: 1em;
}
.body {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-block: 1em;
  gap: 2em;
}
.important {
  display: flex;
  justify-content: space-evenly;
  border-right: 1px solid rgb(255, 255, 255, 0.5);
  padding-inline: 1em;
}
.important > :first-child {
  font-weight: bold;
}
.description {
  padding-inline: 1em;
}

ul {
  gap: 3px;
}
button {
  border: none;
  cursor: pointer;
  background-color: rgb(25, 25, 40);
}
button:hover {
  background-color: transparent;
  background-color: rgb(255, 255, 255, 0.5);
  color: black;
}
</style>
