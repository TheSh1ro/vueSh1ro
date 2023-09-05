<script></script>
<template>
  <header id="header">
    <div class="item">sh1roJobs</div>
    <div class="item">username</div>
  </header>
</template>
<style scoped>
#header {
  background-color: rgba(0, 0, 0, 0.8);
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
