<template>
  <main>
    <h2>Qual seu elo atual?</h2>
    <div class="container">
      <template v-for="(elo, eloIndex) in eloAtual" :key="elo">
        <div class="block" v-if="eloIndex">
          <div class="elo" v-if="!elo.visibleLeagues" @click="showLeagues(elo, eloIndex)">
            <img :src="elo.image" alt="" />
            <h2>{{ elo.name }}</h2>
          </div>
          <div class="leagues" v-if="elo.visibleLeagues">
            <div class="league" v-for="(league, index) in 4" :key="league">
              <img :src="elo.image" alt="" />
              <h2>{{ elo.name }} {{ index + 1 }}</h2>
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
  created() {},
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
  align-items: center;
  flex-direction: column;
  padding: 40px 20px;
  gap: 25px;
}

.container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.block {
  display: grid;
  grid-template-rows: 4, 1fr;
  width: 140px;
  min-height: 140px;
}

.elo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  height: 140px;
  width: 100%;
}
.elo:hover {
  background-color: rgba(0, 100, 100, 0.3);
}

.leagues {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.league {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 140px;
}
.league:hover {
  background-color: rgba(0, 100, 100, 0.3);
}

img {
  height: 80px;
}
</style>
