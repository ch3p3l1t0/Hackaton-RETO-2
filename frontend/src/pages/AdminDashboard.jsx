
import React, { useState } from "react";
import { FaTrashAlt, FaCheckCircle, FaTimesCircle, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const Dashboard = () => {
  const [reservas, setReservas] = useState([
    {
      id: 1,
      sala: "Sala 1",
      razon: "Reunión de equipo",
      horario: "9:00 AM - 10:00 AM",
      estado: "Disponible",
      fecha: "2024-11-26",
    },
    {
      id: 2,
      sala: "Sala 2",
      razon: "Presentación de proyecto",
      horario: "11:00 AM - 12:00 PM",
      estado: "Ocupada",
      fecha: "2024-11-27",
    },
    {
      id: 3,
      sala: "Sala 3",
      razon: "Entrevista de trabajo",
      horario: "2:00 PM - 3:00 PM",
      estado: "Cerrada",
      fecha: "2024-11-28",
    },
  ]);

  const [salaSeleccionada, setSalaSeleccionada] = useState(null);
  const [editadoSala, setEditadoSala] = useState({
    razon: "",
    horario: "",
    estado: "",
  });

  const handleDelete = (id) => {
    const updatedReservas = reservas.filter((reserva) => reserva.id !== id);
    setReservas(updatedReservas);
  };

  const handleSelectSala = (reserva) => {
    setSalaSeleccionada(reserva);
    setEditadoSala({
      razon: reserva.razon,
      horario: reserva.horario,
      estado: reserva.estado,
    });
  };

  const handleUpdateSala = (e) => {
    e.preventDefault();
    const updatedReservas = reservas.map((reserva) =>
      reserva.id === salaSeleccionada.id
        ? { ...reserva, ...editadoSala }
        : reserva
    );
    setReservas(updatedReservas);
    setSalaSeleccionada({ ...salaSeleccionada, ...editadoSala });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditadoSala((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const horariosDisponibles = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-400 to-teal-500">
      <div className="flex flex-1">
        <div className="w-1/3 bg-white rounded-lg shadow-lg p-8 m-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Lista de Reservas</h2>

          {reservas.length > 0 ? (
            reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex justify-between">
                  <h4 className="text-xl font-semibold">Sala: {reserva.sala}</h4>
                  <button
                    onClick={() => handleDelete(reserva.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
                <p><strong>Fecha:</strong> {reserva.fecha}</p>
                <p><strong>Razón:</strong> {reserva.razon}</p>
                <p><strong>Horario:</strong> {reserva.horario}</p>
                <p><strong>Estado:</strong> 
                  {reserva.estado === "Disponible" && (
                    <span className="text-green-500 flex items-center">
                      <FaCheckCircle size={20} /> Disponible
                    </span>
                  )}
                  {reserva.estado === "Ocupada" && (
                    <span className="text-red-500 flex items-center">
                      <FaTimesCircle size={20} /> Ocupada
                    </span>
                  )}
                  {reserva.estado === "Cerrada" && (
                    <span className="text-gray-500 flex items-center">
                      <FaTimesCircle size={20} /> Cerrada
                    </span>
                  )}
                </p>
                <button
                  onClick={() => handleSelectSala(reserva)}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  Ver detalles
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No hay reservas actuales.</p>
          )}
        </div>

        <div className="w-2/3 p-8 m-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-6">Gestión de Sala</h3>

          {salaSeleccionada ? (
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold">Detalles de la {salaSeleccionada.sala}</h4>
              <p><strong>Fecha:</strong> {salaSeleccionada.fecha}</p>

              <form>
                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="razon">Razón de la reserva</label>
                  <input
                    type="text"
                    id="razon"
                    name="razon"
                    value={editadoSala.razon}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Ingresa la razón de la reserva"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="horario">Horario</label>
                  <select
                    id="horario"
                    name="horario"
                    value={editadoSala.horario}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {horariosDisponibles.map((horario, index) => (
                      <option key={index} value={horario}>
                        {horario}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700" htmlFor="estado">Estado</label>
                  <select
                    id="estado"
                    name="estado"
                    value={editadoSala.estado}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Ocupada">Ocupada</option>
                    <option value="Cerrada">Cerrada</option>
                  </select>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handleUpdateSala}
                    className="text-green-500 hover:text-green-700 flex items-center"
                  >
                    <FaCheck size={20} /> Aceptar
                  </button>
                  <button
                    onClick={() => setSalaSeleccionada(null)}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <FaTimes size={20} /> Denegar
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p className="text-gray-500 text-center">Selecciona una sala para editar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

