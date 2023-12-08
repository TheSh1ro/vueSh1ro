<template>
  <main>
    <div class="container">
      <template v-for="service in services.results" :key="service" v-if="services">
        <div class="card">
          <header>
            <div>
              <img :src="service.current_elo_image" alt="" />
              <h2>{{ service.current_elo }} ao {{ service.target_elo }}</h2>
              <img :src="service.target_elo_image" alt="" />
            </div>
          </header>
          <body>
            <div class="body-date">
              <h5>{{ service.purchase_date }}</h5>
            </div>
            <div class="body-info">
              <h4>Descrição do serviço</h4>
              <p>{{ service.description }}</p>
            </div>
          </body>
          <footer>
            <div class="footer-user">
              {{ service.riot_id + service.riot_tag }}
            </div>
          </footer>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from '../stores/store.js'
import axios from 'axios'

export default {
  data() {
    return {
      services: null,
      user: null
    }
  },
  mounted() {
    axios
      .get('http://192.168.0.95:19003/servico/')
      .then((response) => {
        this.services = response.data
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  },
  created() {
    const authStore = useAuthStore()

    authStore.user ? (this.user = authStore.user) : this.$router.push('/login')
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated) {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    isAuthenticated() {
      return useAuthStore().isAuthenticated
    }
  },
  methods: {}
}
</script>

<style scoped>
main {
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  flex-direction: column;
  padding-block: 20px 20vh;
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  justify-items: center;
  gap: 20px;
  margin-inline: 5vw;
}
.card {
  border-bottom: 1px solid white;
  background-color: rgba(0, 0, 0, 0.2);
}
img {
  height: 38px;
}
header {
  display: flex;
  border: 1px solid white;
}
header div {
  display: flex;
  align-items: center;
  padding: 10px;
}
header div h2 {
  margin-inline: 10px;
}

body {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  height: fit-content;
}
.body-date {
  display: flex;
  justify-content: center;
  align-items: center;

  border-inline: 1px solid white;
  height: 100%;
  width: 100%;
  flex-grow: 1;
}
.body-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 5px;
  flex-grow: 1;

  border-right: 1px solid white;
  padding: 20px;
}
body h4 {
  margin-bottom: 15px;
}
body p {
  color: rgb(200, 200, 200);
}

footer {
  display: flex;
  padding: 8px;
  font-weight: bold;
  justify-content: center;
  border-inline: 1px solid white;
  border-top: 1px solid white;
  color: yellow;
}
</style>
