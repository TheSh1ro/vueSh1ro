<template>
  <main>
    <div class="form-block payment-block">
      <h2 class="block-title payment-title">Forma de pagamento</h2>
      <template v-for="method in paymentMethods" :key="method">
        <div class="payment-method" :class="{ selected: method.name === selectedMethod.name }" v-if="selectedMethod" @click="handleSelectMethod(method)">
          <img class="payment-image" :src="method.image" alt="" />
          <p>{{ method.name }}</p>
        </div>
      </template>
    </div>

    <div class="form-block input-block">
      <h2 class="block-title">Informações da compra</h2>
      <input readonly type="text" :value="username" />
      <div class="elos">
        <input readonly type="text" :value="currentEloName + ' ao ' + targetEloName" />
        <img class="elo-image" :src="currentElo.image" alt="Imagem do elo atual" v-if="currentElo" />
        <img class="elo-image" :src="targetElo.image" alt="Imagem do elo de destino" v-if="targetElo" />
      </div>
      <div class="services">
        <input readonly type="text" :value="queue" v-if="queue" />
        <input readonly type="text" :value="service" v-if="service" />
      </div>
      <input readonly type="text" :value="price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })" v-if="price" />
      <input readonly type="text" :value="'Prazo máximo de ' + time + ' dias'" v-if="time" />
    </div>

    <div class="form-block checkbox-block">
      <input :disabled="visibleForm" id="checkbox" type="checkbox" v-model="checkbox" />
      <label for="checkbox" style="text-align: start">Estou ciente de que jogar na conta durante o andamento do serviço afetará o produto final deste </label>
    </div>

    <div class="form-block button-block">
      <button class="button" @click="handleCancel" :style="{ 'grid-column': visibleForm ? '1/3' : 'auto' }">Voltar</button>
      <button class="button" @click="toggleVisibleForm(checkbox)" v-if="!visibleForm">Continuar</button>
    </div>
  </main>
</template>

<script>
import { useAuthStore, usePurchaseStore } from '../stores/store.js'

export default {
  props: ['goToPreviousPage', 'toggleVisibleForm', 'visibleForm', 'handleSelectMethod', 'selectedMethod'],
  data() {
    return {
      // from AuthStore
      user: null,

      // from PurchaseStore
      service: null,
      queue: null,
      currentElo: null,
      targetElo: null,
      price: null,
      time: null,

      // component form
      checkbox: false,

      paymentMethods: [
        { name: 'Pix', image: '/assets/pix.png' },
        { name: 'Crédito', image: '/assets/credit.png' },
        { name: 'Débito', image: '/assets/debit.png' }
      ]
    }
  },
  created() {
    // Pix por padrão
    this.handleSelectMethod(this.paymentMethods[0])

    const authStore = useAuthStore()
    const purchaseStore = usePurchaseStore()

    // Recebe os dados de purchaseStore
    if (purchaseStore.purchase && authStore.user) {
      this.user = authStore.user
      this.service = purchaseStore.purchase.service
      this.queue = purchaseStore.purchase.queue
      this.currentElo = purchaseStore.purchase.currentElo
      this.targetElo = purchaseStore.purchase.targetElo
      this.price = purchaseStore.purchase.price
      this.time = purchaseStore.purchase.time
    }
  },
  computed: {
    currentEloName() {
      const elo = this.currentElo
      if (elo == null) return 'Nome não disponível'
      return elo.isHigh ? elo.name : elo.name + ' ' + (elo.leagueIndex + 1)
    },

    targetEloName() {
      const elo = this.targetElo
      if (elo == null) return 'Nome não disponível'
      return elo.isHigh ? elo.name : elo.name + ' ' + (elo.leagueIndex + 1)
    },

    username() {
      const authStore = useAuthStore()
      return authStore.user ? authStore.user.username : ''
    }
  },
  methods: {
    handleCancel() {
      // Limpar todas as seleções de elo feitas
      usePurchaseStore().clearPurchase()
      // Voltar para a página anterior (escolha de elo)
      this.goToPreviousPage()
    }
  }
}
</script>

<style scoped>
* {
  user-select: none;
}

main {
  background-color: white;
  color: black;
  text-align: center;

  display: flex;
  flex-direction: column;

  min-height: 420px;
  width: 320px;
  border-radius: 3px;
  padding: 20px 30px;

  gap: 20px;
}

input {
  flex-grow: 1;

  padding: 7px;
  border: 1px solid black;
  background-color: rgb(225, 225, 225);

  border-radius: 3px;
}

.form-block {
  width: 100%;
  height: fit-content;
}

.payment-block {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  column-gap: 10px;
}

.payment-title {
  grid-column: 1/4;
}

.payment-method {
  background-color: transparent;
  color: black;
  border: 2px solid black;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 7px 5px;
  border-radius: 3px;

  gap: 10px;
}

.payment-method:hover {
  background-color: black;
  color: white;
}

.payment-image {
  height: 20px;
}

.input-block {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.elos {
  display: flex;
  gap: 5px;
  width: 100%;
}

.elos img {
  width: 38px;
}

.services {
  display: flex;
  gap: 5px;
}

.services input {
  width: 100%;
}

.checkbox-block {
  display: flex;
  gap: 10px;
}

#checkbox:disabled {
  filter: sepia() hue-rotate(340deg) saturate(5) invert();
}

.button-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.button {
  background-color: black;
  border: 1px solid black;
  color: white;
  cursor: pointer;

  padding: 8px;
  border-radius: 3px;
}

.button:hover {
  background-color: darkblue;
  border-color: darkblue;
}

.selected {
  background-color: black;
  color: white;
}
</style>
