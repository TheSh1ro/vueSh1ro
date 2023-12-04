<template>
  <main>Testes</main>
</template>

<script>
// import { useAuthStore, usePurchaseStore } from '../stores/store.js'

export default {
  data() {
    return {
      // component form
      riot_id: null,
      riot_tag: '#',
      riot_login: null,
      riot_password: null,
      refer_code: null,
      description_lane: null,
      description_champion: null
    }
  },
  created() {},
  computed: {
    computed: {}
  },
  methods: {
    upperCase() {
        this.riottag ? (this.riottag = this.riottag.toUpperCase()) : undefined
        this.riotid ? (this.riotid = this.riotid.toUpperCase()) : undefined

        if (this.riottag[0] != '#') {
          this.riottag = '#'
        }
      },
  }
}
</script>

<style scoped>
main {
  transition:
    background-color 0.2s,
    color 0.2s,
    width 0.5s,
    height 0.5s;
}
</style>
