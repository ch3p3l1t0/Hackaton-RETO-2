const axios = require('axios');

const API_URL = 'http://localhost:3000'; // Cambia a tu URL de PostgREST

class ReservationModel {
  // Obtener todas las reservas
  static async getAllReservations() {
    try {
      const response = await axios.get(`${API_URL}/reservations`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener las reservas');
    }
  }

  // Crear una nueva reserva
  static async createReservation(reservation) {
    try {
      const response = await axios.post(`${API_URL}/reservations`, reservation);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear la reserva');
    }
  }

  // Obtener reservas de un usuario
  static async getUserReservation(userId) {
    try {
      const response = await axios.get(`${API_URL}/reservations?user_id=eq.${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al buscar la reserva del usuario');
    }
  }
}

module.exports = ReservationModel;
