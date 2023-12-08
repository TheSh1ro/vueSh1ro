<template>
  <main>
    <HomeBanner />
    <ServicesCarrossel />
  </main>
</template>

<script>
import HomeBanner from '../components/HomeBanner.vue'
import ServicesCarrossel from '../components/ServicesCarrossel.vue'

export default {
  components: { HomeBanner, ServicesCarrossel },
  data() {
    return {}
  },
  computed: {
    windowHeight() {
      return window.innerHeight
    }
  }
}
</script>

<style scoped>
main {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: calc(100vh - 60px - 15px) 1fr;

  padding-bottom: 27vh;
}
</style>
