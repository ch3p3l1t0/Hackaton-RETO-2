// Controller/controllerAdmin.js
const {
  updateReserva,
  getReservaById,
  getCorreoByIdReserva,
  getReservasPorUsuario,  // Importamos la nueva función
} = require("../Models/Reserva");
const nodemailer = require("nodemailer");

exports.cambiarEstadoReserva = async (req, res) => {
  const { idReservaciones, estadoReserva } = req.body;

  try {
    // Actualizar el estado de la reserva
    const reservaActualizada = await updateReserva(idReservaciones, estadoReserva);

    // Obtener el correo del usuario usando el idReservaciones
    const correoUsuario = await getCorreoByIdReserva(idReservaciones);

    // Asegúrate de que correoUsuario es válido
    if (!correoUsuario) {
      return res.status(400).json({ error: 'Correo electrónico no encontrado para esta reserva.' });
    }

    // Obtener los detalles completos de la reserva
    const reservaDetalles = await getReservaById(idReservaciones);

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "retonidohackaton@gmail.com",  // Tu correo de Gmail
        pass: "lzfy woeb tngd txrr",  // Contraseña o contraseña de aplicación generada
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: 'retonidohackaton@gmail.com',  // Remitente
      to: correoUsuario,  // El correo obtenido de la base de datos
      subject: `Estado de tu reserva: ${estadoReserva}`,
      text: `Hola, tu reserva ha sido ${estadoReserva}.
             Gracias por usar nuestro servicio.
             Detalles:
             - Fecha: ${reservaDetalles.fecha}
             - Hora: ${reservaDetalles.hora}`,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      mensaje: "Reserva actualizada y correo enviado",
      reserva: reservaActualizada,
    });
  } catch (error) {
    console.error("Error al enviar el correo:", error);  // Agregar más detalles al log
    res.status(500).json({ error: error.message });
  }
};

// Nueva función para obtener las reservas de un usuario específico
exports.obtenerReservasPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;  // El idUsuario se pasa como parámetro en la URL

  try {
    // Obtener las reservas del usuario
    const reservas = await getReservasPorUsuario(idUsuario);

    if (reservas.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron reservas para este usuario.' });
    }

    res.status(200).json({
      mensaje: 'Reservas obtenidas exitosamente.',
      reservas,
    });
  } catch (error) {
    console.error("Error al obtener las reservas:", error);  // Agregar más detalles al log
    res.status(500).json({ error: error.message });
  }
};
