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
  },
  methods: {
    toggleSelector(elo, index) {
      console.log(index)
      if (index < 7) {
        this.currentElo.forEach((elo, i) => {
          if (i === index) {
            elo.visible = !elo.visible
          } else {
            elo.visible = true
          }
        })
      } else {
        this.currentElo.forEach((elo, i) => {
          elo.visible = true
        })
      }
    }
  }
}
</script>
<template>
  <main id="main">
    <div id="content">
      <div class="rankBox">
        <div class="rank-column">
          <div class="rank-row">
            <span class="row-title">Elo atual</span>
          </div>
          <template v-for="(elo, eloIndex) in this.currentElo" :key="index">
            <div class="rank-row">
              <span class="row-elo" @click="toggleSelector(elo, eloIndex)" v-if="elo.visible">
                {{ elo.name }}
              </span>
              <div class="row-league" v-if="!elo.visible">
                <template v-for="(league, leagueIndex) in elo.leagues" :key="league.name">
                  <span class="league-item" @click="toggleSelector(elo, eloIndex)">
                    {{ league.name }}
                  </span>
                </template>
              </div>
            </div>
          </template>
        </div>

        <div class="rank-column">
          <div class="rank-row">
            <span class="row-title">Elo desejado</span>
          </div>

          <template v-for="(elo, eloIndex) in this.targetElo" :key="index">
            <div class="rank-row">
              <span class="row-elo" @click="toggleSelector(elo, eloIndex)" v-if="elo.visible">
                {{ elo.name }}
              </span>
              <div class="row-league" v-if="!elo.visible">
                <template v-for="(league, leagueIndex) in elo.leagues" :key="index">
                  <span class="league-item" @click="toggleSelector(elo, eloIndex)">
                    {{ league.name }}
                  </span>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="priceBox">
        <header class="priceHeader">Valor do serviço</header>
        <body class="priceBody">
          <div class="priceBody-box">
            <h1>current</h1>
            <p>{{ selectedElo.current }}</p>
          </div>
          <div class="priceBody-box">
            <h1>target</h1>
            <p>{{ selectedElo.target }}</p>
          </div>
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
  gap: 5vw;
}

.rankBox {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  row-gap: 20px;
  border: 1px solid white;
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

  border-bottom: 1px solid white;
  font-weight: bold;
  font-size: 1.5rem;
}

.row-elo {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;
}

.row-elo:hover {
  background-color: var(--selectHover);
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

.priceBox {
  display: grid;
  grid-template-rows: 1fr 10fr;
  border: 1px solid white;
}

.priceHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-bottom: 1px solid white;
}

.priceBody {
  display: grid;
  justify-content: center;
  align-items: center;
}

.priceBody-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
