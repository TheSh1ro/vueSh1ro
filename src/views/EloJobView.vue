<template>
  <main id="main">
    <EloAtual
      ref="EloAtual"
      :selectElo="handleSelectElo"
      :currentElo="selectedElo.current"
      :targetElo="selectedElo.target"
      @eloClicked="handleEloClicked"
    />
    <EloDesejado
      ref="EloDesejado"
      :selectElo="handleSelectElo"
      :currentElo="selectedElo.current"
      :targetElo="selectedElo.target"
      @eloClicked="handleEloClicked"
    />
    <p>{{ selectedElo.current }}</p>
    <p>{{ selectedElo.target }}</p>
  </main>
</template>

<script>
import EloAtual from '../components/EloAtual.vue'
import EloDesejado from '../components/EloDesejado.vue'

export default {
  components: { EloAtual, EloDesejado },
  data() {
    return {
      selectedElo: { current: [], target: [] }
    }
  },
  created() {},
  computed: {},
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
      if (
        (currentElo.eloIndex == targetElo.eloIndex &&
          currentElo.leagueIndex <= targetElo.leagueIndex) ||
        currentElo.eloIndex > targetElo.eloIndex
      ) {
        this.selectedElo.target = []
      }
    }
  }
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
