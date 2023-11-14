<script>
import { usePurchaseStore } from '../stores/store.js'

export default {
  props: [
    'priceList',
    'selectedElo',
    'getLeagueList',
    'getServicePrice',
    'getServiceDeadline',
    'cleanCurrentElo',
    'cleanTargetElo'
  ],
  data() {
    return {
      detailView: false
    }
  },
  computed: {
    getCurrentElo() {
      const name = this.selectedElo.current.name
      if (this.selectedElo.current.leagueIndex == null) {
        return name
      } else {
        const league = this.selectedElo.current.leagueIndex + 1
        return name + ' ' + league
      }
    },
    getTargetElo() {
      const name = this.selectedElo.target.name
      if (this.selectedElo.target.leagueIndex == null) {
        return name
      } else {
        const league = this.selectedElo.target.leagueIndex + 1
        return name + ' ' + league
      }
    }
  },
  methods: {
    toggleDetailView() {
      this.detailView = !this.detailView
    },

    sendPurchase(servicePrice, currentElo, currentImage, targetElo, targetImage, serviceDeadline) {
      const purchaseStore = usePurchaseStore()
      purchaseStore.keepPurchase(
        servicePrice,
        currentElo,
        currentImage,
        targetElo,
        targetImage,
        serviceDeadline
      )
    }
  }
}
</script>
<template>
  <main class="normal-main" v-if="!detailView">
    <header class="header-main">
      <h1 class="title">SELEÇÃO DE ELO</h1>
      <p>{{ getLeagueListArray }}</p>
    </header>
    <body class="normal-body">
      <section class="elo-container">
        <div
          class="elo-item"
          :class="{ 'elo-item-possible': getCurrentElo != null }"
          @click="cleanCurrentElo"
        >
          <img src="/assets/delete.png" class="trash-image" alt="Imagem de lixeira" />
          <img :src="selectedElo.current.image" class="elo-image" alt="Imagem do elo" />
          <p class="elo-name">{{ getCurrentElo }}</p>
        </div>
        <div
          class="elo-item"
          :class="{ 'elo-item-possible': getTargetElo != null }"
          @click="cleanTargetElo"
        >
          <img src="/assets/delete.png" class="trash-image" alt="Imagem de lixeira" />
          <img :src="selectedElo.target.image" class="elo-image" alt="Imagem do elo" />
          <p class="elo-name">{{ getTargetElo }}</p>
        </div>
      </section>
      <section class="info-container">
        <p class="deadline">
          O serviço será realizado dentro de um prazo de {{ getServiceDeadline }} dias
        </p>
        <p class="fakePrice">
          R${{
            (getServicePrice * 1.2).toLocaleString('pt-BR', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          }}
        </p>
        <p class="truePrice">
          R${{
            getServicePrice.toLocaleString('pt-BR', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          }}
        </p>
      </section>
      <section class="button-container">
        <button class="button-item" @click="toggleDetailView">Detalhes</button>
        <RouterLink
          class="button-item"
          :to="{ path: '/payment', query: { service: this.$route.name } }"
          @click="
            sendPurchase(
              getServicePrice,
              getCurrentElo,
              selectedElo.current.image,
              getTargetElo,
              selectedElo.target.image,
              getServiceDeadline
            )
          "
        >
          Continuar
        </RouterLink>
      </section>
    </body>
  </main>

  <main class="detail-main" v-if="detailView">
    <header class="detail-header">
      <h1 class="title" style="padding-inline: 5px">PREÇO POR DIVISÃO</h1>
      <button class="detail-button" @click="toggleDetailView">Voltar</button>
    </header>
    <body class="detail-body">
      <table>
        <thead>
          <tr>
            <th>Elo</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in priceList" :key="index">
            <tr :class="{ 'last-data': index == 8 }">
              <td>{{ item.name }}</td>
              <td>
                {{
                  item.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </body>
  </main>
</template>
;
<style scoped>
.normal-main {
  display: flex;
  flex-direction: column;

  border: 2px solid rgb(0, 100, 100);
  border-radius: 20px;
  background-color: rgba(0, 100, 100, 0.3);

  width: 310px;
}

.header-main {
  padding-block: 20px;
  border-bottom: 2px solid rgb(0, 100, 100);

  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}

.normal-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  gap: 50px;

  padding: 20px 10px;
  border-bottom-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.title {
  text-align: center;
}

.elo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.elo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 145px;
  min-height: 125px;
  cursor: pointer;
  border-radius: 15px;
  position: relative;
}

.elo-image {
  height: 6rem;
}

.elo-name {
  font-size: 1.2rem;
  font-weight: bolder;
  color: rgba(220, 220, 220);
}

.trash-image {
  position: absolute;
  height: 20px;
  margin: 0 auto;
  top: 5px;
  visibility: hidden;
}

.elo-item-possible:hover > .trash-image {
  visibility: visible;
}

.info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.deadline {
  margin-bottom: 20px;
  color: rgb(220, 220, 220);
}
.fakePrice {
  text-decoration: line-through;
  color: darkred;
}
.truePrice {
  font-size: 1.5rem;
  margin-top: 10px;
  color: rgb(37, 228, 100);
}

.button-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
}

.button-item {
  width: fit-content;
  padding: 7px 25px;
  background-color: rgb(0, 100, 100);
  border: none;
  cursor: pointer;
  border-radius: 10px;
}

.button-item:hover {
  background-color: rgba(0, 100, 100, 0.5);
}

.detail-main {
  display: flex;
  flex-direction: column;

  border: 2px solid rgb(0, 100, 100);
  border-radius: 20px;
  background-color: rgba(0, 100, 100, 0.3);

  width: 410px;
  height: 100%;
}
.detail-header {
  font-size: 0.85rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;

  padding-block: 10px;
  border-bottom: 2px solid rgb(0, 100, 100);

  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.detail-button {
  width: fit-content;
  padding: 7px 25px;
  background-color: rgb(0, 100, 100);
  border: none;
  cursor: pointer;
  border-radius: 15px;
}
.detail-button:hover {
  background-color: rgba(0, 100, 100, 0.8);
}
.detail-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

table {
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

th {
  padding: 10px;
  background-color: rgb(0, 100, 100);
}

tr:hover > td {
  background-color: rgba(0, 100, 100, 0.8);
}

td {
  padding: 10px;
  text-align: center;
  background-color: rgb(0, 100, 100);
}

.last-data > td:nth-child(1) {
  border-bottom-left-radius: 15px;
}
.last-data > td:nth-child(2) {
  border-bottom-right-radius: 15px;
}
</style>
