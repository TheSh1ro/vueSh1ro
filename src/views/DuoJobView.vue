<template>
  <main id="main">
    <div class="content">
      <section class="container">
        <h2 class="block">Elo atual</h2>
        <template v-for="(elo, eloIndex) in currentEloList" :key="eloIndex">
          <div class="block">
            <div
              class="elo-block"
              :class="{
                'elo-block-selected': selectedElo.current && selectedElo.current.name == elo.name
              }"
              v-if="elo.visible"
              @click="selectElo(elo, 'current', eloIndex)"
            >
              <p>{{ elo.name }}</p>
              <img :src="elo.image" alt="" />
            </div>
            <div class="league-block" v-if="!elo.visible">
              <template v-for="(league, leagueIndex) in elo.leagues" :key="leagueIndex">
                <span
                  class="league-item"
                  @click="selectElo(elo, 'current', eloIndex, leagueIndex)"
                  :class="{
                    'league-item-selected': selectedElo.current.index == eloIndex && selectedElo.current.leagueIndex == leagueIndex
                  }"
                >
                  {{ league.name }}
                </span>
              </template>
            </div>
          </div>
        </template>
      </section>

      <section class="container">
        <h2 class="block">Elo desejado</h2>
        <template v-for="(elo, eloIndex) in targetEloList" :key="eloIndex">
          <div
            class="block"
            v-if="
              !selectedElo.current ||
              (eloIndex == selectedElo.current.index && selectedElo.current.leagueIndex >= 1) ||
              eloIndex > selectedElo.current.index
            "
          >
            <div
              class="elo-block"
              :class="{
                'elo-block-selected': selectedElo.target && selectedElo.target.name == elo.name
              }"
              v-if="elo.visible"
              @click="selectElo(elo, 'target', eloIndex)"
            >
              <p>{{ elo.name }}</p>
              <img :src="elo.image" alt="" />
            </div>
            <div class="league-block" v-if="!elo.visible">
              <template v-for="(league, leagueIndex) in elo.leagues" :key="leagueIndex">
                <span
                  class="league-item"
                  @click="selectElo(elo, 'target', eloIndex, leagueIndex)"
                  :class="{
                    'league-item-impossible':
                      selectedElo.current && leagueIndex >= selectedElo.current.leagueIndex && eloIndex == selectedElo.current.index,
                    'league-item-selected': selectedElo.target.index == eloIndex && selectedElo.target.leagueIndex == leagueIndex
                  }"
                >
                  {{ league.name }}
                </span>
              </template>
            </div>
          </div>
        </template>
      </section>

      <section class="price-container" v-if="selectedElo.current || selectedElo.target">
        <div>
          <h2 v-if="selectedElo.current != null">Elo atual</h2>
          <span v-for="(value, key) in selectedElo.current" :key="key">
            <p :class="{ 'red-text': key === 'isHigh' && value }" v-if="key != 'image'">{{ key }} : {{ value }}</p>
            <img v-if="key === 'image'" :src="value" alt="" />
          </span>
        </div>
        <div>
          <h2 v-if="selectedElo.target != null">Elo desejado</h2>
          <span v-for="(value, key) in selectedElo.target" :key="key">
            <p :class="{ 'red-text': key === 'isHigh' && value }" v-if="key != 'image'">{{ key }} : {{ value }}</p>
            <img v-if="key === 'image'" :src="value" alt="" />
          </span>
          <span>{{ getLeagueList }}</span>
          <span>{{ getServicePrice }}</span>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      currentEloList: [
        {
          name: 'Ferro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/iron.png'
        },
        {
          name: 'Bronze',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/bronze.png'
        },
        {
          name: 'Prata',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/silver.png'
        },
        {
          name: 'Ouro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/gold.png'
        },
        {
          name: 'Platina',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/platinum.png'
        },
        {
          name: 'Esmeralda',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/emerald.png'
        },
        {
          name: 'Diamante',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/diamond.png'
        },
        {
          name: 'Mestre',
          leagues: null,
          visible: true,
          image: 'assets/master.png'
        },
        {
          name: 'Grão Mestre',
          leagues: null,
          visible: true,
          image: 'assets/grandmaster.png'
        }
      ],
      targetEloList: [
        {
          name: 'Ferro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/iron.png'
        },
        {
          name: 'Bronze',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/bronze.png'
        },
        {
          name: 'Prata',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/silver.png'
        },
        {
          name: 'Ouro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/gold.png'
        },
        {
          name: 'Platina',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/platinum.png'
        },
        {
          name: 'Esmeralda',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/emerald.png'
        },
        {
          name: 'Diamante',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          image: 'assets/diamond.png'
        },
        {
          name: 'Mestre',
          leagues: null,
          visible: true,
          image: 'assets/master.png'
        },
        {
          name: 'Grão Mestre',
          leagues: null,
          visible: true,
          image: 'assets/grandmaster.png'
        },
        {
          name: 'Desafiante',
          leagues: null,
          visible: true,
          image: 'assets/challenger.png'
        }
      ],
      selectedElo: {
        current: {
          name: 'Ferro',
          index: 0,
          leagueIndex: 3,
          image: 'assets/iron.png',
          isHigh: false
        },
        target: {
          name: 'Desafiante',
          index: 9,
          leagueIndex: null,
          image: 'assets/challenger.png',
          isHigh: true
        }
      },
      priceList: [
        { name: 'Ferro', value: 10 },
        { name: 'Bronze', value: 10 },
        { name: 'Prata', value: 12.5 },
        { name: 'Ouro', value: 15 },
        { name: 'Platina', value: 22.5 },
        { name: 'Esmeralda', value: 30 },
        { name: 'Diamante', value: 45 },
        { name: 'Mestre', value: 600 },
        { name: 'Grão Mestre', value: 1200 }
      ]
    }
  },
  methods: {
    selectElo(elo, type, eloIndex, leagueIndex) {
      // Evitar que o elo atual selecionado seja maior do que o elo desejado
      if (type == 'current' && this.selectedElo.target) {
        // Caso elo atual > elo desejado - limpa o elo desejado
        if (eloIndex > this.selectedElo.target.index) {
          this.selectedElo.target = null
        }

        // Caso elo atual seja o mesmo que o elo desejado, porém a liga seja igual ou menor - limpa o elo desejado
        if (eloIndex == this.selectedElo.target.index && leagueIndex <= this.selectedElo.target.leagueIndex) {
          this.selectedElo.target = null
        }
      }

      if (
        type == 'target' &&
        this.selectedElo.current &&
        this.selectedElo.current.index == eloIndex &&
        this.selectedElo.current.leagueIndex <= leagueIndex
      ) {
        return
      }

      if (elo.leagues != null) {
        this.toggleLeagueVisibility(elo, type, eloIndex)
      }

      if (elo.leagues == null) {
        this.selectedElo[type] = {
          name: elo.name,
          index: eloIndex,
          leagueIndex: null,
          image: elo.image,
          isHigh: true
        }
      }

      if (leagueIndex != null) {
        this.selectedElo[type] = {
          name: elo.name,
          index: eloIndex,
          leagueIndex: leagueIndex,
          image: elo.image,
          isHigh: false
        }
      }
    },

    toggleLeagueVisibility(elo, type, eloIndex) {
      const eloList = this[type + 'EloList']
      const status = eloList[eloIndex].visible

      this.currentEloList.forEach((e) => {
        e.visible = true
      })

      this.targetEloList.forEach((e) => {
        e.visible = true
      })

      eloList[eloIndex].visible = !status
    }
  },

  computed: {
    getLeagueList() {
      const start = {
        elo: this.selectedElo.current.index,
        league: this.selectedElo.current.leagueIndex
      }
      const end = {
        elo: this.selectedElo.target.index,
        league: this.selectedElo.target.leagueIndex
      }

      const newLeagueList = []

      for (let eloIndex = start.elo; eloIndex <= end.elo; eloIndex++) {
        const eloName = this.targetEloList[eloIndex].name
        const object = { [eloName]: {} }
        const eloLeagues = []
        object[eloName] = eloLeagues
        newLeagueList.push(object)

        if (this.targetEloList[eloIndex].leagues != null) {
          if (eloIndex == start.elo && eloIndex != end.elo) {
            for (let leagueIndex = start.league; leagueIndex >= 0; leagueIndex--) {
              eloLeagues.push(this.targetEloList[eloIndex].name + ' ' + this.targetEloList[eloIndex].leagues[leagueIndex].name)
            }
          }
          if (eloIndex != start.elo && eloIndex != end.elo) {
            for (let leagueIndex = 3; leagueIndex >= 0; leagueIndex--) {
              eloLeagues.push(this.targetEloList[eloIndex].name + ' ' + this.targetEloList[eloIndex].leagues[leagueIndex].name)
            }
          }
          if (eloIndex == end.elo) {
            for (let leagueIndex = 3; leagueIndex > end.league; leagueIndex--) {
              eloLeagues.push(this.targetEloList[eloIndex].name + ' ' + this.targetEloList[eloIndex].leagues[leagueIndex].name)
            }
          }
        } else {
          if (eloIndex < end.elo) {
            eloLeagues.push(this.targetEloList[eloIndex].name)
          }
        }
      }

      return newLeagueList
    },

    getServicePrice() {
      const leagueList = this.getLeagueList
      let keyCount = 0

      for (const item of leagueList) {
        // const eloIndex = Object.keys(item)[0];
        // const eloLeagues = item[eloIndex];
        // keyCount += eloLeagues.length;
        keyCount = leagueList
      }

      return 2
    }
  }
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  padding: 40px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  margin-inline: auto;
  gap: 3px;
}

.container {
  display: grid;
  grid-template-rows: repeat(11, 1fr);
}

.block {
  display: flex;
  justify-content: center;

  flex-grow: 1;
  border: 1px solid transparent;
  cursor: pointer;
}

img {
  height: 2rem;
}

.elo-block {
  display: flex;
  align-items: center;
  justify-content: center;

  flex-grow: 1;
  gap: 5px;
  width: 20vw;

  border: 1px solid transparent;
}

.elo-block:hover {
  background-color: rgb(0, 100, 100, 0.5);
}

.elo-block-selected {
  background-color: rgb(0, 100, 100, 0.5);
  border: 1px solid rgb(0, 100, 100);
}

.league-block {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-grow: 1;
}

.league-item {
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid transparent;
}

.league-item:hover {
  background-color: rgb(0, 100, 100, 0.5);
}

.league-item-impossible:hover {
  background-color: rgb(100, 0, 0, 0.5);
}

.league-item-selected {
  background-color: rgb(0, 100, 100, 0.5);
  border: 1px solid rgb(0, 100, 100);
}

.league-item-impossible:active {
  animation: shake 0.2s alternate;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(5px);
  }
}

/* ÁREA DE TESTES */
.price-container {
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
}
.price-container > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  min-width: 25vw;
}
.price-container > div > span {
  display: flex;
}
.red-text {
  color: red;
}
</style>
