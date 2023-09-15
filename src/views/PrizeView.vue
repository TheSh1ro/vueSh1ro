<script>
export default {
  data() {
    return {
      eloAtual: [
        { name: 'Ferro', visible: 1 },
        { name: 'Bronze', visible: 1 },
        { name: 'Prata', visible: 1 },
        { name: 'Ouro', visible: 1 },
        { name: 'Platina', visible: 1 },
        { name: 'Esmeralda', visible: 1 },
        { name: 'Diamante', visible: 1 },
        { name: 'Mestre', visible: 1 },
        { name: 'Grão Mestre', visible: 1 }
      ],
      eloDesejado: [
        { name: 'Ferro', visible: 1 },
        { name: 'Bronze', visible: 1 },
        { name: 'Prata', visible: 1 },
        { name: 'Ouro', visible: 1 },
        { name: 'Platina', visible: 1 },
        { name: 'Esmeralda', visible: 1 },
        { name: 'Diamante', visible: 1 },
        { name: 'Mestre', visible: 1 },
        { name: 'Grão Mestre', visible: 1 },
        { name: 'Desafiante', visible: 1 }
      ],
      eloSelecionado: {
        atual: { name: '', league: null },
        desejado: { name: '', league: null }
      }
    }
  },
  methods: {
    toggleVisibilityAtual(elo, index) {
      this.eloAtual.forEach((elo, i) => {
        if (i == index) {
          elo.visible = !elo.visible
        } else {
          elo.visible = 1
        }
      })
    },
    toggleVisibilityDesejado(elo, index) {
      this.eloDesejado.forEach((elo, i) => {
        if (i == index) {
          elo.visible = !elo.visible
        } else {
          elo.visible = 1
        }
      })
    },
    selectElo(type, name, league) {
      if (type == 1) {
        this.eloSelecionado.atual.name = name
        this.eloSelecionado.atual.league = league
      }
      if (type == 2) {
        this.eloSelecionado.desejado.name = name
        this.eloSelecionado.desejado.league = league
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
              <span class="row-elo" @click="toggleVisibilityAtual(elo, index)" v-if="elo.visible">
                {{ elo.name }}
              </span>
              <div class="row-league" v-if="!elo.visible">
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectElo(1, elo.name, 1)"
                  >I</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectElo(1, elo.name, 2)"
                  >II</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectElo(1, elo.name, 3)"
                  >III</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityAtual(elo, index), selectElo(1, elo.name, 4)"
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
              >
                {{ elo.name }}
              </span>
              <div class="row-league" v-if="!elo.visible">
                <span
                  class="league-item"
                  @click="toggleVisibilityDesejado(elo, index), selectElo(2, elo.name, 1)"
                  >I</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityDesejado(elo, index), selectElo(2, elo.name, 2)"
                  >II</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityDesejado(elo, index), selectElo(2, elo.name, 3)"
                  >III</span
                >
                <span
                  class="league-item"
                  @click="toggleVisibilityDesejado(elo, index), selectElo(2, elo.name, 4)"
                  >IV</span
                >
              </div>
            </li>
          </ul>
        </body>
      </div>
      <div id="prizeContainer">
        <p>{{ eloSelecionado }}</p>
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
  background-color: rgba(0, 0, 0, 0.8);
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
  background-color: rgba(0, 0, 0, 0.8);
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
