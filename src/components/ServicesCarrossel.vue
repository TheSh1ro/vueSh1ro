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
        { title: 'EloJob', subtitle: 'Suba de elo', description: 'Serviço mais rápido, jogaremos na sua conta subindo seu elo de acordo com a sua compra', image: '/assets/challenger.png', route: '/elojob', buttonText: 'Escolher', isActive: true },
        { title: 'DuoJob', subtitle: 'Aprenda jogando', description: 'Você sobe de elo enquanto joga e aprende com um dos nossos diversos boosters', image: '/assets/challenger.png', route: '/duojob', buttonText: 'Escolher', isActive: true },
        { title: 'MD5', subtitle: 'Comece bem', description: 'Realizamos sua série de classificação MD5 garantindo ao menos de 60% de vitória', image: '/assets/challenger.png', route: '/md5', buttonText: 'Escolher', isActive: false },
        { title: 'Shiro Tips', subtitle: 'Estude o jogo', description: 'Tenha acesso ao nosso guia de altíssima qualidade sobre a fase de rotas', image: '/assets/challenger.png', route: '/tips', buttonText: 'Escolher', isActive: false }
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
  gap: 40px;

  border: 2px solid var(--blue);
  border-radius: 25px;
}

.service img {
  width: 120px;
}

.service div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.service h4 {
  color: orange;
}

.service h2 {
  color: white;
  margin-top: 3px;
}

.service p {
  color: var(--blue);
  margin-top: 20px;
}

.service button {
  width: 100%;
  border: none;
  background-color: var(--blue);
  color: black;
  padding-block: 8px;
}

.service button:hover {
}
</style>
