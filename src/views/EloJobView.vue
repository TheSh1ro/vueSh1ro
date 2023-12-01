<template>
  <main id="main">
    <EloAtual :eloList="eloList" />
    <EloDesejado :eloList="eloList" v-if="1 == 2" />
  </main>
</template>

<script>
import EloAtual from '../components/EloAtual.vue'
import EloDesejado from '../components/EloDesejado.vue'
export default {
  components: { EloAtual, EloDesejado },
  data() {
    return {
      eloList: [
        {
          name: 'Ferro',
          isHigh: false,
          price: 10,
          image: 'assets/iron.png',
          visibleLeagues: false
        },
        {
          name: 'Bronze',
          isHigh: false,
          price: 10,
          image: 'assets/bronze.png',
          visibleLeagues: false
        },
        {
          name: 'Prata',
          isHigh: false,
          price: 12.5,
          image: 'assets/silver.png',
          visibleLeagues: false
        },
        { name: 'Ouro', isHigh: false, price: 15, image: 'assets/gold.png', visibleLeagues: false },
        {
          name: 'Platina',
          isHigh: false,
          price: 22.5,
          image: 'assets/platinum.png',
          visibleLeagues: false
        },
        {
          name: 'Esmeralda',
          isHigh: false,
          price: 30,
          image: 'assets/emerald.png',
          visibleLeagues: false
        },
        {
          name: 'Diamante',
          isHigh: false,
          price: 45,
          image: 'assets/diamond.png',
          visibleLeagues: false
        },
        {
          name: 'Mestre',
          isHigh: true,
          price: 600,
          image: 'assets/master.png',
          visibleLeagues: false
        },
        {
          name: 'Grão Mestre',
          isHigh: true,
          price: 1200,
          image: 'assets/grandmaster.png',
          visibleLeagues: false
        },
        {
          name: 'Desafiante',
          isHigh: true,
          price: 0,
          image: 'assets/challenger.png',
          visibleLeagues: false
        }
      ],
      selectedElo: { atual: [], desejado: [] }
    }
  },
  created() {},
  computed: {},
  methods: {}
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  grid-template-columns: auto-fit;
  justify-content: center;
}
</style>
