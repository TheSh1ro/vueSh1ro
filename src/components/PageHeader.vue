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
  font-size: 1.8rem;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 10px;

  transition: background-color 0.5s;
}
#header:hover {
  background-color: black;
}

.item {
  cursor: pointer;
  transition: color 0.5s;
}
.item:hover {
}
</style>
