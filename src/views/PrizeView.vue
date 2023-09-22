<script>
export default {
  data() {
    return {
      data: {
        currentElo: [
          {
            name: 'Ferro',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Bronze',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Prata',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Ouro',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Platina',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Esmeralda',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Diamante',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          { name: 'Mestre', visible: true },
          { name: 'Grão Mestre', leagues: null, visible: true },
          { name: 'Desafiante', leagues: null, visible: true }
        ],
        targetElo: [
          {
            name: 'Ferro',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Bronze',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Prata',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Ouro',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Platina',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Esmeralda',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          {
            name: 'Diamante',
            leagues: [{ name: 'I' }, { name: 'II' }, { name: 'III' }, { name: 'IV' }],
            visible: true
          },
          { name: 'Mestre', visible: true },
          { name: 'Grão Mestre', leagues: null, visible: true },
          { name: 'Desafiante', leagues: null, visible: true }
        ],
        selectedElo: { current: { name: null, league: null }, target: { name: null, league: null } }
      }
    }
  }
}
</script>
<template>
  <main id="main">
    <div id="content">
      <div class="rankBox">
        <div class="rankBox-column">
          <template v-for="elo in this.currentElo">
            <p>{{ elo.name }}</p>
          </template>
        </div>
        <div class="rankBox-column">a</div>
      </div>

      <div class="priceBox">
        <head class="priceHeader">
          Valor do serviço
        </head>
        <body class="priceBody">
          <p></p>
          <p></p>
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
  grid-template-columns: repeat(3, 1fr);
}

.rank-container {
}
</style>
