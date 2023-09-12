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
      ]
    }
  },
  methods: {
    toggleVisibility(elo) {
      elo.visible = !elo.visible
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
            <li
              class="box-item"
              v-for="(elo, index) in eloAtual"
              :key="elo.name"
              @click="toggleVisibility(elo)"
            >
              {{ elo.name }}
            </li>
          </ul>
          <ul class="box-column">
            <li
              class="box-item"
              v-for="(elo, index) in eloDesejado"
              :key="elo.name"
              @click="toggleVisibility(elo)"
            >
              <p v-if="elo.visible">{{ elo.name }}</p>
              <div></div>
            </li>
          </ul>
        </body>
      </div>
      <div id="prizeContainer"></div>
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
  border-radius: 30px;

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
}
.box-column {
  display: grid;
}
.box-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

#prizeContainer {
  background-color: rgb(255, 255, 255, 0.1);
  border: 1px solid white;
  border-radius: 30px;

  display: grid;
}
</style>
