<template>
  <main>
    <ul>
      <div class="title">
        <img src="/assets/riven.png" alt="" />
        <h2>ShiroJobs</h2>
      </div>
      <p>
        League of Legends and Valorant are registered trademarks of Riot Games, Inc. We are in no
        way affiliated with, associated with or endorsed by Riot Games, Inc.
      </p>
    </ul>
    <ul class="hidden">
      <h2 class="title">Jogos</h2>
      <li>League of Legends</li>
      <li>Valorant</li>
    </ul>
    <ul class="hidden">
      <h2 class="title">Páginas</h2>
      <li>EloJob</li>
      <li>DuoJob</li>
      <li>MD5</li>
    </ul>
    <ul>
      <h2 class="title">Contato</h2>
      <li>Wathsapp</li>
      <li>E-mail</li>
      <li>Chat</li>
    </ul>
  </main>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
* {
  transition: color 0.1s;
}

*::selection {
  color: rgb(68, 189, 229);
}

main {
  background-color: rgb(20, 20, 30);

  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  justify-items: center;

  padding: 40px 120px;
  gap: 50px;
}

div {
  display: flex;
  align-items: center;
}

img {
  height: 28px;
}

.title {
  color: whitesmoke;
  margin-bottom: 12px;
}

p {
  color: rgb(160, 160, 220);
}

li {
  color: rgb(160, 160, 220);
  cursor: pointer;
  margin-bottom: 5px;
}

li:hover {
  color: white;
}

@media (max-width: 1000px) {
  main {
    grid-template-columns: 1fr 1fr;
    padding: 40px;
  }

  .hidden {
    display: none;
  }
}
</style>
