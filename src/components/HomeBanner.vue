<template>
  <section id="banner" ref="banner">
    <img src="/assets/giphy.gif" alt="" class="hidden" />
    <div>
      <h1>SUBA DE ELO E FAÇA PARTE DOS 0.1% MELHORES JOGADORES</h1>
      <p>Ajudamos você a subir de ELO, garantir recompensas de temporada e deixar os jogadores que estragam as suas partidas para trás.</p>
      <button @click="scrollToServices()">Nossos serviços</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {
    scrollToServices() {
      const bannerHeight = this.$refs.banner.clientHeight

      window.scroll({
        top: bannerHeight
      })
    }
  }
}
</script>

<style scoped>
#banner {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 20px;
  user-select: none;
}

div {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 30%;
  color: cyan;
}

img {
  height: 30vw;
  filter: hue-rotate(180deg) contrast(2);
}

button {
  background-color: transparent;
  min-width: 12rem;
  width: 50%;
  padding: 18px;
  border-radius: 10px;
  border: 2px solid cyan;
  transition: box-shadow 0.2s;
  color: whitesmoke;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
}
button:hover {
  border: 2px solid cyan;
  box-shadow: 0px 0px 20px cyan;
}

h1 {
  color: white;
}

@media (max-width: 768px) {
  div {
    width: 60%;
  }
  .hidden {
    display: none;
  }
}
</style>
