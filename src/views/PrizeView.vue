<script>
export default {
  data() {
    return {
      currentElo: [
        {
          name: 'Ferro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current'
        },
        {
          name: 'Bronze',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current'
        },
        {
          name: 'Prata',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current'
        },
        {
          name: 'Ouro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current'
        },
        {
          name: 'Platina',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current'
        },
        {
          name: 'Esmeralda',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current'
        },
        {
          name: 'Diamante',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current'
        },
        { name: 'Mestre', visible: true, type: 'current' },
        { name: 'Grão Mestre', leagues: null, visible: true, type: 'current' },
        { name: 'Desafiante', leagues: null, visible: true, type: 'current' }
      ],
      targetElo: [
        {
          name: 'Ferro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target'
        },
        {
          name: 'Bronze',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target'
        },
        {
          name: 'Prata',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target'
        },
        {
          name: 'Ouro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target'
        },
        {
          name: 'Platina',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target'
        },
        {
          name: 'Esmeralda',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target'
        },
        {
          name: 'Diamante',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target'
        },
        { name: 'Mestre', visible: true, type: 'target' },
        { name: 'Grão Mestre', leagues: null, visible: true, type: 'target' },
        { name: 'Desafiante', leagues: null, visible: true, type: 'target' }
      ],
      selectedElo: {
        current: { name: null, league: null, index: null },
        target: { name: null, league: null, index: null }
      }
    }
  },
  methods: {
    toggleSelectorCurrent(elo, index) {
      // Caso seja diamante ou inferior, mostrar seletor de divisão ao clicar
      if (index <= 6) {
        this.currentElo.forEach((elo, i) => {
          if (i === index) {
            elo.visible = !elo.visible
          } else {
            elo.visible = true
          }
        })
      }

      // Fechar seletor de divisão da coluna oposta (estética)
      this.targetElo.forEach((elo) => {
        elo.visible = true
      })
    },

    toggleSelectorTarget(elo, index) {
      // Caso seja diamante ou inferior, mostrar seletor de divisão ao clicar
      if (index <= 6) {
        this.targetElo.forEach((elo, i) => {
          if (i === index) {
            elo.visible = !elo.visible
          } else {
            elo.visible = true
          }
        })
      }

      // Fechar seletor de divisão da coluna oposta (estética)
      this.currentElo.forEach((elo) => {
        elo.visible = true
      })
    },

    selectElo(elo, index, leagueIndex) {
      if (elo.type == 'current') {
        this.toggleSelectorCurrent(elo, index)
        if (index <= 6) {
          if (leagueIndex != null) {
            this.selectedElo.current.name = elo.name
            this.selectedElo.current.league = leagueIndex
            this.selectedElo.current.index = index
          }
        } else {
          this.selectedElo.current.name = elo.name
          this.selectedElo.current.league = 1
          this.selectedElo.current.index = index
        }
      }

      if (elo.type == 'target') {
        this.toggleSelectorTarget(elo, index)
        if (index <= 6) {
          if (leagueIndex != null) {
            this.selectedElo.target.name = elo.name
            this.selectedElo.target.league = leagueIndex
            this.selectedElo.target.index = index
          }
        }

        if (index >= 7) {
          this.selectedElo.target.name = elo.name
          this.selectedElo.target.league = 1
          this.selectedElo.target.index = index
        }
      }
    },

    resetSelection(type) {
      if (type == 'current') {
        this.selectedElo.current.name = null
        this.selectedElo.current.league = null
        this.selectedElo.current.index = null
      } else {
        this.selectedElo.target.name = null
        this.selectedElo.target.league = null
        this.selectedElo.target.index = null
      }
    }
  }
}
</script>
<template>
  <main id="main">
    <div id="content">
      <div class="rankBox">
        <div class="rank-column">
          <div class="rank-row">
            <span class="row-title">Elo atual</span>
          </div>
          <template v-for="(elo, index) in currentElo" :key="index">
            <div class="rank-row">
              <span
                class="row-elo"
                @click="selectElo(elo, index)"
                v-if="elo.visible"
                :class="{ 'row-elo-selected': elo.name == selectedElo.current.name }"
              >
                {{ elo.name }}
              </span>
              <div class="row-league" v-if="!elo.visible">
                <template v-for="(league, leagueIndex) in elo.leagues" :key="leagueIndex">
                  <span class="league-item" @click="selectElo(elo, index, leagueIndex)">
                    {{ league.name }}
                  </span>
                </template>
              </div>
            </div>
          </template>
        </div>

        <div class="rank-column">
          <div class="rank-row">
            <span class="row-title">Elo desejado</span>
          </div>
          <template v-for="(elo, index) in targetElo" :key="index">
            <div class="rank-row" v-if="index > selectedElo.current.index">
              <span
                class="row-elo"
                @click="selectElo(elo, index)"
                v-if="elo.visible"
                :class="{ 'row-elo-selected': elo.name == selectedElo.target.name }"
              >
                {{ elo.name }}
              </span>
              <div class="row-league" v-if="!elo.visible">
                <template v-for="(league, leagueIndex) in elo.leagues" :key="leagueIndex">
                  <span class="league-item" @click="selectElo(elo, index, leagueIndex)">
                    {{ league.name }}
                  </span>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="priceBox">
        <header class="priceHeader">Valor do serviço</header>
        <body class="priceBody">
          <div class="priceBody-box">
            <h1>current</h1>
            <p>{{ selectedElo.current }}</p>
          </div>
          <div class="priceBody-box">
            <h1>target</h1>
            <p>{{ selectedElo.target }}</p>
          </div>
          <div class="priceBody-box">
            <h1>result</h1>
            <p>R$0,00</p>
          </div>
        </body>
      </div>
    </div>
  </main>
</template>
<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

#content {
  margin: 40px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5vw;
}

.rankBox {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  row-gap: 20px;
  border: 1px solid white;
}

.rank-column {
  display: grid;
  grid-template-rows: repeat(11, 1fr);
}

.rank-row {
  display: flex;
  cursor: pointer;
}

.row-title {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid white;
  font-weight: bold;
  font-size: 1.5rem;
}

.row-elo {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;
}

.row-elo-selected {
  background-color: var(--selectHover);
}

.row-elo:hover {
  background-color: var(--selectHover);
}

.row-league {
  flex: 1;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.league-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.league-item:hover {
  background-color: var(--selectHover);
}

.priceBox {
  display: grid;
  grid-template-rows: 1fr 10fr;
  border: 1px solid white;
}

.priceHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-bottom: 1px solid white;
}

.priceBody {
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.priceBody-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}
</style>
