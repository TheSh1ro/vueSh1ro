<script></script>
<template>
  <main id="main">
    <div id="content">
      <RouterLink class="block" to="/prize">
        <h1>EloJob</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          Elojob é a solução para aqueles que desejam alcançar um ranque mais alto em menor tempo.
          Com este serviço, jogadores experientes irão impulsionar sua classificação, tornando a
          jornada competitiva mais suave
        </p>
      </RouterLink>
      <RouterLink class="block" to="/prize">
        <h1>DuoJob</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          O DuoJob oferece a oportunidade perfeita para jogadores que desejam melhorar suas
          habilidades em League of Legends. Jogue ao lado de um jogador experiente e aprenda
          enquanto conquista a classificação desejada
        </p>
      </RouterLink>
      <RouterLink class="block" to="/prize">
        <h1>MD10</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          O MD10 é essencial para quem está pronto para iniciar bem uma nova temporada no League of
          Legends. Tenha suas partidas de posicionamento jogadas pelos melhores, garantindo que você
          comece a temporada com a melhor classificação possível
        </p>
      </RouterLink>
      <RouterLink class="block" to="/prize">
        <h1>Sh1ro Tips</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          O Sh1ro Tips é um projeto feito por mono champions que vai te guiar para extrair o máximo
          de cada campeão. Tenha acesso a uma fonte inestimável de informações sobre campeões, itens
          e estratégias para levar seu jogo a um nível superior.
        </p>
      </RouterLink>
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
  align-content: center;
  grid-template-columns: repeat(4, 250px);
  justify-content: center;
  gap: 40px;
  margin: 40px;
}
@media (max-width: 1240px) {
  #content {
    grid-template-columns: repeat(2, 250px);
  }
}

.block {
  background-color: rgba(0, 0, 0, 0.75);
  border: 4px double white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 25px;
  text-align: center;
  transition:
    background-color 0.5s,
    box-shadow 1.5s ease;
}
.block:nth-of-type(1) {
  border-color: palevioletred;
}
.block:nth-of-type(2) {
  border-color: orange;
}
.block:nth-of-type(3) {
  border-color: green;
}
.block:nth-of-type(4) {
  border-color: blue;
}

.block:nth-child(odd) {
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
}
.block:nth-child(even) {
  border-top-right-radius: 50px;
  border-bottom-left-radius: 50px;
}

.block > hr {
  margin-block: 5px;
  width: 70%;
  height: 2px;
}
.block:nth-of-type(1) > hr {
  border-color: palevioletred;
}
.block:nth-of-type(2) > hr {
  border-color: orange;
}
.block:nth-of-type(3) > hr {
  border-color: green;
}
.block:nth-of-type(4) > hr {
  border-color: blue;
}

.block > img {
  height: 10rem;
  width: 10rem;
}
.block:nth-of-type(1) > img {
  filter: hue-rotate(45deg);
}
.block:nth-of-type(2) > img {
  filter: hue-rotate(100deg);
}
.block:nth-of-type(3) > img {
  filter: hue-rotate(180deg);
}
.block:nth-of-type(4) > img {
  filter: hue-rotate(300deg);
}

.block:hover {
  cursor: pointer;
}
.block:nth-of-type(1):hover {
  border-style: solid;
  background-color: rgb(255, 0, 85, 0.05);
  box-shadow: 0px 0px 30px 0px rgb(255, 0, 85, 1);
}
.block:nth-of-type(2):hover {
  border-style: solid;
  background-color: rgb(255, 217, 0, 0.05);
  box-shadow: 0px 0px 30px 0px rgb(255, 217, 0, 1);
}
.block:nth-of-type(3):hover {
  border-style: solid;
  background-color: rgb(153, 255, 0, 0.05);
  box-shadow: 0px 0px 30px 0px rgb(153, 255, 0, 1);
}
.block:nth-of-type(4):hover {
  border-style: solid;
  background-color: rgb(0, 191, 255, 0.05);
  box-shadow: 0px 0px 30px 0px rgb(0, 191, 255, 1);
}
</style>
