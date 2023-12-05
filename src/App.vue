<script setup>
import { RouterView } from 'vue-router'
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
  --selectTrue: rgb(0, 255, 255, 0.1);
  --blockSelection: rgba(255, 0, 0, 0.2);
}

::-webkit-scrollbar {
  width: 5px;
  background-color: black;
}
::-webkit-scrollbar-thumb {
  background-color: cyan;
}

/* Remova o destaque de preenchimento automático */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}

/* Remova a borda que pode ser adicionada ao focar no input */
input:-webkit-autofill:focus {
  border: none;
}

html {
  scroll-behavior: smooth;
  font-size: 18px;
}

#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px minmax(calc(100vh - 60px), 1fr) auto;
  color: white;

  background-image: url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_30.jpg);
  background-size: cover;
}
</style>
