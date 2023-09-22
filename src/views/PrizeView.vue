<script>
export default {
  data() {
    return {
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
</script>
<template>
  <main id="main">
    <div id="content">
      <div class="rankBox">
        <div class="rank-column">
          <template v-for="(elo, index) in this.currentElo" :key="index">
            <div class="rank-row">
              <span class="row-elo" v-if="0">{{ elo.name }}</span>
              <div class="row-league" v-if="1">
                <span class="league-item">I</span>
                <span class="league-item">II</span>
                <span class="league-item">III</span>
                <span class="league-item">IV</span>
              </div>
            </div>
          </template>
        </div>
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
  grid-template-columns: repeat(2, 1fr);
}

.rankBox {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  border: 1px solid white;
}

.rank-column {
  display: grid;
  grid-template-rows: repeat(10, 1fr);
}

.rank-row {
  display: flex;
}

.row-elo {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;
}

.row-elo:hover {
  background-color: rgba(250, 250, 0, 0.3);
}

.row-league {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: red;
}
</style>
