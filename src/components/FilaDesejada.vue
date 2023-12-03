<template>
  <main>
    <div class="column">
      <h2 class="row title">Fila</h2>
      <div class="row">
        <span @click="handleSelectElo('solo', 'Ranqueada Solo/Duo')" :class="{ selected: selectedQueue == 'Ranqueada Solo/Duo', blocked: isBlocked }">Ranqueada Solo/duo</span>
      </div>
      <div class="row">
        <span @click="handleSelectElo('flex', 'Ranqueada Flexível')" :class="{ selected: selectedQueue == 'Ranqueada Flexível' }">Ranqueada Flexível</span>
      </div>
      <h2 class="row" style="grid-row: 5" v-if="selectedQueue">Continuar</h2>
      <div class="confirm-row" style="grid-row: 6">
        <button class="confirm-row-button" v-if="selectedQueue" @click="handleConfirm">{{ isAuthenticated ? 'Confirmar seleção' : 'Fazer login' }}</button>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from '../stores/store.js'

export default {
  props: ['handleConfirm', 'selectQueue', 'currentElo', 'targetElo', 'selectedQueue'],
  data() {
    return {}
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    },
    // isBlocked retorna true caso deva ser impossível selecionar Ranqueada Solo/Duo
    isBlocked() {
      if (this.$route.name.toLowerCase() == 'duojob') {
        if (this.currentElo.isHigh == true || this.targetElo.eloIndex > 7) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  methods: {
    handleSelectElo(type, queue) {
      if (this.$route.name.toLowerCase() == 'elojob') {
        this.selectQueue(queue)
      }

      if (this.$route.name.toLowerCase() == 'duojob') {
        switch (type) {
          case 'solo':
            if (this.isBlocked) return
            this.selectQueue(queue)

            break

          case 'flex':
            this.selectQueue(queue)
            break
        }
      }
    }
  }
}
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

h2 {
  padding-left: 25px;
}

.column {
  display: grid;
  grid-template-rows: repeat(11, 1fr);
  width: 100%;
  height: 100%;
}

.row {
  display: flex;
  flex-grow: 1;
  margin: 0 auto;
  width: 180px;
  height: 100%;
}

.confirm-row {
  display: flex;
  flex-grow: 1;
  margin: 0 auto;
  width: 180px;
  height: 100%;
}

.confirm-row-button {
  flex-grow: 1;
  border: 2px solid cyan;
  color: whitesmoke;
  border-radius: 7px;

  background-color: transparent;
  width: fit-content;
  padding: 12px 20px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;

  transition:
    box-shadow 0.2s,
    background-color 0.4s;
}
.confirm-row-button:hover {
  border: 2px solid cyan;
  box-shadow: 0px 0px 10px 0px cyan;
  background-color: rgba(0, 100, 100, 0.5);
}

span {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 5px;
  cursor: pointer;
  border: 1px solid transparent;
  padding-left: 10px;
}

span:hover {
  background-color: rgba(0, 100, 100, 0.5);
}

.selected {
  background-color: rgba(0, 100, 100, 0.5);
  border-color: rgb(0, 100, 100);
}

.blocked:hover {
  background-color: rgba(100, 0, 0, 0.5);
}

.blocked:active {
  animation: shake 0.3s alternate;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(5px);
  }
}
</style>
