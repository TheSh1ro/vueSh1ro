<script></script>
<template>
  <main id="main">
    <div id="content">
      <div class="container">
        <ul class="startElo">
          <li style="cursor: default;">Elo atual</li>
          <hr />
          <li class="startElo-item">Ferro</li>
          <li class="startElo-item">Bronze</li>
          <li class="startElo-item">Prata</li>
          <li class="startElo-item">Ouro</li>
          <li class="startElo-item">Platina</li>
          <li class="startElo-item">Esmeralda</li>
          <li class="startElo-item">Diamante</li>
          <li class="startElo-item">Mestre</li>
          <li class="startElo-item">Grão Mestre</li>
        </ul>
        <ul class="endElo">
          <li style="cursor: default;">Elo desejado</li>
          <hr />
          <li class="endElo-item">Ferro</li>
          <li class="endElo-item">Bronze</li>
          <li class="endElo-item">Prata</li>
          <li class="endElo-item">Ouro</li>
          <li class="endElo-item">Platina</li>
          <li class="endElo-item">Esmeralda</li>
          <li class="endElo-item">Diamante</li>
          <li class="endElo-item">Mestre</li>
          <li class="endElo-item">Grão Mestre</li>
        </ul>
      </div>
    </div>
  </main>
</template>
<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: stretch;
}

#content {
  display: flex;
  margin: 50px;
}

.container {
  background-color: rgb(255, 255, 255, 0.1);
  font-size: 1.2rem;
  border: 10px double white;
  border-radius: 30px;

  padding: 20px;
  flex-grow: 1;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  
}

.startElo-item,
.endElo-item {
  cursor: pointer;
  transition: color 0.2s;
}
.startElo-item:hover,
.endElo-item:hover {
  color: bisque;
}

hr {
  margin-block: 5px;
}
</style>
