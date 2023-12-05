<template>
  <section id="services">
    <template v-for="service in services" :key="service">
      <RouterLink :to="service.route" class="service">
        <img :src="service.image" alt="" />
        <h4>{{ service.description }}</h4>
        <h2>{{ service.title }}</h2>
        <button>{{ service.buttonText }}</button>
      </RouterLink>
    </template>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  data() {
    return {
      services: [
        { image: '/assets/star.png', subtitle: 'Suba de elo', title: 'EloJob', description: 'Serviço mais rápido, jogaremos na sua conta subindo seu elo de acordo com a sua compra', buttonText: 'Escolher', route: '/elojob' },
        { image: '/assets/star.png', subtitle: 'Aprenda jogando', title: 'DuoJob', description: 'Você sobe de elo enquanto joga e aprende com um dos nossos boosters de alto nível', buttonText: 'Escolher', route: '/duojob' },
        { image: '/assets/star.png', subtitle: 'Comece bem', title: 'MD5', description: 'Realizamos sua série de classificação MD5 garantindo ao menos de 60% de vitória', buttonText: 'Escolher', route: '/md5' },
        { image: '/assets/star.png', subtitle: 'Estude o jogo', title: 'Shiro Tips', description: 'Tenha acesso ao nosso guia de altíssima qualidade sobre a fase de rotas', buttonText: 'Escolher', route: '/tips' }
      ]
    }
  },
  created() {},
  computed: {},
  methods: {},
  components: { RouterLink }
}
</script>

<style scoped>
#services {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  justify-self: center;

  width: 80vw;
  gap: 30px;
  padding-top: 10vh;
  margin-bottom: 30vh;

  flex-wrap: nowrap;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
}

.service {
  background-color: rgb(30, 30, 45);
  border: 2px solid orange;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  min-width: 260px;
  width: 260px;
  height: 400px;
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
  margin-top: 20px;
  color: rgb(185, 255, 255);
  text-align: center;
}

.service button {
  background-color: orange;
  color: black;
  width: 100%;
  height: fit-content;
  padding: 12px;
  border: 1px solid orange;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  justify-self: end;
}
</style>
