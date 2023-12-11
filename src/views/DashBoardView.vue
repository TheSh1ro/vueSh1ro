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
      const response = await OrderService.getOrder()
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
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  padding: 1em;
}

.container {
  background-color: rgba(20, 20, 35, 0.75);
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 240px;
  gap: 3em 1em;
}

.card {
  display: flex;
  flex-direction: column;
  margin: 1em;
  border: 1px solid rgb(255, 255, 255, 0.5);
  height: 100%;
}

.header {
  display: flex;
  gap: 0.5rem;
  background-color: rgb(25, 25, 40);
  border-bottom: 1px solid rgb(255, 255, 255, 0.5);
  justify-content: space-between;
  height: 100%;
}
h1 {
  align-self: center;
  font-size: 1.3em;
  color: white;
  padding-block: 0.5em;
  padding-left: 1em;
}
.body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.body .important {
  display: flex;
  justify-content: center;
  gap: 20px;
  border-right: 1px solid rgb(255, 255, 255, 0.5);
  padding: 1em;
}
.important > :first-child {
  font-weight: bold;
  text-align: stat;
}
.description {
  display: flex;
  flex-grow: 1;
  padding: 1em;
  justify-content: center;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
button {
  border: none;
  background-color: transparent;
  padding-inline: 1em;
  border-left: 1px solid rgb(255, 255, 255, 0.5);
  color: white;
  cursor: pointer;
  border-bottom-left-radius: 10px;
}
button:hover {
  background-color: transparent;
  background-color: rgb(255, 255, 255, 0.5);
  color: black;
}
</style>
