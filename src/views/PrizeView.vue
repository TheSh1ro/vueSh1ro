<script>
export default {
  data() {
    return {
      eloAtual: [
        { name: 'Ferro', visible: true },
        { name: 'Bronze', visible: true },
        { name: 'Prata', visible: true },
        { name: 'Ouro', visible: true },
        { name: 'Platina', visible: true },
        { name: 'Esmeralda', visible: true },
        { name: 'Diamante', visible: true },
        { name: 'Mestre', visible: true },
        { name: 'Grão Mestre', visible: true }
      ],
      eloDesejado: [
        { name: 'Ferro', visible: true },
        { name: 'Bronze', visible: true },
        { name: 'Prata', visible: true },
        { name: 'Ouro', visible: true },
        { name: 'Platina', visible: true },
        { name: 'Esmeralda', visible: true },
        { name: 'Diamante', visible: true },
        { name: 'Mestre', visible: true },
        { name: 'Grão Mestre', visible: true },
        { name: 'Desafiante', visible: true }
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

      // Selecionar divisão acima do mestre sem mostrar ligas
      if (index > 6) {
        this.selectElo('atual', elo, 1, index)
        return
      }

      // Habilitar seleção de liga após clicar no elo
      this.eloAtual.forEach((elo, i) => {
        if (i == index) {
          elo.visible = !elo.visible
        } else {
          elo.visible = true
        }
      })
    },

    toggleVisibilityDesejado(elo, index) {
      // Impedir selecionar o desejado antes ou abaixo do atual
      if (this.eloSelecionado.atual.name == null || this.eloSelecionado.atual.index > index) {
        return
      }

      // Selecionar divisão acima do mestre sem mostrar ligas
      if (index > 6) {
        this.selectElo('desejado', elo, 1, index)
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

    selectElo(type, elo, league, index) {
      // Preencher this.eloSelecionado.atual
      if (type == 'atual') {
        this.eloSelecionado.atual.name = elo.name
        this.eloSelecionado.atual.league = league
        this.eloSelecionado.atual.index = index

        // Deixar elo selecionado marcado
        this.eloAtual.forEach((elo) => {
          elo.selected = false
        })
        elo.selected = !elo.selected
      }

      // Preencher this.eloSelecionado.desejado
      if (type == 'desejado') {
        this.eloSelecionado.desejado.name = elo.name
        this.eloSelecionado.desejado.league = league
        this.eloSelecionado.desejado.index = index

        this.eloDesejado.forEach((elo) => {
          elo.selected = false
        })
        elo.selected = !elo.selected
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
                  @click="toggleVisibilityAtual(elo, index), selectElo('atual', elo, 1, index)"
                  >I</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectElo('atual', elo, 2, index)"
                  >II</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectElo('atual', elo, 3, index)"
                  >III</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectElo('atual', elo, 4, index)"
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
                @click="toggleVisibilityDesejado(elo, index)"
                v-if="elo.visible"
                :class="{
                  rowSelected: eloSelecionado.desejado.name == elo.name,
                  rowBlocked: eloSelecionado.atual.index > index
                }"
                @mouseover="test"
              >
                {{ elo.name }}
              </span>
              <div class="row-league" v-if="!elo.visible">
                <span
                  class="league-item"
                  @click="
                    toggleVisibilityDesejado(elo, index), selectElo('desejado', elo, 1, index)
                  "
                  >I</span
                >
                <span
                  class="league-item"
                  @click="
                    toggleVisibilityDesejado(elo, index), selectElo('desejado', elo, 2, index)
                  "
                  >II</span
                >
                <span
                  class="league-item"
                  @click="
                    toggleVisibilityDesejado(elo, index), selectElo('desejado', elo, 3, index)
                  "
                  >III</span
                >
                <span
                  class="league-item"
                  @click="
                    toggleVisibilityDesejado(elo, index), selectElo('desejado', elo, 4, index)
                  "
                  >IV</span
                >
              </div>
            </li>
          </ul>
        </body>
      </div>
      <div id="prizeContainer">
        <p>{{ eloSelecionado.atual }}</p>
        <p>{{ eloSelecionado.desejado }}</p>
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
.rowBlocked:hover {
  background-color: rgba(150, 0, 0, 0.5);
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
