<script>
export default {
  data() {
    return {
      eloAtual: [
        { name: 'Ferro', image: '/src/assets/iron.png', visible: true, leaguePrice: 10 },
        { name: 'Bronze', image: '/src/assets/bronze.png', visible: true, leaguePrice: 15 },
        { name: 'Prata', image: '/src/assets/silver.png', visible: true, leaguePrice: 20 },
        { name: 'Ouro', image: '/src/assets/gold.png', visible: true, leaguePrice: 25 },
        { name: 'Platina', image: '/src/assets/platinum.png', visible: true, leaguePrice: 30 },
        { name: 'Esmeralda', image: '/src/assets/emerald.png', visible: true, leaguePrice: 35 },
        { name: 'Diamante', image: '/src/assets/diamond.png', visible: true, leaguePrice: 40 },
        { name: 'Mestre', image: '/src/assets/master.png', visible: true, leaguePrice: 45 },
        {
          name: 'Grão Mestre',
          image: '/src/assets/grandmaster.png',
          visible: true,
          leaguePrice: 50
        },
        { name: 'Desafiante', image: '/src/assets/challenger.png', visible: true, leaguePrice: 10 }
      ],
      eloDesejado: [
        { name: 'Ferro', image: '/src/assets/iron.png', visible: true, leaguePrice: 10 },
        { name: 'Bronze', image: '/src/assets/bronze.png', visible: true, leaguePrice: 15 },
        { name: 'Prata', image: '/src/assets/silver.png', visible: true, leaguePrice: 20 },
        { name: 'Ouro', image: '/src/assets/gold.png', visible: true, leaguePrice: 25 },
        { name: 'Platina', image: '/src/assets/platinum.png', visible: true, leaguePrice: 30 },
        { name: 'Esmeralda', image: '/src/assets/emerald.png', visible: true, leaguePrice: 35 },
        { name: 'Diamante', image: '/src/assets/diamond.png', visible: true, leaguePrice: 40 },
        { name: 'Mestre', image: '/src/assets/master.png', visible: true, leaguePrice: 45 },
        {
          name: 'Grão Mestre',
          image: '/src/assets/grandmaster.png',
          visible: true,
          leaguePrice: 50
        },
        { name: 'Desafiante', image: '/src/assets/challenger.png', visible: true, leaguePrice: 10 }
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
    },
    calcularPreçoTotal() {
      let totalPrice = 0 // Inicializa o preço total como zero

      // Verifica se o elo desejado foi selecionado
      if (
        this.eloSelecionado.desejado.name !== null &&
        this.eloSelecionado.desejado.league !== null &&
        this.eloSelecionado.atual.name !== null &&
        this.eloSelecionado.atual.league !== null
      ) {
        // Obtém o índice do elo atual e do elo desejado
        const atualIndex = this.eloAtual.findIndex(
          (elo) => elo.name === this.eloSelecionado.atual.name
        )
        const desejadoIndex = this.eloDesejado.findIndex(
          (elo) => elo.name === this.eloSelecionado.desejado.name
        )

        // Calcula o preço total com base nos elos e ligas selecionados
        for (let i = atualIndex; i < desejadoIndex; i++) {
          totalPrice += this.eloAtual[i].leaguePrice
        }
      }

      return totalPrice
    }
  }
}
</script>
<template>
  <main id="main">
    <div id="content">
      <div class="rank-containers">
        <div class="rank-container">
          <li class="title-row">Elo atual</li>
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
          <li class="title-row">Elo desejado</li>
          <template v-for="(elo, index) in eloDesejado" :key="index">
            <li
              class="rank-row"
              v-if="
                index >= eloSelecionado.atual.index &&
                !(eloSelecionado.atual.index == index && eloSelecionado.atual.league == 1)
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
        <ul>
          <li>Preço Total</li>
          <li>R$ {{ calcularPreçoTotal() }}</li>
        </ul>
      </div>
    </div>
  </main>
</template>
<style scoped>
/* Estilos gerais */
#main {
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

#content {
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 1fr;
  gap: 5vw;
  margin: 50px;
}

.rank-containers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-template-rows: 1fr;

  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0.1);
}

.rank-container {
  display: grid;
  grid-template-rows: repeat(11, 1fr);
}

/* Estilos das linhas de classificações */
.rank-row {
  display: grid;
  cursor: pointer;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 1px solid white;
}

.rank {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  transition: background-color 0.2s;
}

.rank:hover {
  color: var(--selectHover);
  background-color: rgba(0, 0, 0, 0.4);
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
  background-color: rgba(0, 0, 0, 0.4);
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
