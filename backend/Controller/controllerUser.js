const usuarioModel = require('../Models/User');

const listUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createUsuario = async (req, res) => {
  try {
    const usuario = await usuarioModel.createUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUsuario = async (req, res) => {
  try {
    const usuario = await usuarioModel.updateUsuario(req.params.idUsuario, req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  listUsuarios,
  createUsuario,
  updateUsuario,
};