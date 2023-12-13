<template>
  <main>
    <div class="container" v-if="orders">
      <template v-for="order in orders.results" :key="order.id">
        <div class="card" :class="{ finalizado: order.status == 2 }">
          <div class="header">
            <p style="position: absolute; left: 2px; top: 2px">[{{ order.id }}]</p>
            <h1>{{ order.current_elo }} ao {{ order.target_elo }}</h1>
            <button @click="toggleOrderStatus(order)">{{ order.status == 1 ? 'Em andamento' : 'Finalizado' }}</button>
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
                <li>{{ calculateRemainingDays(calculateDeadlineDate(order.purchase_date, order.time)) }} dias</li>
                <li>{{ order.riot_id + order.riot_tag }}</li>
                <li>User ID: {{ order.user }}</li>
                <li>{{ formatDate(order.purchase_date) }}</li>
                <li>{{ formatDate(calculateDeadlineDate(order.purchase_date, order.time)) }}</li>
              </ul>
            </div>
            <div class="description">
              <p v-if="order.description">{{ order.description }}</p>
              <p v-if="!order.description">Sem descrição</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import orderApi from '@/services/order'

import { useAuthStore } from '../stores/store.js'

export default {
  data() {
    return {
      orders: null,
      user: null
    }
  },
  async mounted() {
    try {
      const response = await orderApi.getAllOrders()
      this.orders = response
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
    },
    async toggleOrderStatus(order) {
      try {
        const newStatus = order.status == 1 ? 2 : 1

        // Altere o status do pedido usando a API
        await orderApi.toggleOrderStatus(order.id, newStatus)

        console.log(`Order ${order.id} status toggled to ${newStatus === 1 ? 'Em andamento' : 'Finalizado'}`)
        order.status = newStatus
      } catch (error) {
        console.error('Error toggling order status:', error)
      }
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
  position: relative;
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
  grid-template-columns: 23em 1fr;
  padding-block: 1em;
  gap: 2em;
  flex-wrap: wrap;
}
.important {
  display: flex;
  justify-content: space-evenly;
  border-right: 1px solid rgb(255, 255, 255, 0.5);
  padding-inline: 1em;
  gap: 1em;
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

.finalizado {
  border-color: rgb(255, 0, 0);
}
</style>
