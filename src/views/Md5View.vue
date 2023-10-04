<template>
  <main id="main">
    <div class="content">
      <div>{{ user }}</div>
      <div></div>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from '../stores/store.js'

export default {
  data() {
    return {}
  },

  computed: {
    user() {
      const authStore = useAuthStore()
      return authStore.user ? authStore.user : ''
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

.content {
  font-size: 3rem;
}
</style>
