<template>
  <main id="main">
    <div class="content">
      <button @click="show = !show">Toggle</button>
      <Transition>
        <h1 v-if="show">hello</h1>
      </Transition>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
#main {
  background-color: rgba(0, 0, 0, 0.8);

  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  padding: 40px;
}

button {
  color: black;
  padding: 10px;
}

/* nós explicaremos o que são estas classes fazem a seguir! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  color: red;
}

.content {
  color: white;
}
</style>
