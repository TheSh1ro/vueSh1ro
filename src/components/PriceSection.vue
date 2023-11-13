<script>
export default {
  props: ['selectedElo', 'getLeagueList', 'getServicePrice', 'getServiceDeadline', 'cleanCurrentElo', 'cleanTargetElo'],
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
  methods: {}
}
</script>
<template>
  <main>
    <h1 class="title">SELEÇÃO DE elos</h1>
    <section class="elo-container">
      <div class="elo-item" :class="{ 'elo-item-possible': getCurrentElo != null }" @click="cleanCurrentElo">
        <img :src="selectedElo.current.image" alt="" />
        <h2>{{ getCurrentElo }}</h2>
      </div>
      <div class="elo-item" :class="{ 'elo-item-possible': getTargetElo != null }" @click="cleanTargetElo">
        <img :src="selectedElo.target.image" alt="" />
        <h2>{{ getTargetElo }}</h2>
      </div>
    </section>
    <section class="info-container">
      <h2>Prazo de {{ getServiceDeadline }} dias</h2>
      <h2>R${{ getServicePrice }},00</h2>
    </section>
    <section class="button-container">
      <button class="button-item">Detalhes</button>
      <button class="button-item">Continuar</button>
    </section>
  </main>
</template>
;
<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-self: center;

  height: fit-content;
  width: fit-content;
  padding: 30px 20px;
  gap: 60px;

  border-radius: 20px;
  background-color: rgba(0, 100, 100, 0.5);
  border: 2px solid rgb(0, 100, 100);
}

.title {
  text-align: center;
}

.elo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  gap: 30px;
}

.elo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 145px;
  min-height: 125px;
  cursor: pointer;
  border-radius: 20px;
  padding: 10px;
}

.elo-item-possible:hover {
  background-color: rgba(255, 0, 0, 0.4);
}

img {
  height: 6rem;
}

.info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
}

.button-item {
  width: fit-content;
  padding: 12px 35px;
  background-color: rgb(0, 100, 100);
  border: none;
  cursor: pointer;
}

.button-item:hover {
  background-color: rgba(0, 100, 100, 0.5);
}
</style>
