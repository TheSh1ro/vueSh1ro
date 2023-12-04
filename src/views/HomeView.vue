<template>
  <main>
    <section id="apresentation">
      <img src="/assets/giphy.gif" alt="" />
      <div>
        <h1>SUBA DE ELO E FAÇA PARTE DOS 0.1% MELHORES JOGADORES</h1>
        <p>Ajudamos você a subir de ELO, garantir recompensas de temporada e deixar os jogadores que estragam as suas partidas para trás.</p>
        <button @click="animateServices">Nossos serviços</button>
      </div>
    </section>
    <section id="services">
      <RouterLink to="/elojob" class="service" v-if="showService.includes(1)" @click="this.$scrollToTop()">
        <img src="/assets/star.png" alt="" />
        <div>
          <h4>Suba de elo</h4>
          <h2>EloJob</h2>
          <p>Serviço mais rápido, jogaremos na sua conta subindo seu elo de acordo com a sua compra</p>
        </div>
        <button>Escolher</button>
      </RouterLink>

      <RouterLink to="/duojob" class="service" v-if="showService.includes(2)" @click="this.$scrollToTop()">
        <img src="/assets/star.png" alt="" />
        <div>
          <h4>Aprenda jogando</h4>
          <h2>DuoJob</h2>
          <p>Você sobe de elo enquanto joga e aprende com um dos nossos boosters de alto nível</p>
        </div>
        <button>Escolher</button>
      </RouterLink>
      <RouterLink to="/" class="service" v-if="showService.includes(3)" @click="this.$scrollToTop()" @mouseover="constructionState('md5', 1)" @mouseout="constructionState('md5', 0)">
        <img src="/assets/star.png" alt="" />
        <div>
          <h4>Comece bem</h4>
          <h2>MD5</h2>
          <p>Realizamos sua série de classificação MD5 garantindo ao menos de 60% de vitória</p>
        </div>
        <button ref="md5">Escolher</button>
      </RouterLink>
      <RouterLink to="/" class="service" v-if="showService.includes(4)" @click="this.$scrollToTop()" @mouseover="constructionState('tips', 1)" @mouseout="constructionState('tips', 0)">
        <img src="/assets/star.png" alt="" />
        <div>
          <h4>Estude o jogo</h4>
          <h2>Shiro Tips</h2>
          <p>Tenha acesso ao nosso guia de altissima qualidade sobre a fase de rotas</p>
        </div>
        <button ref="tips">Escolher</button>
      </RouterLink>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      showService: [1, 2, 3, 4]
    }
  },
  computed: {},
  methods: {
    constructionState(cardRef, isOver) {
      if (isOver) {
        this.$refs[cardRef].innerText = 'Em manuntenção'
        this.$refs[cardRef].style.backgroundColor = 'black'
        this.$refs[cardRef].style.color = 'red'
        this.$refs[cardRef].style.borderColor = 'red'
      } else {
        this.$refs[cardRef].innerText = 'Escolher'
        this.$refs[cardRef].style.backgroundColor = 'orange'
        this.$refs[cardRef].style.color = 'black'
        this.$refs[cardRef].style.borderColor = 'orange'
      }
    },

    async animateServices() {
      // Scrollar para os serviços
      document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
      })

      // Animar apenas uma vez por carregamento na página
      if (this.showService.includes('stop')) {
        return
      }

      // Anulando animação!!!!!!!!!!!!!!!!!!
      this.showService = [1, 2, 3, 4]
      const showService = this.showService

      async function pushWithDelay(value, delay) {
        return new Promise((resolve) => {
          setTimeout(() => {
            showService.push(value)
            resolve()
          }, delay)
        })
      }

      await pushWithDelay(1, 500)
      await pushWithDelay(2, 100)
      await pushWithDelay(3, 100)
      await pushWithDelay(4, 100)
      await pushWithDelay('stop')
    }
  }
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
  width: 70%;
  height: fit-content;
}

#apresentation div {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 20rem;
  color: cyan;
}

#apresentation img {
  height: 30vw;
  filter: hue-rotate(180deg) contrast(2);
}

#apresentation button {
  background-color: transparent;
  width: fit-content;
  padding: 12px 20px;
  border-radius: 25px;
  border: 2px solid cyan;
  transition: box-shadow 0.2s;
  color: whitesmoke;
  cursor: pointer;
  text-align: center;
}
#apresentation button:hover {
  border: 2px solid cyan;
  box-shadow: 0px 0px 20px cyan;
}

#apresentation h1 {
  color: white;
}

#services {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  gap: 30px;
  min-height: 100vh;
  margin-bottom: 20vh;
}

.service {
  background-color: rgb(30, 30, 45);
  border: 2px solid orange;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  width: 200px;
  height: 340px;
  border-radius: 20px;
  padding: 40px 35px;

  transition:
    background-color 0.3s,
    box-shadow 0.3s,
    opacity 1s ease;
  cursor: pointer;
}

.service:hover {
  box-shadow: 0px 0px 20px 0px orange;
  background-color: transparent;
}

.service:hover button {
  color: orange;
  background-color: transparent;
}

.service div {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.service img {
  width: 7rem;
  height: 7rem;
  filter: hue-rotate(200deg);
}

.service h4 {
  color: orange;
}

.service h2 {
  color: whitesmoke;
}

.service p {
  margin-top: 10px;
  color: rgb(185, 255, 255);
}

.service button {
  background-color: orange;
  color: black;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid orange;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  margin-top: auto;
}

@media (min-width: 1900px) {
  #apresentation {
    font-size: 1.3rem;
  }
  #apresentation div {
    width: 30rem;
  }
  #apresentation button {
    padding: 20px 35px;
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 10px;
  }

  #services {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    gap: 60px;
    min-height: 100vh;
    margin-bottom: 20vh;
  }
  .service {
    display: flex;
    flex-direction: column;

    width: 250px;
    height: 380px;
    background-color: rgb(30, 30, 45);
    border-radius: 20px;
    padding: 40px 35px;

    transition:
      background-color 0.3s,
      box-shadow 0.3s,
      opacity 1s ease;
    cursor: pointer;
  }
  .service div {
    justify-content: center;
    flex-grow: 1;
  }
  .service p {
    padding-top: 15px;
  }
  .service button {
    height: 40px;
    font-size: 1rem;
  }
}
</style>
