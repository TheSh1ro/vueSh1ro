import axios from 'axios'
const MY_IP = import.meta.env.VITE_MY_IP
import { useAuthStore } from '../stores/store'

const api = axios.create({
  baseURL: `http://${MY_IP}:19003/api/`
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const { token } = authStore
  if (token) {
    config.headers.Authorization = `Bearer ${token.access}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    // Verificar se o erro é devido a um token expirado
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Solicitar um novo token de atualização
      const refreshResponse = await api.post('/token/refresh/', {
        refresh: authStore.token.refresh
      })

      // Atualizar o token de acesso no armazenamento local ou onde você o mantém
      authStore.updateToken(refreshResponse.data.access)

      // Reenviar a solicitação original com o novo token de acesso
      return api(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default api
