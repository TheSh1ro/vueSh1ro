<template>
  <main id="main">
    <EloAtual ref="EloAtual" :selectElo="handleSelectElo" :currentElo="selectedElo.current" :targetElo="selectedElo.target" @eloClicked="handleEloClicked" />
    <EloDesejado ref="EloDesejado" :selectElo="handleSelectElo" :currentElo="selectedElo.current" :targetElo="selectedElo.target" @eloClicked="handleEloClicked" v-if="selectedElo.current.name" />
    <FilaDesejada ref="FilaDesejada" :handleConfirm="handleConfirm" :selectQueue="handleSelectQueue" :currentElo="selectedElo.current" :targetElo="selectedElo.target" :selectedQueue="selectedQueue" v-if="selectedElo.target.name" />
  </main>
</template>

<script>
import EloAtual from '../components/EloAtual.vue'
import EloDesejado from '../components/EloDesejado.vue'
import FilaDesejada from '../components/FilaDesejada.vue'
import { useAuthStore, usePurchaseStore } from '../stores/store.js'

export default {
  components: { EloAtual, EloDesejado, FilaDesejada },
  data() {
    return {
      priceList: [
        { name: 'Ferro', value: 10, deadline: 2, isHigh: false },
        { name: 'Bronze', value: 10, deadline: 2, isHigh: false },
        { name: 'Prata', value: 12.5, deadline: 2, isHigh: false },
        { name: 'Ouro', value: 15, deadline: 2, isHigh: false },
        { name: 'Platina', value: 22.5, deadline: 2, isHigh: false },
        { name: 'Esmeralda', value: 30, deadline: 2, isHigh: false },
        { name: 'Diamante', value: 45, deadline: 2, isHigh: false },
        { name: 'Mestre', value: 600, deadline: 14, isHigh: true },
        { name: 'Grão Mestre', value: 1200, deadline: 14, isHigh: true },
        { name: 'Desafiante', value: 0, deadline: 0, isHigh: true }
      ],
      selectedElo: {
        current: {},
        target: {}
      },
      selectedQueue: null
    }
  },
  computed: {
    serviceData() {
      const start = {
        elo: this.selectedElo.current.eloIndex,
        league: this.selectedElo.current.leagueIndex
      }
      const end = {
        elo: this.selectedElo.target.eloIndex,
        league: this.selectedElo.target.leagueIndex
      }
      const priceList = this.priceList

      let totalPrice = 0
      let totalDays = 0

      for (let eloIndex = start.elo; eloIndex <= end.elo; eloIndex++) {
        if (!priceList[eloIndex].isHigh) {
          if (eloIndex == start.elo && eloIndex != end.elo) {
            for (let leagueIndex = start.league; leagueIndex >= 0; leagueIndex--) {
              totalPrice += priceList[eloIndex].value
              totalDays += priceList[eloIndex].deadline
            }
          }
          if (eloIndex != start.elo && eloIndex != end.elo) {
            for (let leagueIndex = 3; leagueIndex >= 0; leagueIndex--) {
              totalPrice += priceList[eloIndex].value
              totalDays += priceList[eloIndex].deadline
            }
          }
          if (eloIndex == end.elo) {
            for (let leagueIndex = 3; leagueIndex > end.league; leagueIndex--) {
              totalPrice += priceList[eloIndex].value
              totalDays += priceList[eloIndex].deadline
            }
          }
        } else if (eloIndex < end.elo) {
          totalPrice += priceList[eloIndex].value
          totalDays += priceList[eloIndex].deadline
        }
      }

      return { price: totalPrice, time: totalDays }
    }
  },
  created() {
    const purchaseStore = usePurchaseStore()
    const purchaseDetails = purchaseStore.purchase

    if (purchaseStore.storedService == this.$route.name) {
      this.selectedElo.current = purchaseDetails.currentElo
      this.selectedElo.target = purchaseDetails.targetElo
      this.selectedQueue = purchaseDetails.queue
    }
  },
  methods: {
    handleEloClicked() {
      const eloAtual = this.$refs.EloAtual
      if (eloAtual) {
        eloAtual.hideLeagues()
      }

      const eloDesejado = this.$refs.EloDesejado
      if (eloDesejado) {
        eloDesejado.hideLeagues()
      }
    },

    handleSelectElo(type, selectedElo) {
      // Recebe os dados dos childcomponents
      this.selectedElo[type] = selectedElo

      const currentElo = this.selectedElo.current
      const targetElo = this.selectedElo.target

      // Caso o elo atual selecionado seja maior que o elo desejado selecionado, limpa o elo desejado
      if ((currentElo.eloIndex == targetElo.eloIndex && currentElo.leagueIndex <= targetElo.leagueIndex) || currentElo.eloIndex > targetElo.eloIndex || (currentElo.isHigh && currentElo.eloIndex == targetElo.eloIndex)) {
        this.selectedElo.target = []
      }

      // Caso selecione um elo inicial mestre ou superior, limpa a seleção de fila
      if (currentElo.isHigh) {
        this.selectedQueue = null
      }
    },

    handleSelectQueue(queue) {
      this.selectedQueue = queue
    },

    handleConfirm() {
      const purchaseStore = usePurchaseStore()
      const authStore = useAuthStore()
      const currentPath = this.$route.path

      const service = this.$route.name
      const queue = this.selectedQueue
      const currentElo = this.selectedElo.current
      const targetElo = this.selectedElo.target
      const price = this.serviceData.price
      const days = this.serviceData.time

      purchaseStore.keepPurchase(service, queue, currentElo, targetElo, price, days)

      if (authStore.isAuthenticated) {
        this.$router.push('/payment')
      } else {
        this.$router.push({ path: '/login', query: { previousPath: currentPath } })
      }
    }
  }
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
