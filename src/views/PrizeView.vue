<script></script>
<template>
  <main id="main">
    <div id="content">
      <div id="selectContainer">
        <div class="eloSelector">
          <ul class="eloList">
            <li class="eloList-title">Elo atual</li>
            <li class="elo-item">Ferro</li>
            <li class="elo-item">Bronze</li>
            <li class="elo-item">Prata</li>
            <li class="elo-item">Ouro</li>
            <li class="elo-item">Platina</li>
            <li class="elo-item">Esmeralda</li>
            <li class="elo-item">Diamante</li>
            <li class="elo-item">Mestre</li>
            <li class="elo-item" style="border-bottom-left-radius: 30px">Grão Mestre</li>
          </ul>
          <ul class="eloList">
            <li class="eloList-title">Elo desejado</li>
            <li class="elo-item">Ferro</li>
            <li class="elo-item">Bronze</li>
            <li class="elo-item">Prata</li>
            <li class="elo-item">Ouro</li>
            <li class="elo-item">Platina</li>
            <li class="elo-item">Esmeralda</li>
            <li class="elo-item">Diamante</li>
            <li class="elo-item">Mestre</li>
            <li class="elo-item">Grão Mestre</li>
            <li class="elo-item" style="border-bottom-right-radius: 30px">Desafiante</li>
          </ul>
        </div>
      </div>
      <div id="prizeContainer"></div>
    </div>
  </main>
</template>
<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

#content {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  margin: 50px;
}

#selectContainer {
  background-color: rgb(255, 255, 255, 0.1);
  border: 1px solid white;
  border-radius: 30px;

  display: grid;
  grid-template-rows: 1fr;
}

.modalChanger {
  display: flex;
}
.modal {
  border-bottom: 1px solid white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;

  flex-grow: 1;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.modal:hover {
  border-bottom: 1px solid var(--purple);
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--purple);
}

.eloSelector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-size: 1.3rem;
}

.eloList {
  display: grid;
  grid-template-rows: 8vh auto;
}
.eloList-title {
  cursor: pointer;
  font-weight: bold;
  border-bottom: 1px solid white;

  flex-grow: 1;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.elo-item {
  flex-grow: 1;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
.elo-item:active {
  background-color: black;
}
.elo-item:hover {
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--purple);
}

hr {
  margin-block: 0px;
}

#prizeContainer {
  background-color: rgb(255, 255, 255, 0.1);
  border: 1px solid white;
  border-radius: 30px;

  display: grid;
  grid-template-rows: 7vh 1fr;
}
</style>
