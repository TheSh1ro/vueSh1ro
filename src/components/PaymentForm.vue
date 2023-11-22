<template>
  <div class="form">
    <div class="methods">
      <h2>Forma de pagamento</h2>
      <button
        :class="{ selectedMethod: method.name == selectedMethod }"
        v-for="method in paymentMethods"
        :key="method"
        @click="selectedMethod = method.name"
      >
        <img :src="method.image" alt="" />
        <p>{{ method.name }}</p>
      </button>
    </div>
    <div class="inputs">
      <h2>Informações do serviço</h2>
      <input readonly class="readonly" type="text" :value="user.name" />
      <div class="riot">
        <input
          type="text"
          placeholder="Digite aqui seu RIOT ID"
          v-model="riotid"
          @input="upperCase"
        />
        <input type="text" v-model="riottag" @input="preventHashRemoval, upperCase" />
      </div>
      <input readonly class="readonly" type="text" :value="'Fila ' + getQueue" />
      <input readonly class="readonly" type="text" :value="serviceType" />
      <input
        readonly
        class="readonly"
        type="text"
        :value="
          price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        "
      />
      <h2>Opcional</h2>
      <input type="text" placeholder="Cupom promocional" />
      <div class="refer">
        <input type="text" placeholder="Código de indicação" />
        <button
          title="Insira aqui o código de referência de algum amigo que te indicou ao nosso site"
        >
          ?
        </button>
      </div>
      <button>Ir para pagamento</button>
      <p>{{ selectedMethod }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['serviceType', 'serviceQueue', 'price'],
  data() {
    return {
      riotid: null,
      riottag: '#BR1',
      paymentMethods: [
        { name: 'Pix', image: '/assets/pix.png' },
        { name: 'Crédito', image: '/assets/credit.png' },
        { name: 'Débito', image: '/assets/debit.png' }
      ],
      selectedMethod: null,
      user: { name: 'Gabriel Monteiro de Albuquerque' }
    }
  },
  created() {
    this.selectedMethod = this.paymentMethods.length > 0 ? this.paymentMethods[0].name : null
  },
  computed: {
    getQueue() {
      return this.serviceQueue ? 'ranqueada solo/duo' : 'ranqueada flexível'
    }
  },
  methods: {
    upperCase(event) {
      event.target.value = event.target.value.toUpperCase()
    },
    preventHashRemoval() {
      if (!this.riottag.includes('#')) {
        this.riottag = '#'
      }
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;

  background-color: white;
  color: black;

  padding: 30px;
  border-radius: 15px;
  min-height: 80%;
  min-width: 50%;

  text-align: center;
  margin: auto;
}

.methods {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 20px;
}

.methods h2 {
  margin-bottom: 10px;
  grid-column: 1 / 4;
}

.methods button {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 3px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid black;
}

.selectedMethod {
  background-color: black;
  color: white;
}

.methods img {
  height: 25px;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 5px;
}

.inputs > button {
  padding-block: 10px;
}

.readonly {
  background-color: rgb(220, 220, 220);
  cursor: default;
}

.riot {
  display: flex;
  gap: 5px;
}

.riot input:first-child {
  flex-grow: 1;
}

.riot input:last-child {
  width: 3rem;
}

.refer {
  display: flex;
  gap: 5px;
}

.refer input {
  flex-grow: 1;
}

.refer button {
  width: 2rem;
}
</style>
