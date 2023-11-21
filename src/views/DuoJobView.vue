<template>
  <main id="main">
    <section class="selection">
      <div class="selection-column">
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
                    'league-item-selected':
                      selectedElo.current.index == eloIndex &&
                      selectedElo.current.leagueIndex == leagueIndex
                  }"
                >
                  {{ league.name }}
                </span>
              </template>
            </div>
          </div>
        </template>
      </div>

      <div class="selection-column">
        <h2 class="block">Elo desejado</h2>
        <template v-for="(elo, eloIndex) in targetEloList" :key="eloIndex">
          <div
            class="block"
            v-if="
              selectedElo.current.index == null ||
              eloIndex > selectedElo.current.index ||
              (eloIndex == selectedElo.current.index && selectedElo.current.leagueIndex > 0)
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
                      selectedElo.current &&
                      leagueIndex >= selectedElo.current.leagueIndex &&
                      eloIndex == selectedElo.current.index,
                    'league-item-selected':
                      selectedElo.target &&
                      selectedElo.target.index == eloIndex &&
                      selectedElo.target.leagueIndex == leagueIndex
                  }"
                >
                  {{ league.name }}
                </span>
              </template>
            </div>
          </div>
        </template>
      </div>
    </section>
    <section class="visualization" v-if="selectedElo.current.name && selectedElo.target.name">
      <PriceSection
        :serviceType="serviceType"
        :priceList="priceList"
        :selectedElo="selectedElo"
        :getLeagueList="getLeagueList"
        :getServiceDeadline="getServiceDeadline"
        :getServicePrice="getServicePrice"
        :cleanCurrentElo="cleanCurrentElo"
        :cleanTargetElo="cleanTargetElo"
      />
    </section>
  </main>
</template>

<script>
import PriceSection from '../components/PriceSection.vue'

export default {
  components: { PriceSection },

  data() {
    return {
      serviceType: 'Duo',
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
          image: 'assets/iron.png'
        },
        target: {
          name: 'Desafiante',
          index: 9,
          leagueIndex: null,
          image: 'assets/challenger.png'
        }
      },
      priceList: [
        { name: 'Ferro', value: 10, deadline: 2 },
        { name: 'Bronze', value: 10, deadline: 2 },
        { name: 'Prata', value: 12.5, deadline: 2 },
        { name: 'Ouro', value: 15, deadline: 2 },
        { name: 'Platina', value: 22.5, deadline: 2 },
        { name: 'Esmeralda', value: 30, deadline: 2 },
        { name: 'Diamante', value: 45, deadline: 2 },
        { name: 'Mestre', value: 600, deadline: 14 },
        { name: 'Grão Mestre', value: 1200, deadline: 14 }
      ]
    }
  },
  methods: {
    cleanCurrentElo() {
      this.selectedElo.current = {}
    },

    cleanTargetElo() {
      this.selectedElo.target = {}
    },

    selectElo(elo, type, eloIndex, leagueIndex) {
      if (elo.leagues != null) {
        // CLICANDO EM LIGA
        if (leagueIndex != null) {
          if (type == 'current') {
            if (eloIndex > this.selectedElo.target.index) {
              this.cleanTargetElo()
            }
            if (
              eloIndex == this.selectedElo.target.index &&
              leagueIndex <= this.selectedElo.target.leagueIndex
            ) {
              window.alert(this.selectedElo.target.index)
              this.cleanTargetElo()
            }
          }

          if (
            type == 'target' &&
            eloIndex == this.selectedElo.current.index &&
            leagueIndex >= this.selectedElo.current.leagueIndex
          ) {
            return
          }

          this.toggleLeagueVisibility(elo, type, eloIndex)

          this.selectedElo[type] = {
            name: elo.name,
            index: eloIndex,
            leagueIndex: leagueIndex,
            image: elo.image
          }
        } else {
          // Caso esteja clicando para visualizar as ligas de um elo
          this.toggleLeagueVisibility(elo, type, eloIndex)
        }
      } else {
        this.toggleLeagueVisibility(elo, type, eloIndex)
        if (type == 'current' && eloIndex >= this.selectedElo.target.index) {
          this.selectedElo.target = {}
        }

        this.selectedElo[type] = {
          name: elo.name,
          index: eloIndex,
          leagueIndex: leagueIndex,
          image: elo.image
        }
      }
    },

    toggleLeagueVisibility(elo, column, index) {
      const eloList = this[column + 'EloList']
      const status = eloList[index].visible

      // Oculta todas as ligas da primeira coluna
      this.currentEloList.forEach((e) => {
        e.visible = true
      })

      // Oculta todas as ligas da segunda coluna
      this.targetEloList.forEach((e) => {
        e.visible = true
      })

      // Caso possua ligas: torna visível ou oculta as ligas do elo clicado
      if (elo.leagues) {
        eloList[index].visible = !status
      }
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

      const leagueList = []

      // Cria um array com 10 arrays vazios que serão preenchidos ou não
      for (let i = 0; i < 10; i++) {
        leagueList.push([])
      }

      // leagueList.push conforme os elos selecionados
      for (let eloIndex = start.elo; eloIndex <= end.elo; eloIndex++) {
        if (this.targetEloList[eloIndex].leagues != null) {
          if (eloIndex == start.elo && eloIndex != end.elo) {
            // Itera as ligas do start.elo a menos que end.elo == start.elo
            for (let leagueIndex = start.league; leagueIndex >= 0; leagueIndex--) {
              leagueList[eloIndex].push(
                this.targetEloList[eloIndex].name +
                  ' ' +
                  this.targetEloList[eloIndex].leagues[leagueIndex].name
              )
            }
          }
          if (eloIndex != start.elo && eloIndex != end.elo) {
            // Itera as ligas entre o start.elo e o end.elo
            for (let leagueIndex = 3; leagueIndex >= 0; leagueIndex--) {
              leagueList[eloIndex].push(
                this.targetEloList[eloIndex].name +
                  ' ' +
                  this.targetEloList[eloIndex].leagues[leagueIndex].name
              )
            }
          }
          if (eloIndex == end.elo) {
            // Itera as ligas do end.elo
            for (let leagueIndex = 3; leagueIndex > end.league; leagueIndex--) {
              leagueList[eloIndex].push(
                this.targetEloList[eloIndex].name +
                  ' ' +
                  this.targetEloList[eloIndex].leagues[leagueIndex].name
              )
            }
          }
        } else {
          // < end.elo : último elo selecionado não deve ser listado, ele é o fim.
          if (eloIndex < end.elo) {
            leagueList[eloIndex].push(this.targetEloList[eloIndex].name)
          }
        }
      }

      return leagueList
    },

    getServicePrice() {
      const leagueList = this.getLeagueList
      const priceList = this.priceList

      let totalPrice = 0

      // Adiciona ao preço comparando leagueList com priceList / Desafiante não conta < 9
      for (let index = 0; index < 9; index++) {
        totalPrice += leagueList[index].length * priceList[index].value
      }

      return totalPrice
    },

    getServiceDeadline() {
      const leagueList = this.getLeagueList
      const priceList = this.priceList

      let totalDays = 0

      for (let index = 0; index < 9; index++) {
        totalDays += leagueList[index].length * priceList[index].deadline
      }

      return totalDays
    }
  }
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-evenly;

  padding: 40px;
  gap: 30px;
}

@media (max-width: 1000px) {
  #main {
    flex-direction: column;
  }
  .selection {
    min-height: 75vh;
  }
}

.selection {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}

.visualization {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr;

  height: 100%;
  width: 100%;
}

.selection-column {
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
  background-color: rgb(0, 100, 100, 0.3);
}

.elo-block-selected {
  background-color: rgb(0, 100, 100, 0.3);
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
  background-color: rgb(0, 100, 100, 0.3);
}

.league-item-impossible:hover {
  background-color: rgb(100, 0, 0, 0.3);
}

.league-item-selected {
  background-color: rgb(0, 100, 100, 0.3);
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
</style>
