<script>
export default {
  data() {
    return {
      eloAtual: [
        { name: 'Ferro', image: '/src/assets/iron.png', visible: true },
        { name: 'Bronze', image: '/src/assets/bronze.png', visible: true },
        { name: 'Prata', image: '/src/assets/silver.png', visible: true },
        { name: 'Ouro', image: '/src/assets/gold.png', visible: true },
        { name: 'Platina', image: '/src/assets/platinum.png', visible: true },
        { name: 'Esmeralda', image: '/src/assets/emerald.png', visible: true },
        { name: 'Diamante', image: '/src/assets/diamond.png', visible: true },
        { name: 'Mestre', image: '/src/assets/master.png', visible: true },
        { name: 'Grão Mestre', image: '/src/assets/grandmaster.png', visible: true },
        { name: 'Desafiante', image: '/src/assets/challenger.png', visible: true }
      ],
      eloDesejado: [
        { name: 'Ferro', image: '/src/assets/iron.png', visible: true },
        { name: 'Bronze', image: '/src/assets/bronze.png', visible: true },
        { name: 'Prata', image: '/src/assets/silver.png', visible: true },
        { name: 'Ouro', image: '/src/assets/gold.png', visible: true },
        { name: 'Platina', image: '/src/assets/platinum.png', visible: true },
        { name: 'Esmeralda', image: '/src/assets/emerald.png', visible: true },
        { name: 'Diamante', image: '/src/assets/diamond.png', visible: true },
        { name: 'Mestre', image: '/src/assets/master.png', visible: true },
        { name: 'Grão Mestre', image: '/src/assets/grandmaster.png', visible: true },
        { name: 'Desafiante', image: '/src/assets/challenger.png', visible: true }
      ],
      eloSelecionado: {
        atual: { name: null, league: null, index: null },
        desejado: { name: null, league: null, index: null }
      }
    }
  },
  methods: {
    toggleVisibilityAtual(elo, index) {
      // Esconder seleção de liga desejada (Estética)
      this.eloDesejado.forEach((elo) => {
        elo.visible = true
      })

      // Caso já tenha selecionado um elo desejado, ao selecionar um elo atual maior limpa a seleção do desejado
      if (this.eloSelecionado.desejado.index < index) {
        this.eloSelecionado.desejado.name = null
        this.eloSelecionado.desejado.league = null
        this.eloSelecionado.desejado.index = null
      }

      // Selecionar elo acima do mestre sem mostrar ligas
      if (index > 6) {
        this.selectLeague('atual', elo, 1, index)
      }

      // Ao clicar no elo, mostrar as divisões (ligas) para seleção
      this.eloAtual.forEach((elo, i) => {
        if (i == index && index <= 6) {
          elo.visible = !elo.visible
        } else {
          elo.visible = true
        }
      })
    },

    toggleVisibilityDesejado(elo, index, league) {
      // Esconder seleção de liga atual (Estética)
      this.eloAtual.forEach((elo) => {
        elo.visible = true
      })

      // Impedir seleção de liga maior que a atual no mesmo elo (Exemplo, ir do bronze 2 ao bronze 4)
      if (index == this.eloSelecionado.atual.index && league >= this.eloSelecionado.atual.league) {
        return
      }

      // Impedir selecionar o elo desejado antes ou abaixo do atual (Exemplo, ir do ouro ao prata)
      if (this.eloSelecionado.atual.name == null || this.eloSelecionado.atual.index > index) {
        return
      }

      // Impedir selecionar o elo desejado igual ao elo atual caso a divisão atual seja 1)
      if (this.eloSelecionado.atual.index == index && this.eloSelecionado.atual.league == 1) {
        return
      }

      // Selecionar divisão acima do mestre sem mostrar ligas
      if (index > 6) {
        this.selectLeague('desejado', elo, 1, index)
      }

      // Habilitar seleção de liga após clicar no elo
      this.eloDesejado.forEach((elo, i) => {
        if (i == index && index <= 6) {
          elo.visible = !elo.visible
        } else {
          elo.visible = true
        }
      })
    },

    selectLeague(type, elo, league, index) {
      if (type == 'atual') {
        // Evitar seleção de elo atual superior ou igual ao elo desejado
        if (
          this.eloSelecionado.desejado.index == index &&
          this.eloSelecionado.desejado.league >= league
        ) {
          this.eloSelecionado.desejado.name = null
          this.eloSelecionado.desejado.league = null
          this.eloSelecionado.desejado.index = null
        }

        // Preencher this.eloSelecionado.atual
        this.eloSelecionado.atual.name = elo.name
        this.eloSelecionado.atual.league = league
        this.eloSelecionado.atual.index = index
      }

      // Preencher this.eloSelecionado.desejado
      if (type == 'desejado') {
        if (
          index == this.eloSelecionado.atual.index &&
          league >= this.eloSelecionado.atual.league
        ) {
          return
        }

        this.eloSelecionado.desejado.name = elo.name
        this.eloSelecionado.desejado.league = league
        this.eloSelecionado.desejado.index = index
      }
    }
  }
}
</script>
<template>
  <main id="main-container">
    <div id="content-container">
      <div class="rank-containers">
        <div class="rank-container">
          <template v-for="(elo, index) in eloAtual" :key="index">
            <li class="rank-row">
              <span
                class="rank"
                @click="toggleVisibilityAtual(elo, index)"
                v-if="elo.visible"
                :class="{ selectedRank: eloSelecionado.atual.name == elo.name }"
              >
                <img :src="elo.image" alt="" />
                <p>
                  {{ elo.name }}
                </p>
              </span>
              <div class="league-row" v-if="!elo.visible">
                <span
                  class="league"
                  @click="toggleVisibilityAtual(elo, index), selectLeague('atual', elo, 1, index)"
                  >I</span
                >
                <span
                  class="league"
                  @click="toggleVisibilityAtual(elo, index), selectLeague('atual', elo, 2, index)"
                  >II</span
                >
                <span
                  class="league"
                  @click="toggleVisibilityAtual(elo, index), selectLeague('atual', elo, 3, index)"
                  >III</span
                >
                <span
                  class="league"
                  @click="toggleVisibilityAtual(elo, index), selectLeague('atual', elo, 4, index)"
                  >IV</span
                >
              </div>
            </li>
          </template>
        </div>

        <div class="rank-container">
          <template v-for="(elo, index) in eloDesejado" :key="index">
            <li
              class="rank-row"
              v-if="
                (index >= eloSelecionado.atual.index && index <= 6) ||
                (index > 6 && eloSelecionado.atual.index < index)
              "
            >
              <span
                class="rank"
                @click="toggleVisibilityDesejado(elo, index, null)"
                v-if="elo.visible"
                :class="{
                  selectedRank: eloSelecionado.desejado.name == elo.name,
                  selectionBlocked:
                    eloSelecionado.atual.index > index ||
                    eloSelecionado.atual.name == null ||
                    (eloSelecionado.atual.index == index && eloSelecionado.atual.league == 1)
                }"
              >
                <img :src="elo.image" alt="" />
                <p>
                  {{ elo.name }}
                </p>
              </span>
              <div class="league-row" v-if="!elo.visible">
                <span
                  class="league"
                  @click="
                    toggleVisibilityDesejado(elo, index, 1), selectLeague('desejado', elo, 1, index)
                  "
                  :class="{
                    selectionBlocked:
                      eloSelecionado.atual.league <= 1 && eloSelecionado.atual.index == index
                  }"
                  >I</span
                >
                <span
                  class="league"
                  @click="
                    toggleVisibilityDesejado(elo, index, 2), selectLeague('desejado', elo, 2, index)
                  "
                  :class="{
                    selectionBlocked:
                      eloSelecionado.atual.league <= 2 && eloSelecionado.atual.index == index
                  }"
                  >II</span
                >
                <span
                  class="league"
                  @click="
                    toggleVisibilityDesejado(elo, index, 3), selectLeague('desejado', elo, 3, index)
                  "
                  :class="{
                    selectionBlocked:
                      eloSelecionado.atual.league <= 3 && eloSelecionado.atual.index == index
                  }"
                  >III</span
                >
                <span
                  class="league"
                  @click="
                    toggleVisibilityDesejado(elo, index, 4), selectLeague('desejado', elo, 4, index)
                  "
                  :class="{
                    selectionBlocked:
                      eloSelecionado.atual.league <= 4 && eloSelecionado.atual.index == index
                  }"
                  >IV</span
                >
              </div>
            </li>
          </template>
        </div>
      </div>
      <div class="prize-container">
        <ul>
          <li>Classificação Atual</li>
          <li>{{ eloSelecionado.atual }}</li>
        </ul>
        <ul>
          <li>Classificação Desejada</li>
          <li>{{ eloSelecionado.desejado }}</li>
        </ul>
      </div>
    </div>
  </main>
</template>
<style scoped>
/* Estilos gerais */
#main-container {
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

#content-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 5vw;
  margin: 50px;
}

.rank-containers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  justify-items: center;
}

.rank-container {
  display: grid;
}

/* Estilos das linhas de classificações */
.rank-row {
  display: grid;
  cursor: pointer;
}

.rank {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  transition: background-color 0.2s;
}

.rank:hover {
  color: var(--selectHover);
}

.selectedRank {
  color: var(--selectedElo);
}

.rank > img {
  height: 1.5rem;
  width: 1.8rem;
}

@media (max-width: 900px) {
  .rank > img {
    display: none;
  }
}

.rank > p {
  text-align: center;
  transition: color 0.3s;
}

.league-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.league {
  display: flex;
  justify-content: center;
  align-items: center;
}

.league:hover {
  color: var(--selectHover);
}

/* Estilos de bloqueio de seleção */
.selectionBlocked:hover {
  color: red;
}

.selectionBlocked:active {
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

/* Estilos do container de prêmios */
.prize-container {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
