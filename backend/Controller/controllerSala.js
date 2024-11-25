const { getSalas, updateEstadoSala } = require('../Models/Sala');

// Obtener todas las salas
exports.getSalas = async (req, res) => {
  try {
    const salas = await getSalas();
    res.status(200).json(salas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las salas', error: error.message });
  }
};

// Actualizar el estado de una sala
exports.updateEstadoSala = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const sala = await updateEstadoSala(id, estado);
    if (!sala) {
      return res.status(404).json({ message: 'Sala no encontrada' });
    }
    res.status(200).json(sala);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado de la sala', error: error.message });
  }
};