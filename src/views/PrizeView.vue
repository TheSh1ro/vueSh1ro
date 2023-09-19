<script>
export default {
  data() {
    return {
      eloAtual: [
        { name: 'Ferro', image: '../assets/iron.png', visible: true },
        { name: 'Bronze', image: '../assets/bronze.png', visible: true },
        { name: 'Prata', image: '../assets/silver.png', visible: true },
        { name: 'Ouro', image: '../assets/gold.png', visible: true },
        { name: 'Platina', image: '../assets/platinum.png', visible: true },
        { name: 'Esmeralda', image: '../assets/diamond.png', visible: true },
        { name: 'Diamante', image: '../assets/diamond.png', visible: true },
        { name: 'Mestre', image: '../assets/master.png', visible: true },
        { name: 'Grão Mestre', image: '../assets/grandmaster.png', visible: true }
      ],
      eloDesejado: [
        { name: 'Ferro', image: '../assets/iron.png', visible: true },
        { name: 'Bronze', image: '../assets/bronze.png', visible: true },
        { name: 'Prata', image: '../assets/silver.png', visible: true },
        { name: 'Ouro', image: '../assets/gold.png', visible: true },
        { name: 'Platina', image: '../assets/platinum.png', visible: true },
        { name: 'Esmeralda', image: '../assets/diamond.png', visible: true },
        { name: 'Diamante', image: '../assets/diamond.png', visible: true },
        { name: 'Mestre', image: '../assets/master.png', visible: true },
        { name: 'Grão Mestre', image: '../assets/grandmaster.png', visible: true },
        { name: 'Desafiante', image: '../assets/challenger.png', visible: true }
      ],
      eloSelecionado: {
        atual: { name: null, league: null, index: null },
        desejado: { name: null, league: null, index: null }
      }
    }
  },
  methods: {
    toggleVisibilityAtual(elo, index) {
      if (this.eloSelecionado.desejado.index < index) {
        this.eloSelecionado.desejado.name = null
        this.eloSelecionado.desejado.league = null
        this.eloSelecionado.desejado.index = null
      }

      // Selecionar elo acima do mestre sem mostrar ligas
      if (index > 6) {
        this.selectLeague('atual', elo, 1, index)
        return
      }

      // Ao clicar no elo, mostrar as divisões (ligas) para seleção
      this.eloAtual.forEach((elo, i) => {
        if (i == index) {
          elo.visible = !elo.visible
        } else {
          elo.visible = true
        }
      })
    },

    toggleVisibilityDesejado(elo, index, league) {
      // Impedir seleção de liga maior que a atual no mesmo elo (Exemplo, ir do bronze 2 ao bronze 4)
      if (index == this.eloSelecionado.atual.index && league >= this.eloSelecionado.atual.league) {
        return
      }

      // Impedir selecionar o elo desejado antes ou abaixo do atual (Exemplo, ir do ouro ao prata)
      if (this.eloSelecionado.atual.name == null || this.eloSelecionado.atual.index > index) {
        return
      }

      // Selecionar divisão acima do mestre sem mostrar ligas
      if (index > 6) {
        this.selectLeague('desejado', elo, 1, index)
        return
      }

      // Habilitar seleção de liga após clicar no elo
      this.eloDesejado.forEach((elo, i) => {
        if (i == index) {
          elo.visible = !elo.visible
        } else {
          elo.visible = true
        }
      })
    },

    selectLeague(type, elo, league, index) {
      // Preencher this.eloSelecionado.atual
      if (type == 'atual') {
        if (
          this.eloSelecionado.desejado.index == index &&
          this.eloSelecionado.desejado.league > league
        ) {
          this.eloSelecionado.desejado.name = null
          this.eloSelecionado.desejado.league = null
          this.eloSelecionado.desejado.index = null
        }

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
  <main id="main">
    <div id="content">
      <div id="selectContainer">
        <header class="box-header">
          <span>Elo Atual</span>
          <span>Elo Desejado</span>
        </header>
        <body class="box-body">
          <ul class="box-column">
            <li class="box-row" v-for="(elo, index) in eloAtual" :key="index">
              <span
                class="row-elo"
                @click="toggleVisibilityAtual(elo, index)"
                v-if="elo.visible"
                :class="{ rowSelected: eloSelecionado.atual.name == elo.name }"
              >
                {{ elo.name }}
              </span>
              <div class="row-league" v-if="!elo.visible">
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectLeague('atual', elo, 1, index)"
                  >I</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectLeague('atual', elo, 2, index)"
                  >II</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectLeague('atual', elo, 3, index)"
                  >III</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectLeague('atual', elo, 4, index)"
                  >IV</span
                >
              </div>
            </li>
            <li class="box-row">
              <span class="row-elo">- - - - -</span>
            </li>
          </ul>

          <ul class="box-column">
            <li class="box-row" v-for="(elo, index) in eloDesejado" :key="index">
              <span
                class="row-elo"
                @click="toggleVisibilityDesejado(elo, index, null)"
                v-if="elo.visible"
                :class="{
                  rowSelected: eloSelecionado.desejado.name == elo.name,
                  selectionBlocked: eloSelecionado.atual.index > index
                }"
                @mouseover="test"
              >
                {{ elo.name }}
              </span>
              <div class="row-league" v-if="!elo.visible">
                <span
                  class="league-item"
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
                  class="league-item"
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
                  class="league-item"
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
                  class="league-item"
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
          </ul>
        </body>
      </div>
      <div id="prizeContainer">
        <ul>
          <li>Atual</li>
        </ul>
        <ul>
          <li>Desejado</li>
        </ul>
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
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 5vw;
  margin: 50px;
}

#selectContainer {
  background-color: rgb(255, 255, 255, 0.1);
  border: 1px solid white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  display: grid;
  grid-template-rows: 1fr 10fr;
}
.box-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.box-header > span {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid white;
}
.box-body {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  cursor: pointer;
}
.box-column {
  display: grid;
}
.box-row {
  display: grid;
}

.row-elo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.row-elo:hover {
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
.rowSelected {
  background-color: rgba(0, 0, 0, 0.5);
}

.row-league {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.league-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.league-item:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.selectionBlocked:hover {
  background-color: rgba(150, 0, 0, 0.5);
}

#prizeContainer {
  background-color: rgb(255, 255, 255, 0.1);
  border: 1px solid white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
