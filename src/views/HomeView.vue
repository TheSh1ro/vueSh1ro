<template>
  <main>
    <section id="apresentation">
      <img src="/assets/giphy.gif" alt="" />
      <div>
        <h1>SUBA DE ELO E FAÇA PARTE DOS 0.1% MELHORES JOGADORES</h1>
        <p>
          Ajudamos você a subir de ELO, garantir recompensas de temporada e deixar os jogadores que
          estragam as suas partidas para trás.
        </p>
        <a href="#services">Nossos serviços</a>
      </div>
    </section>
    <section id="services">
      <div class="service">
        <img src="/assets/star.png" alt="" />
        <div>
          <h4>Suba de elo</h4>
          <h2>EloJob</h2>
          <p>
            Serviço mais rápido, jogaremos na sua conta subindo seu elo de acordo com a sua compra
          </p>
        </div>
        <button>Escolher</button>
      </div>
      <div class="service">
        <img src="/assets/star.png" alt="" />
        <div>
          <h4>Melhore jogando</h4>
          <h2>DuoJob</h2>
          <p>Você sobe de elo enquanto joga e aprende com um dos nossos boosters de alto nível</p>
        </div>
        <button>Escolher</button>
      </div>
      <div class="service">
        <img src="/assets/star.png" alt="" />
        <div>
          <h4>Comece bem</h4>
          <h2>MD5</h2>
          <p>Realizamos sua série de classificação MD5 garantindo ao menos de 60% de vitória</p>
        </div>
        <button>Escolher</button>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {}
}
</script>

<style scoped>
main {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;

  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 92vh 1fr;
}

#apresentation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  gap: 20px;
  width: 50%;
  height: fit-content;
}

#apresentation div {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 20rem;
  color: cyan;
  font-weight: bold;
}

#apresentation img {
  height: 30vw;
  filter: hue-rotate(180deg) contrast(2);
}

#apresentation a {
  background-color: transparent;
  width: fit-content;
  padding: 20px 35px;
  border-radius: 25px;
  border: 2px solid cyan;
  transition: box-shadow 0.2s;
  color: whitesmoke;
  cursor: pointer;
}

#apresentation a:hover {
  border: 2px solid cyan;
  box-shadow: 0px 0px 25px 0px cyan;
}

#apresentation h1 {
  color: white;
}

#services {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;

  gap: 30px;
  margin-bottom: 20vh;
}

.service {
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 200px;
  border: 2px solid cyan;
  background-color: rgb(30, 30, 45);
  border-radius: 20px;
  padding: 55px 35px;
}

.service div {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.service h4 {
  color: orange;
}

.service h2 {
  color: whitesmoke;
}

.service p {
  color: rgb(185, 255, 255);
}

.service img {
  width: 7rem;
  height: 7rem;
}
</style>
