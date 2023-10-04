<script></script>
<template>
  <main id="main">
    <div id="content">
      <RouterLink class="block" to="/elojob">
        <h1>EloJob</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          Jogamos na sua conta, a forma mais rápida de chegar no elo que você deseja sem gastar sua
          energia ou se estressar
        </p>
      </RouterLink>
      <RouterLink class="block" to="/duojob">
        <h1>DuoJob</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          Jogue Duo com um dos nossos boosters, uma oportunidade única para observar de perto como
          os melhores vencem
        </p>
      </RouterLink>
      <RouterLink class="block" to="/md5">
        <h1>MD5</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>
          Para iniciar bem, tenha suas partidas de colocação jogadas por um dos nossos Boosters,
          garantindo um bom elo inicial
        </p>
      </RouterLink>
      <RouterLink class="block" to="/tips">
        <h1>Sh1ro Tips</h1>
        <hr />
        <img class="block-art" src="../assets/riven.png" alt="" />
        <p>Acesso a um conteúdo exclusivo que guiará você a extrair o máximo de cada campeão</p>
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
}

#content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 30px;

  margin: 60px 40px;
}

.block {
  background-color: rgba(0, 0, 0, 0.75);
  border: 4px double white;
  font-size: 1.1rem;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 340px;
  width: 220px;
  padding: 20px;

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
