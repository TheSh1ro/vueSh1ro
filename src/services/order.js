// order.js
import api from '../plugins/api'

class OrderService {
  async createOrder(data) {
    try {
      const response = await api.post('/servico/', data)
      const orderData = response.data
      return orderData
    } catch (error) {
      console.error('Erro ao criar nova ordem de serviço:', error)
      throw error
    }
  }

  // async createElo(data) {
  //   try {
  //     const response = await api.post('/elo/', data)
  //     const eloData = response.data
  //     return eloData
  //   } catch (error) {
  //     console.error('Erro ao criar serviço de elo:', error)
  //     throw error
  //   }
  // }
  // async getEloById(id) {
  //   try {
  //     const response = await api.get(`/elo/${id}/`);
  //     const eloData = response.data;
  //     return eloData;
  //   } catch (error) {
  //     console.error('Erro ao obter serviço de elo:', error);
  //     throw error;
  //   }
  // }
}

export default new OrderService()
