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
:root {
  --purple: rgb(152, 42, 255);
  --selectHover: rgb(0, 255, 255, 0.05);
  --selectTrue: rgb(0, 255, 255, 0p.1);
  --blockSelection: rgba(255, 0, 0, 0.2);
}

::-webkit-scrollbar {
  width: 5px;
  background-color: white;
}
::-webkit-scrollbar-thumb {
  background-color: black;
}

#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 8vh minmax(92vh, 1fr) 14vh;

  font-family: Calibri;
  color: white;

  background-image: url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_30.jpg);
  background-size: cover;
}
</style>