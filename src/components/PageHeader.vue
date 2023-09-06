<script></script>
<template>
  <header id="header">
    <RouterLink to="/" class="item">sh1roJobs</RouterLink>
    <RouterLink to="/account" class="item">username</RouterLink>
  </header>
</template>
<style scoped>
#header {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: background-color 0.5s;
}
#header:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-inline: 10px;
  transition: color 0.5s, text-shadow 0.5s;
  height: 100%;
}
.item:hover {
  text-shadow: 0px 0px 5px white;
}
</style>
