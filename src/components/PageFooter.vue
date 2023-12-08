<template>
  <footer ref="footer" id="footer">
    <ul>
      <div class="title">
        <img src="/assets/riven.png" alt="" />
        <h2>ShiroJobs</h2>
      </div>
      <p>League of Legends and Valorant are registered trademarks of Riot Games, Inc. We are in no way affiliated with, associated with or endorsed by Riot Games, Inc.</p>
    </ul>
    <ul class="hideItem">
      <h2 class="title">Jogos</h2>
      <a class="item" href="https://playvalorant.com/" target="_blank">League of Legends</a>
      <a class="item" href="https://leagueoflegends.com/" target="_blank">Valorant</a>
    </ul>
    <ul class="hideItem">
      <h2 class="title">Páginas</h2>
      <RouterLink class="item" to="/md5">Shiro Tips</RouterLink>
      <RouterLink class="item" to="/elojob">EloJob</RouterLink>
      <RouterLink class="item" to="/duojob">DuoJob</RouterLink>
      <RouterLink class="item" to="/md5">MD5</RouterLink>
    </ul>
    <ul class="hideItem">
      <h2 class="title">Contato</h2>
      <a class="item" href="https://whatsa.me/5547984940663/?t=Ol%C3%A1,%20gostaria%20de%20pedir%20um%20elojob%20na%20ShiroJobs" target="blank">Wathsapp</a>
      <a class="item" href="mailto:gabrielmonteiro1111@gmail.com">E-mail</a>
      <RouterLink class="item" to="/">Chat</RouterLink>
    </ul>
  </footer>
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

#footer {
  background-color: rgb(20, 20, 30);

  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  justify-items: center;

  padding: 40px 60px;
  gap: 50px;
}

ul {
  display: flex;
  flex-direction: column;
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

.item {
  color: rgb(160, 160, 220);
  cursor: pointer;
  margin-bottom: 5px;
}

.item:hover {
  color: white;
}

@media (max-width: 768px) {
  #footer {
    display: none;
  }
}
</style>
