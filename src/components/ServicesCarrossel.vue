<template>
  <section id="services" ref="servicesContainer" @wheel="handleMouseWheel">
    <template v-for="service in services" :key="service">
      <RouterLink :to="service.isActive ? service.route : '/'" class="service" @click="handleClickedService(id)">
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
import { usePurchaseStore } from '../stores/store.js'

export default {
  data() {
    return {
      services: [
        {
          title: 'MD5',
          subtitle: 'Tenha um bom início',
          description: 'Realizamos sua série de classificação MD5 garantindo ao menos de 60% de vitória',
          image: '/assets/challenger.png',
          route: '/md5',
          buttonText: 'Escolher',
          isActive: false
        },
        {
          title: 'EloJob',
          subtitle: 'Melhore seu elo',
          description: 'Serviço mais rápido, jogaremos na sua conta subindo seu elo de acordo com a sua compra',
          image: '/assets/challenger.png',
          route: '/elojob',
          buttonText: 'Escolher',
          isActive: true
        },
        {
          title: 'DuoJob',
          subtitle: 'Aprenda jogando',
          description: 'Você sobe de elo enquanto joga e aprende com um dos nossos diversos boosters',
          image: '/assets/challenger.png',
          route: '/duojob',
          buttonText: 'Escolher',
          isActive: true
        },
        {
          title: 'Shiro Tips',
          subtitle: 'Estude o jogo conosco',
          description: 'Tenha acesso ao nosso guia de altíssima qualidade sobre a fase de rotas',
          image: '/assets/challenger.png',
          route: '/tips',
          buttonText: 'Escolher',
          isActive: false
        }
      ]
    }
  },
  mounted() {
    this.centerScroll()
  },
  computed: {},
  methods: {
    handleMouseWheel(event) {
      if (window.innerWidth > 1160) return

      const container = this.$refs.servicesContainer

      const scrollAmount = 75 // Ajuste conforme necessário

      event.preventDefault()

      container.scrollLeft += event.deltaY > 0 ? scrollAmount : -scrollAmount
    },
    handleClickedService(id) {
      this.$scrollToTop()
      usePurchaseStore().clearPurchase()
    },
    centerScroll() {
      const container = this.$refs.servicesContainer
      const containerWidth = container.offsetWidth
      const servicesWidth = container.scrollWidth

      // Define o valor de scroll para o meio do contêiner
      container.scrollLeft = (servicesWidth - containerWidth) / 2
    }
  },
  components: { RouterLink }
}
</script>

<style scoped>
#services {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  width: fit-content;
  justify-self: center;

  min-width: 400px;
  max-width: 90vw;
  gap: 30px;
  padding: 10px;

  scroll-snap-type: x mandatory;
  overflow-x: scroll;
}

.service {
  padding: 25px;
  min-width: 220px;
  max-width: 14vw;
  min-height: 380px;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;

  text-align: center;
  border: 2px solid cyan;
  background-color: rgb(25, 25, 40);
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  border-radius: 10px;
}

.service:hover {
  background-color: transparent;
  box-shadow: 0px 0px 15px cyan;
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
  background-color: cyan;
  color: black;
  padding-block: 12px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  border-radius: 10px;
}

#services::-webkit-scrollbar {
  width: 10px; /* largura da barra de rolagem */
  height: 5px; /* largura da barra de rolagem */
}

#services::-webkit-scrollbar-thumb {
  background-color: cyan; /* cor do polegar (barra de rolagem móvel) */
  border-radius: 10px; /* borda do polegar */
}

/* Para navegadores Firefox */
#services {
  scrollbar-width: thin;
  scrollbar-color: cyan rgb(25, 25, 40);
}

@media (max-width: 1160px) {
  #services::-webkit-scrollbar-track {
    background-color: rgb(25, 25, 40); /* cor da trilha da barra de rolagem */
  }
}
</style>
