<template>
  <main id="main">
    <TransitionGroup name="list">
      <EloAtual key="elo-atual" ref="EloAtual" :selectElo="handleSelectElo" :currentElo="selectedElo.current" :targetElo="selectedElo.target" @eloClicked="handleEloClicked" />
      <EloDesejado
        key="elo-desejado"
        ref="EloDesejado"
        :selectElo="handleSelectElo"
        :currentElo="selectedElo.current"
        :targetElo="selectedElo.target"
        :scrollToFooterTop="scrollToFooterTop"
        @eloClicked="handleEloClicked"
        v-if="selectedElo.current.name"
      />
      <FilaDesejada
        key="fila"
        class="fila"
        ref="FilaDesejada"
        :handleConfirm="handleConfirm"
        :selectQueue="handleSelectQueue"
        :currentElo="selectedElo.current"
        :targetElo="selectedElo.target"
        :selectedQueue="selectedQueue"
        v-if="selectedElo.target.name"
      />
    </TransitionGroup>
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
      hasScrolled: false, // Scrollar apenas uma vez para seleção de fila
      windowInnerHeight: window.innerHeight,
      appHeight: document.getElementById('app').clientHeight,

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
      selectedQueue: null,
      selectedQueueId: null
    }
  },
  computed: {
    footerHeight() {
      return document.getElementById('footer').clientHeight
    },
    footerTop() {
      return this.appHeight - this.clientHeight - this.footerHeight
    },

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

      let totalPrice = 0,
        totalDays = 0

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

    if (purchaseStore.purchase && purchaseStore.purchase.service == this.$route.name) {
      this.selectedElo.current = purchaseStore.purchase.currentElo
      this.selectedElo.target = purchaseStore.purchase.targetElo
      this.selectedQueue = purchaseStore.purchase.queue
    }
  },
  mounted() {
    // Adiciona um ouvinte de redimensionamento da janela
    window.addEventListener('resize', this.updateWindowInnerHeight)
    window.addEventListener('resize', this.updateAppHeight)
    if (usePurchaseStore().purchase) this.scrollToFooterTop()
  },
  beforeUnmount() {
    // Remove o ouvinte de redimensionamento ao destruir o componente
    window.removeEventListener('resize', this.updateWindowInnerHeight)
    window.removeEventListener('resize', this.updateAppHeight)
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

      // Limpa a seleção de fila para melhor experiência do usuário
      this.selectedQueue = null
    },

    handleSelectQueue(queue, queueId) {
      this.selectedQueue = queue
      this.selectedQueueId = queueId
    },

    handleConfirm() {
      const purchaseStore = usePurchaseStore()
      const authStore = useAuthStore()
      const currentPath = this.$route.path

      const service = this.$route.name
      const queue = this.selectedQueue
      const queueId = this.selectedQueueId
      const currentElo = this.selectedElo.current
      const targetElo = this.selectedElo.target
      const price = this.serviceData.price
      const days = this.serviceData.time

      purchaseStore.keepPurchase(service, queue, currentElo, targetElo, price, days)
      purchaseStore.submitQueueId(queueId)
      purchaseStore.submitServiceId(2) // 2 = duojob

      if (authStore.isAuthenticated) {
        this.$router.push({ path: '/payment', query: { service: service } })
        this.$scrollToTop()
      } else {
        this.$router.push({ path: '/login', query: { previousPath: currentPath } })
        this.$scrollToTop()
      }
    },

    updateWindowInnerHeight() {
      this.windowInnerHeight = window.innerHeight
    },
    updateAppHeight() {
      this.appHeight = document.getElementById('app').clientHeight
    },
    scrollToFooterTop() {
      if (this.hasScrolled) {
        return
      } else {
        this.hasScrolled = true
      }

      if (window.innerWidth < 1140) {
        setTimeout(() => {
          this.updateAppHeight()
          window.scrollTo(0, this.appHeight - this.windowInnerHeight - this.footerHeight)
        }, 0)
      }
    }
  }
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: calc(100vh - 90px);
  justify-content: center;
  padding-top: 20px;
  padding-inline: 2vw;
  gap: 5vw;
}

@media (max-width: 1140px) {
  #main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: calc(100vh - 80px) 1fr;
    padding-top: 10px;
  }

  .fila {
    width: 100%;
    grid-column: 1/3;
  }
}

.list-enter-active {
  transition:
    opacity 2s ease,
    transform 0.5s ease;
}

.list-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-75%);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(75%);
}
</style>
