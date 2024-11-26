const salasModel = require('../Models/User');

const listSalas = async (req, res) => {
  try {
    const salas = await salasModel.getSalas();
    res.json(salas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createSala = async (req, res) => {
  try {
    const sala = await salasModel.createSala(req.body);
    res.status(201).json(sala);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateSala = async (req, res) => {
  try {
    const sala = await salasModel.updateSala(req.params.idSalas, req.body.disponibilidad);
    res.json(sala);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  listSalas,
  createSala,
  updateSala,
};