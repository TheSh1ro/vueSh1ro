<script>
export default {
  data() {
    return {
      currentElo: [
        {
          name: 'Ferro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/iron.png'
        },
        {
          name: 'Bronze',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/bronze.png'
        },
        {
          name: 'Prata',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/silver.png'
        },
        {
          name: 'Ouro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/gold.png'
        },
        {
          name: 'Platina',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/platinum.png'
        },
        {
          name: 'Esmeralda',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/emerald.png'
        },
        {
          name: 'Diamante',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/diamond.png'
        },
        {
          name: 'Mestre',
          leagues: null,
          visible: true,
          type: 'current',
          image: '/src/assets/master.png'
        },
        {
          name: 'Grão Mestre',
          leagues: null,
          visible: true,
          type: 'current',
          image: '/src/assets/grandmaster.png'
        },
        {
          name: 'Desafiante',
          leagues: null,
          visible: true,
          type: 'current',
          image: '/src/assets/challenger.png'
        }
      ],

      targetElo: [
        {
          name: 'Ferro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/iron.png'
        },
        {
          name: 'Bronze',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/bronze.png'
        },
        {
          name: 'Prata',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/silver.png'
        },
        {
          name: 'Ouro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/gold.png'
        },
        {
          name: 'Platina',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/platinum.png'
        },
        {
          name: 'Esmeralda',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/emerald.png'
        },
        {
          name: 'Diamante',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/diamond.png'
        },
        {
          name: 'Mestre',
          leagues: null,
          visible: true,
          type: 'target',
          image: '/src/assets/master.png'
        },
        {
          name: 'Grão Mestre',
          leagues: null,
          visible: true,
          type: 'target',
          image: '/src/assets/grandmaster.png'
        },
        {
          name: 'Desafiante',
          leagues: null,
          visible: true,
          type: 'target',
          image: '/src/assets/challenger.png'
        }
      ],

      priceList: [
        { name: 'Ferro', value: 10 },
        { name: 'Bronze', value: 10 },
        { name: 'Prata', value: 12.5 },
        { name: 'Ouro', value: 15 },
        { name: 'Platina', value: 22.5 },
        { name: 'Esmeralda', value: 30 },
        { name: 'Diamante', value: 45 },
        { name: 'Mestre', value: 600 },
        { name: 'Grão Mestre', value: 1200 },
        { name: 'Desafiante', value: 0 }
      ],

      selectedElo: {
        current: { name: null, league: null, index: null },
        target: { name: null, league: null, index: null }
      },

      computedEloArray: [],
      totalPrice: null
    }
  },
  methods: {
    toggleSelectorCurrent(elo, index) {
      // Calcular preço do elojob
      if (this.selectedElo.current.name != null && this.selectedElo.target.name != null) {
        this.calculatePrice()
      }

      // Ao selecionar diamante-, mostrar seletor de divisão ao clicar
      if (index <= 6) {
        this.currentElo.forEach((elo, i) => {
          if (i === index) {
            elo.visible = !elo.visible
          } else {
            elo.visible = true
          }
        })
      } else {
        this.currentElo.forEach((elo) => {
          elo.visible = true
        })
      }

      // Fechar seletor de divisão da coluna oposta (estética)
      this.targetElo.forEach((elo) => {
        elo.visible = true
      })
    },

    toggleSelectorTarget(elo, index) {
      // Calcular preço do elojob
      if (this.selectedElo.current.name != null && this.selectedElo.target.name != null) {
        this.calculatePrice()
      }

      // Ao selecionar diamante-, mostrar seletor de divisão ao clicar
      if (index <= 6) {
        this.targetElo.forEach((elo, i) => {
          if (i === index) {
            elo.visible = !elo.visible
          } else {
            elo.visible = true
          }
        })
      } else {
        this.targetElo.forEach((elo) => {
          elo.visible = true
        })
      }

      // Fechar seletor de divisão da coluna oposta (estética)
      this.currentElo.forEach((elo) => {
        elo.visible = true
      })
    },

    selectElo(elo, index, leagueIndex) {
      if (elo.type == 'current') {
        // Entre ferro e diamante, (executado apenas ao clicar na divisão, não no elo)
        if (index <= 6 && leagueIndex != null) {
          // Reseta selectedElo caso seja inferior elo atual
          if (
            index > this.selectedElo.target.index ||
            (index == this.selectedElo.target.index &&
              leagueIndex <= this.selectedElo.target.league)
          ) {
            this.resetTargetSelection()
          }

          this.selectedElo.current.name = elo.name
          this.selectedElo.current.league = leagueIndex
          this.selectedElo.current.index = index
        }

        // Entre mestre e desafiante
        if (index >= 7) {
          if (index >= this.selectedElo.target.index) {
            this.resetTargetSelection()
          }

          this.selectedElo.current.name = elo.name
          this.selectedElo.current.league = 0
          this.selectedElo.current.index = index
        }

        this.toggleSelectorCurrent(elo, index)
      }

      if (elo.type == 'target') {
        // Bloquear seleção caso o elo seja: inferior ao elo atual EX: (Platina ao Ouro) ou mesmo elo porém com divisão inferior EX: (Platina 2 ao Platina 4)
        if (
          index < this.selectedElo.current.index ||
          (index == this.selectedElo.current.index &&
            leagueIndex >= this.selectedElo.current.league)
        ) {
          return
        }

        // Entre ferro e diamante, (executado apenas ao clicar na divisão, não no elo)
        if (index <= 6 && leagueIndex != null) {
          this.selectedElo.target.name = elo.name
          this.selectedElo.target.league = leagueIndex
          this.selectedElo.target.index = index
        }

        // Entre mestre e desafiante
        if (index >= 7) {
          // Bloquear seleção caso o elo seja igual ao elo atual (Ex: Mestre - Mestre)
          if (index == this.selectedElo.current.index) {
            return
          }

          this.selectedElo.target.name = elo.name
          this.selectedElo.target.league = 0
          this.selectedElo.target.index = index
        }
        this.toggleSelectorTarget(elo, index)
      }
    },

    resetTargetSelection() {
      this.selectedElo.target.name = null
      this.selectedElo.target.league = null
      this.selectedElo.target.index = null
    },

    calculatePrice() {
      const currentIndex = this.selectedElo.current.index
      const targetIndex = this.selectedElo.target.index

      this.computedEloArray = [] // Limpa o array antes de calcular novamente

      for (let index = currentIndex; index <= targetIndex; index++) {
        const currentElo = { ...this.currentElo[index] }
        const computedEloArray = this.computedEloArray
        const price = this.priceList[index]
        const computedElo = {
          name: currentElo.name,
          price: price.value,
          index: index,
          multiplier: 4
        }

        // Elos acima do mestre só multiplicam uma vez o valor
        if (index >= 7) {
          computedElo.multiplier = 1
        }

        // O elo inicial selecionado recebe o multiplicador da liga selecionada
        if (index == currentIndex && currentElo.leagues != null) {
          computedElo.multiplier = this.selectedElo.current.league + 1
        }

        // O elo final selecionado recebe o multiplicador da liga selecionada
        if (index == targetIndex && currentElo.leagues != null) {
          computedElo.multiplier = this.selectedElo.target.league + 1
        }

        // Última execução do loop
        if (index == targetIndex) {
          this.totalPrice = CHATGPT: Todos os price.value multiplicados pelo multiplier
        }

        computedEloArray.push(computedElo)
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
            <span class="row-title">Elo inicial</span>
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
                <img :src="elo.image" />
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
            <span class="row-title">Elo final</span>
          </div>
          <template v-for="(elo, index) in targetElo" :key="index">
            <div class="rank-row">
              <span
                class="row-elo"
                @click="selectElo(elo, index)"
                v-if="elo.visible"
                :class="{
                  'row-elo-selected': elo.name == selectedElo.target.name,
                  blockSelection:
                    index < selectedElo.current.index ||
                    (index >= 7 && index == selectedElo.current.index)
                }"
              >
                {{ elo.name }}
                <img :src="elo.image" />
              </span>
              <div class="row-league" v-if="!elo.visible">
                <template v-for="(league, leagueIndex) in elo.leagues" :key="leagueIndex">
                  <span
                    class="league-item"
                    @click="selectElo(elo, index, leagueIndex)"
                    :class="{
                      blockSelection:
                        index == selectedElo.current.index &&
                        leagueIndex >= selectedElo.current.league
                    }"
                  >
                    {{ league.name }}
                  </span>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="priceBox">
        <h1 class="priceHeader">Valor do serviço</h1>
        <body class="priceBody">
          <div class="priceBlock">
            <h2>current</h2>
            <p>{{ selectedElo.current }}</p>
          </div>
          <div class="priceBlock">
            <h2>target</h2>
            <p>{{ selectedElo.target }}</p>
          </div>
          <div class="priceBlock">
            <div v-for="(elo, index) in computedEloArray" :key="index">
              <p>{{ elo.name }} ao {{ currentElo[index + 1].name }}</p>
              <p>{{ elo.price * elo.multiplier }}</p>
              <!-- <p v-for="(item, key) in elo" :key="item">{{ key }}: {{ item }}</p> -->
            </div>
          </div>
        </body>
      </div>
    </div>
  </main>
</template>

<!-- v-if="index >= selectedElo.current.index && !(index == selectedElo.current.index && selectedElo.current.league == 0)" -->

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

#content {
  margin: 40px;

  display: flex;
  gap: 3vw;
}

.rankBox {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 20px;
  border: 1px solid white;
  width: fit-content;
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
  text-align: center;
  padding-inline: 5px;
}

.row-elo {
  flex-grow: 1;
  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5px;
}
.row-elo > img {
  height: 1.5rem;
}

.row-elo:hover {
  background-color: var(--selectHover);
}

.row-elo-selected {
  background-color: var(--selectTrue);
}

.row-elo-selected:hover {
  background-color: var(--selectTrue);
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

.blockSelection:hover {
  background-color: var(--blockSelection);
}
.blockSelection:active {
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

.priceBox {
  flex-grow: 1;

  display: grid;
  grid-template-rows: 1fr 10fr;
  border: 1px solid white;
}

.priceHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border-bottom: 1px solid white;
}

.priceBody {
  display: grid;
  grid-template-rows: 1fr 1fr 3fr;
}

.priceBlock {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  text-align: center;
  background-color: rgba(250, 250, 0, 0.1);
  justify-content: center;
  padding: 10px;
  gap: 5px;
}

.priceBlock > div {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  background-color: rgba(0, 100, 150, 0.5);
}
</style>
