<script>
export default {
  data() {
    return {
      data: {
        currentElo: {},
        targetElo: {},
        selectedElo: {}
      }
    }
  }
}
</script>
<template>
  <main id="main">
    <div id="content">
      <div class="rankBox">
        <div class="rankBox-column">a</div>
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
