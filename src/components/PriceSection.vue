<template>
  <main>
    <div class="prazo">
      <h2>Prazo estimado</h2>
      <p>
        Será realizado em até {{ serviceData.time }} dias, podendo ser concluido antes do previsto
      </p>
    </div>
    <div class="preco">
      <h3>
        {{ serviceData.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
      </h3>
      <h2>
        {{ serviceData.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
      </h2>
    </div>
  </main>
</template>

<script>
export default {
  props: ['serviceData'],
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {}
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: black;
  background-color: white;
}
</style>
