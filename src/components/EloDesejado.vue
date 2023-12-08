<template>
  <main>
    <div class="column">
      <div class="row">
        <h2 class="title">Elo desejado</h2>
      </div>
      <template v-for="(elo, eloIndex) in eloList" :key="elo">
        <TransitionGroup name="list">
          <div class="row" v-if="!currentElo.name || (eloIndex == currentElo.eloIndex && currentElo.leagueIndex > 0) || eloIndex > currentElo.eloIndex">
            <div
              :class="{
                selected: elo.name == targetElo.name,
                blockedItem: eloIndex < currentElo.eloIndex
              }"
              class="elo"
              v-if="!elo.visibleLeagues"
              @click="showLeagues(elo, eloIndex)"
            >
              <img :src="elo.image" alt="" />
              <p>
                {{ targetElo.name == elo.name && !targetElo.isHigh ? elo.name + ' ' + (targetElo.leagueIndex + 1) : elo.name }}
              </p>
            </div>
            <div class="leagues" v-if="elo.visibleLeagues">
              <div
                :class="{
                  blockedItem: (eloIndex == this.currentElo.eloIndex && leagueIndex >= this.currentElo.leagueIndex) || eloIndex < currentElo.eloIndex
                }"
                class="league"
                v-for="(league, leagueIndex) in ['I', 'II', 'III', 'IV']"
                :key="league"
                @click="showLeagues(elo, eloIndex, leagueIndex)"
              >
                <p>{{ league }}</p>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </template>
    </div>
  </main>
</template>

<script>
export default {
  props: ['selectElo', 'currentElo', 'targetElo', 'scrollToFooterTop'],
  data() {
    return {
      eloList: [
        {
          name: 'Ferro',
          isHigh: false,
          image: 'assets/iron.png',
          visibleLeagues: false
        },
        {
          name: 'Bronze',
          isHigh: false,
          image: 'assets/bronze.png',
          visibleLeagues: false
        },
        {
          name: 'Prata',
          isHigh: false,
          image: 'assets/silver.png',
          visibleLeagues: false
        },
        { name: 'Ouro', isHigh: false, image: 'assets/gold.png', visibleLeagues: false },
        {
          name: 'Platina',
          isHigh: false,
          image: 'assets/platinum.png',
          visibleLeagues: false
        },
        {
          name: 'Esmeralda',
          isHigh: false,
          image: 'assets/emerald.png',
          visibleLeagues: false
        },
        {
          name: 'Diamante',
          isHigh: false,
          image: 'assets/diamond.png',
          visibleLeagues: false
        },
        {
          name: 'Mestre',
          isHigh: true,
          image: 'assets/master.png',
          visibleLeagues: false
        },
        {
          name: 'Grão Mestre',
          isHigh: true,
          image: 'assets/grandmaster.png',
          visibleLeagues: false
        },
        {
          name: 'Desafiante',
          isHigh: true,
          image: 'assets/challenger.png',
          visibleLeagues: false
        }
      ],
      newSelectedElo: []
    }
  },
  methods: {
    showLeagues(elo, eloIndex, leagueIndex) {
      // Salva o estado do seletor clicado
      const eloState = elo.visibleLeagues

      // Retorna todos os seletores para o estado natural
      // Futuramente apenas o clicado será mostrado ou não conforme (eloState)

      // Selecionado elo (que não possui ligas)
      if (elo.isHigh) {
        this.sendHideLeagues()
        this.handleSelectElo(elo, eloIndex)
        this.scrollToFooterTop()
      }

      // Selecionado elo (que possui ligas)
      if (leagueIndex != null) {
        // Tratamento de erros
        if (eloIndex == this.currentElo.eloIndex && leagueIndex >= this.currentElo.leagueIndex) {
          return
        }

        // Prosseguir
        this.sendHideLeagues()
        this.handleSelectElo(elo, eloIndex, leagueIndex)
        this.scrollToFooterTop()
      }

      // Seleção de duas etapas, a próxima se encaixará em um dos ifs acima
      if (!elo.isHigh && leagueIndex == null) {
        this.sendHideLeagues()
        elo.visibleLeagues = !eloState
      }
    },

    // Função chamada pelo componente pai
    hideLeagues() {
      this.eloList.forEach((element) => {
        element.visibleLeagues = false
      })
    },

    // Requisitar componente pai
    sendHideLeagues() {
      this.$emit('eloClicked')
    },

    handleSelectElo(elo, eloIndex, leagueIndex) {
      let newSelectedElo

      if (elo.isHigh) {
        newSelectedElo = {
          name: elo.name,
          image: elo.image,
          isHigh: elo.isHigh,
          eloIndex: eloIndex
        }
      } else {
        newSelectedElo = {
          name: elo.name,
          image: elo.image,
          isHigh: elo.isHigh,
          eloIndex: eloIndex,
          leagueIndex: leagueIndex
        }
      }

      this.selectElo('target', newSelectedElo)
    }
  }
}
</script>

<style scoped>
/* Transitions for list animations */
.list-enter-from {
  opacity: 0;
  transform: translateX(-10%);
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.list-leave-to {
  opacity: 0;
  transform: translateX(10%);
}

/* Main layout styles */
main {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.column {
  display: grid;
  grid-template-rows: repeat(11, 1fr);
  height: 100%;
  width: 100%;
  position: relative;
}

.row {
  display: flex;
  flex-grow: 1;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

/* Styles for elo and leagues */
.elo {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 8px;
  cursor: pointer;
  border: 1px solid transparent;
}

.leagues {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-grow: 1;
}

.league {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid transparent;
}

.elo:hover,
.league:hover {
  background-color: rgba(0, 100, 100, 0.5);
}

/* Styles for images and titles */
img {
  height: 2rem;
  margin-left: 5px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
}

/* Styles for selected and blocked items */
.selected,
.selected:hover {
  background-color: rgba(0, 100, 100, 0.5);
  border-color: rgba(0, 100, 100, 1);
}

.blockedItem:hover {
  background-color: rgba(100, 0, 0, 0.5);
  border-color: rgb(100, 0, 0);
}

.blockedItem:active {
  animation: shake 0.3s alternate;
}

/* Keyframes for shake animation */
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
