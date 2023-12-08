<template>
  <main>
    <div class="column">
      <div class="row">
        <h2>Fila</h2>
      </div>
      <div class="row">
        <span @click="handleSelectQueue('solo', 'Ranqueada Solo/Duo')" :class="{ selected: selectedQueue == 'Ranqueada Solo/Duo', blocked: isBlocked }">Ranqueada Solo/duo</span>
      </div>
      <div class="row">
        <span @click="handleSelectQueue('flex', 'Ranqueada Flexível')" :class="{ selected: selectedQueue == 'Ranqueada Flexível' }">Ranqueada Flexível</span>
      </div>
      <TransitionGroup name="list">
        <div class="row hidden confirm-title" v-if="selectedQueue">
          <h2>Continuar</h2>
        </div>
        <div class="row confirm-button" v-if="selectedQueue">
          <button @click="handleConfirm">{{ isAuthenticated ? 'Confirmar seleção' : 'Continuar' }}</button>
        </div>
      </TransitionGroup>
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
  created() {
    if (this.isDuoJob && this.targetElo && this.targetElo.eloIndex > 7) {
      this.selectQueue('Ranqueada Flexível')
    }
  },
  watch: {
    targetElo() {
      if (this.isDuoJob && this.targetElo && this.targetElo.eloIndex > 7) {
        this.selectQueue('Ranqueada Flexível')
      }
    },
    currentElo() {
      if (this.isDuoJob && this.targetElo && this.targetElo.eloIndex > 7) {
        this.selectQueue('Ranqueada Flexível')
      }
    }
  },
  computed: {
    isDuoJob() {
      return this.$route.name.toLowerCase() == 'duojob'
    },
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
    handleSelectQueue(type, queue) {
      if (this.$route.name.toLowerCase() == 'elojob') {
        this.selectQueue(queue)
      }

      if (this.$route.name.toLowerCase() == 'duojob') {
        switch (type) {
          case 'solo':
            if (this.isBlocked) return
            this.selectQueue(queue, 1)

            break

          case 'flex':
            this.selectQueue(queue, 2)
            break
        }
      }
    }
  }
}
</script>

<style scoped>
/* List transition animations */
.list-move,
.list-enter-active {
  transition:
    opacity 2s ease,
    transform 0.5s ease;
}

.list-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-150%);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-150%);
}

/* Main layout styles */
main {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

/* Header styles */
h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
}

/* Column and Row styles */
.column {
  display: grid;
  grid-template-rows: repeat(11, 8vh);
  height: 100%;
  width: 100%;
}

.row {
  display: flex;
  flex-grow: 1;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

/* Button styles */
button {
  flex-grow: 1;
  border: 2px solid cyan;
  color: whitesmoke;
  border-radius: 7px;
  background-color: transparent;
  padding: 12px 20px;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
  transition:
    box-shadow 0.2s,
    background-color 0.4s;
}

button:hover {
  border: 2px solid cyan;
  box-shadow: 0px 0px 10px 0px cyan;
  background-color: rgba(0, 100, 100, 0.5);
}

/* Span styles */
span {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 5px;
  cursor: pointer;
  border: 1px solid transparent;
  padding-left: 15px;
}

span:hover {
  background-color: rgba(0, 100, 100, 0.5);
}

/* Selected and Blocked styles */
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

/* Shake animation */
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

@media (max-width: 1140px) {
  .column {
    display: flex;
    flex-direction: column;
    height: 40vh;
  }
  .row {
    max-height: 8vh;
    text-align: center;
  }
  .hidden {
    display: none;
  }
  .confirm-button {
    margin-top: 15px;
  }
  button {
    color: rgb(0, 175, 175);
    font-weight: bold;
    background-color: transparent;
    border-color: rgb(0, 175, 175);
  }
  h2 {
    width: 100%;
  }
  span {
    justify-content: center;
  }
}
</style>
