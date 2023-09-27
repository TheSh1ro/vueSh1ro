<script>
export default {
  data() {
    return {
      totalPrice: null,

      currentEloName: null,
      currentEloImage: null,

      targetEloName: null,
      targetEloImage: null,

      deadline: null
    }
  },

  created() {
    this.totalPrice = this.$route.query.totalPrice

    this.currentEloName = this.$route.query.currentEloName
    this.currentEloImage = this.$route.query.currentEloImage

    this.targetEloName = this.$route.query.targetEloName
    this.targetEloImage = this.$route.query.targetEloImage

    this.deadline = this.$route.query.deadline
  }
}
</script>
<template>
  <div id="main">
    <div class="content">
      <div class="content-block method-block">
        <h1>Método de pagamento</h1>
        <div>
          <span>Crédito</span>
          <span>Débito</span>
          <span>Pix</span>
        </div>
      </div>
      <div class="content-block elo-block">
        <span class="elo-block-item">
          <img :src="currentEloImage" alt="" />
          <p>{{ currentEloName }}</p>
        </span>
        <span style="font-size: 1.5rem">Ao </span>
        <span class="elo-block-item">
          <img :src="targetEloImage" alt="" />
          <p>{{ targetEloName }}</p>
        </span>
      </div>
      <div class="content-block estimate-block">
        <p>Prazo estimado de {{ deadline }} dias</p>
        <p>
          por apenas
          <span style="color: rgb(200, 200, 60); font-weight: bold">R${{ totalPrice }}</span>
        </p>
      </div>
      <div class="content-block confirm-block">
        <button class="button">Confirmar compra</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  transition:
    background-color 0.5s,
    color 0.5s;
}

#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  padding: 40px;
}

.content {
  display: grid;
  padding: 50px;
  gap: 10vh;

  width: fit-content;
  height: fit-content;
  border: 10px double black;
  border-radius: 40px;
  background-color: rgb(29, 117, 151, 0.3);
}
.content-block {
  display: flex;
  justify-content: center;
  align-items: center;
}
.method-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 10px;
  flex-grow: 1;
}
.method-block > h1 {
  color: rgb(60, 200, 60, 0.9);
}
.method-block > div {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  gap: 5px;
}
.method-block > div > span {
  cursor: pointer;
  padding: 5px;
}

.method-block > div > span:hover {
  color: cyan;
}

.elo-block {
  justify-content: space-evenly;
}
.elo-block-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.elo-block-item > img {
  height: 2rem;
}

.estimate-block {
  display: flex;
  flex-direction: column;
}

.button {
  color: black;
  padding: 5px;
  border: 5px double black;
  border-radius: 7px;
  cursor: pointer;
}
.button:hover {
  background-color: rgba(250, 250, 250, 0.5);
}
</style>
