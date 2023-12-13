// order.js
import api from '../plugins/api'

class OrderService {
  async createOrder(data) {
    try {
      const response = await api.post('/servico/', data)
      return response.data
    } catch (error) {
      console.error('Erro ao criar nova ordem de serviço:', error)
      throw error
    }
  }

  async getAllOrders() {
    try {
      const { data } = await api.get('/servico/')
      return data
    } catch (error) {
      console.error('Erro ao criar nova ordem de serviço:', error)
      throw error
    }
  }

  async toggleOrderStatus(orderId, status) {
    try {
      const { data } = await api.patch(`/servico/${orderId}/`, { status })
      return data
    } catch (error) {
      console.error('Erro ao alterar status da ordem de serviço:', error)
      throw error
    }
  }
}

export default new OrderService()
