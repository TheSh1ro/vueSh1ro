<script></script>
<template>
  <main id="main">
    <div id="content">
      <RouterLink class="block" to="/elojob">
        <h1>EloJob</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          O EloJob é ideal para quem quer subir de ranque rapidamente. Jogadores experientes
          impulsionarão sua classificação, tornando a jornada mais suave.
        </p>
      </RouterLink>
      <RouterLink class="block" to="/duojob">
        <h1>DuoJob</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          O DuoJob é perfeito para jogadores que querem melhorar no League of Legends. Jogue duo e
          aprenda enquanto sobe de classificação.
        </p>
      </RouterLink>
      <RouterLink class="block" to="/prize">
        <h1>MD5</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          Essencial para iniciar bem uma nova temporada no League of Legends. Tenha suas partidas
          iniciais jogadas pelos melhores e comece bem a temporada.
        </p>
      </RouterLink>
      <RouterLink class="block" to="/elojob">
        <h1>Sh1ro Tips</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          Acesso a um conteúdo que guia você a extrair o máximo de cada campeão. Acesse informações
          valiosas sobre campeões, itens e estratégias para elevar seu jogo.
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
  min-height: 92vh;
  padding: 40px;
}

#content {
  display: grid;
  align-items: center;
  justify-content: space-evenly;
  grid-template-columns: repeat(4, minmax(250px, 280px));
  gap: 40px 20px;
}
@media (max-width: 1300px) {
  #content {
    grid-template-columns: repeat(2, minmax(250px, 280px));
  }
}
@media (max-width: 710px) {
  #content {
    grid-template-columns: repeat(1, minmax(250px, 280px));
  }
}

.block {
  background-color: rgba(0, 0, 0, 0.75);
  font-size: 1.2rem;
  border: 4px double white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: fit-content;
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
