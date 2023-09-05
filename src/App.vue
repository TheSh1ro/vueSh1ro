<script setup>
import { RouterLink, RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import PageFooter from './components/PageFooter.vue'
</script>

<template>
  <PageHeader />
  <RouterView />
  <PageFooter />
</template>
<style>
#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 8vh minmax(92vh, 1fr) 14vh;

  font-family: Calibri;
  color: white;
  
  background-image: url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Riven_23.jpg);
  background-size: cover;
}
</style>
