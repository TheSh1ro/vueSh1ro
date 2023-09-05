<script></script>
<template>
  <footer id="footer">
    <ul block>
      <li>Central de Ajuda</li>
      <li>Trabalhe conosco</li>
      <li>Contato</li>
    </ul>
    <ul block>
      <li>Discord</li>
      <li>Twitter</li>
      <li>Instagram</li>
    </ul>
  </footer>
</template>
<style scoped>
#footer {
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 1.5rem;
  color: white;

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;

  transition: background-color 0.5s;
}
#footer:hover {
  background-color: black;
}

li {
  cursor: pointer;
}
li:hover {
  color: bisque;
  text-decoration: underline;
}
</style>
