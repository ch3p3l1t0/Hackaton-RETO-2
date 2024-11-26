const {
  getReservasPendientes,
  updateEstadoReserva,
} = require("../Models/Reserva");
const nodemailer = require("nodemailer");

// Listar reservas pendientes
exports.listReservasPendientes = async (req, res) => {
  try {
    const reservas = await getReservasPendientes();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cambiar estado de reserva
exports.cambiarEstadoReserva = async (req, res) => {
  const { idReserva, estado, emailUsuario } = req.body;

  try {
    const reservaActualizada = await updateEstadoReserva(idReserva, estado);

    // Enviar notificación por correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "retonidohachaton@gmail.com",
        pass: "lzfy woeb tngd txrr",
      },
    });

    const mailOptions = {
      from: "retonidohachaton@gmail.com",
      to: emailUsuario,
      subject: `Estado de tu reserva: ${estado}`,
      text: `Hola ${emailUsuario}, tu reserva reserva ha sido ${estado}.
            Gracias por usar nuestro servicio
            Detalles:
            - Fecha: ${idReserva.fecha}
            - Hora: ${idReserva.hora}
            `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      mensaje: "Reserva actualizada y correo enviado",
      reserva: reservaActualizada,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
