<template>
  <main>
    <h2>Qual seu elo atual?</h2>
    <div class="container">
      <template v-for="(elo, eloIndex) in eloAtual" :key="elo">
        <div class="elo-item" v-if="eloIndex < 9">
          <div class="elo" v-if="!elo.visibleLeagues" @click="showLeagues(elo, eloIndex)">
            <img :src="elo.image" alt="" />
            <h2>{{ elo.name }}</h2>
          </div>
          <div class="leagues" v-if="elo.visibleLeagues">
            <div v-for="(league, index) in 4" :key="league">
              {{ index + 1 }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
export default {
  props: ['eloList'],
  data() {
    return {
      eloAtual: this.eloList
    }
  },
  created() {
    this.eloAtual[0].visibleLeagues = true
  },
  computed: {},
  methods: {
    showLeagues(elo, eloIndex) {
      if (!elo.isHigh) {
        elo.visibleLeagues = !elo.visibleLeagues
      }
    }
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  gap: 25px;
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.elo-item {
  display: block;
}

.elo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.elo:hover {
  background-color: rgba(0, 100, 100, 0.3);
}
.leagues {
}

img {
  height: 80px;
}
</style>
