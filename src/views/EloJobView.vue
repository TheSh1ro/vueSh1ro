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
          image: '/src/assets/iron.webp'
        },
        {
          name: 'Bronze',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/bronze.webp'
        },
        {
          name: 'Prata',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/silver.webp'
        },
        {
          name: 'Ouro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/gold.webp'
        },
        {
          name: 'Platina',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'current',
          image: '/src/assets/platinum.webp'
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
          image: '/src/assets/diamond.webp'
        },
        {
          name: 'Mestre',
          leagues: null,
          visible: true,
          type: 'current',
          image: '/src/assets/master.webp'
        },
        {
          name: 'Grão Mestre',
          leagues: null,
          visible: true,
          type: 'current',
          image: '/src/assets/grandmaster.webp'
        }
      ],

      targetElo: [
        {
          name: 'Ferro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/iron.webp'
        },
        {
          name: 'Bronze',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/bronze.webp'
        },
        {
          name: 'Prata',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/silver.webp'
        },
        {
          name: 'Ouro',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/gold.webp'
        },
        {
          name: 'Platina',
          leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
          visible: true,
          type: 'target',
          image: '/src/assets/platinum.webp'
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
          image: '/src/assets/diamond.webp'
        },
        {
          name: 'Mestre',
          leagues: null,
          visible: true,
          type: 'target',
          image: '/src/assets/master.webp'
        },
        {
          name: 'Grão Mestre',
          leagues: null,
          visible: true,
          type: 'target',
          image: '/src/assets/grandmaster.webp'
        },
        {
          name: 'Desafiante',
          leagues: null,
          visible: true,
          type: 'target',
          image: '/src/assets/challenger.webp'
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
        current: { name: null, league: null, index: null, image: null },
        target: { name: null, league: null, index: null, image: null }
      },

      computedEloArray: [],
      totalPrice: null,
      totalLeagues: null
    }
  },
  methods: {
    toggleSelectorCurrent(elo, index) {
      // Calcular preço do elojob
      if (this.selectedElo.current.name != null && this.selectedElo.target.name != null) {
        this.getComputedElo()
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
        this.getComputedElo()
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
            this.resetSelection()
          }

          this.selectedElo.current.name = elo.name
          this.selectedElo.current.image = elo.image
          this.selectedElo.current.league = leagueIndex
          this.selectedElo.current.index = index
        }

        // Entre mestre e desafiante
        if (index >= 7) {
          if (index >= this.selectedElo.target.index) {
            this.resetSelection()
          }

          this.selectedElo.current.name = elo.name
          this.selectedElo.current.image = elo.image
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
          this.selectedElo.target.image = elo.image
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
          this.selectedElo.target.image = elo.image
          this.selectedElo.target.league = 0
          this.selectedElo.target.index = index
        }
        this.toggleSelectorTarget(elo, index)
      }
    },

    resetSelection() {
      this.selectedElo.target.name = null
      this.selectedElo.target.league = null
      this.selectedElo.target.index = null
      this.computedEloArray = []
      this.totalPrice = 0
      this.totalLeagues = 0
    },

    getComputedElo() {
      const currentIndex = this.selectedElo.current.index
      const targetIndex = this.selectedElo.target.index

      this.computedEloArray = [] // Limpa o array antes de calcular novamente
      this.totalPrice = 0
      this.totalLeagues = 0

      for (let index = currentIndex; index <= targetIndex; index++) {
        const currentElo = { ...this.currentElo[index] }
        const price = this.priceList[index]
        let multiplier = 4

        // Elos acima do mestre recebem multiplier = 1
        if (index >= 7) {
          multiplier = 1
        }

        // O elo inicial selecionado recebe o multiplicador conforme a liga selecionada / First run
        if (index == currentIndex && index <= 6) {
          multiplier = this.selectedElo.current.league + 1
        }

        // O elo final selecionado recebe o multiplicador inverso a liga selecionada / Last run
        if (index == targetIndex) {
          if (index <= 6) {
            switch (this.selectedElo.target.league) {
              case 3:
                multiplier = 0
                return
              case 2:
                multiplier = 1
                break
              case 1:
                multiplier = 2
                break
              case 0:
                multiplier = 3
                break
            }
          } else {
            return
          }
        }

        // Caso o elo final seja igual ao elo inicial, calcular preço por divisão:
        if (currentIndex == targetIndex) {
          multiplier = this.selectedElo.current.league - this.selectedElo.target.league
        }

        const computedElo = {
          name: currentElo.name,
          price: price.value,
          index: index,
          multiplier: multiplier
        }

        // Calcular quantidade de ligas, para calcular prazoo
        if (index <= 6) {
          this.totalLeagues += multiplier
        } else {
          this.totalLeagues += 7
        }

        this.computedEloArray.push(computedElo)
        this.totalPrice += computedElo.price * computedElo.multiplier
      }
    }
  },
  computed: {
    getCurrentSelected() {
      const elo = this.selectedElo.current
      if (elo.index >= 7) {
        return elo.name
      } else {
        return elo.name + ' ' + (elo.league + 1)
      }
    },

    getTargetSelected() {
      const elo = this.selectedElo.target
      if (elo.index >= 7) {
        return elo.name
      } else {
        return elo.name + ' ' + (elo.league + 1)
      }
    }
  }
}
</script>
<template>
  <main id="main">
    <div :class="{ contentSingle: !totalPrice, contentDual: totalPrice }">
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
            <div
              class="rank-row"
              v-if="
                index >= selectedElo.current.index &&
                !(index == selectedElo.current.index && selectedElo.current.league == 0)
              "
            >
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
      <div class="priceBox" v-if="totalPrice">
        <div class="priceBox-block">
          <div class="priceBox-elo">
            <img class="priceBox-image" :src="selectedElo.current.image" alt="" />
            <p class="priceBox-name">{{ getCurrentSelected }}</p>
          </div>
          <h2>ao</h2>
          <div class="priceBox-elo">
            <img class="priceBox-image" :src="selectedElo.target.image" alt="" />
            <p class="priceBox-name">{{ getTargetSelected }}</p>
          </div>
        </div>
        <div class="priceBox-block">
          <RouterLink
            class="priceBox-button"
            :to="{
              path: '/payment',
              query: {
                totalPrice: totalPrice,
                currentEloName: getCurrentSelected,
                currentEloImage: selectedElo.current.image,
                targetEloName: getTargetSelected,
                targetEloImage: selectedElo.target.image,
                deadline: totalLeagues * 2
              }
            }"
          >
            Confirmar por:
            <p style="color: rgb(47, 255, 95)">R${{ totalPrice }}</p>
          </RouterLink>
        </div>
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
  padding: 40px;
}

.contentSingle {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
}

.contentDual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.rankBox {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 20px;
  width: 40vw;
  gap: 5px;
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

  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  padding-inline: 5px;
}

.row-elo {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5px;
}
.row-elo > img {
  height: 2rem;
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
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
  align-self: center;
  height: fit-content;
}

.priceBox-block {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.priceBox-block > div {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.priceBox-block > div > img {
  height: 12vw;
}
.priceBox-button {
  background-color: black;
  border: 1px solid white;
  border-radius: 5px;

  display: flex;
  gap: 3px;
  padding: 5px;

  transition: background-color 0.1s;
}
.priceBox-button:hover {
  background-color: rgba(0, 0, 255, 0.2);
}
</style>
