<template>
  <section id="services">
    <template v-for="service in services" :key="service">
      <RouterLink :to="service.route" class="service" @click="handleClickedService">
        <img :src="service.image" alt="" />
        <div>
          <h4>{{ service.subtitle }}</h4>
          <h2>{{ service.title }}</h2>
          <p>{{ service.description }}</p>
        </div>
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
        {
          title: 'EloJob',
          subtitle: 'Melhore seu elo',
          description: 'Serviço mais rápido, jogaremos na sua conta subindo seu elo de acordo com a sua compra',
          image: '/assets/challenger.png',
          route: '/elojob',
          buttonText: 'Escolher',
          isActive: true
        },
        { title: 'DuoJob', subtitle: 'Aprenda jogando', description: 'Você sobe de elo enquanto joga e aprende com um dos nossos diversos boosters', image: '/assets/challenger.png', route: '/duojob', buttonText: 'Escolher', isActive: true },
        { title: 'MD5', subtitle: 'Tenha um bom início', description: 'Realizamos sua série de classificação MD5 garantindo ao menos de 60% de vitória', image: '/assets/challenger.png', route: '/md5', buttonText: 'Escolher', isActive: false },
        { title: 'Shiro Tips', subtitle: 'Estude o jogo conosco', description: 'Tenha acesso ao nosso guia de altíssima qualidade sobre a fase de rotas', image: '/assets/challenger.png', route: '/tips', buttonText: 'Escolher', isActive: false }
      ]
    }
  },
  created() {},
  computed: {},
  methods: {
    handleClickedService() {
      this.$scrollToTop()
    }
  },
  components: { RouterLink }
}
</script>

<style scoped>
#services {
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-x: scroll;

  gap: 2vw;
  margin-inline: 2vw;
}

.service {
  min-width: 200px;
  padding: 25px;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  text-align: center;

  border-radius: 20px;
  border: 2px solid cyan;
  background-color: rgb(25, 25, 40);
  transition: background-color 0.2s;
}

.service:hover {
  background-color: transparent;
  box-shadow: 0px 0px 25px cyan;
}

.service:hover button {
  background-color: transparent;
  color: cyan;
  border-color: cyan;
}

.service img {
  margin-top: 10px;
  width: 100px;
}

.service div {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-block: 15px 60px;
}

.service h4 {
  color: cyan;
}

.service h2 {
  color: white;
}

.service p {
  color: whitesmoke;
  margin-top: 10px;
}

.service button {
  width: 100%;
  border: 2px solid cyan;
  border-radius: 18px;
  background-color: cyan;
  color: black;
  padding-block: 12px;
}
</style>
