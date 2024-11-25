import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    sala: "",
    reason: "",
    availability: "",
  });

  const [availableRooms, setAvailableRooms] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Cargar salas disponibles desde la API de PostgREST
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/rooms?available=true");
        setAvailableRooms(response.data);
      } catch (err) {
        setError("Error al cargar las salas disponibles.");
      }
    };
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { sala, reason, availability } = formData;

    if (!sala || !reason || !availability) {
      setError("Por favor complete todos los campos.");
      setSuccess("");
      return;
    }

    try {
      // Verificar si la sala está disponible
      const response = await axios.get(
        `http://localhost:3000/rooms?sala=eq.${sala}&availability=eq.${availability}`
      );
      const room = response.data[0];

      if (room) {
        setError("La sala no está disponible en el horario seleccionado.");
        setSuccess("");
        return;
      }

      // Registrar la reserva en la base de datos
      await axios.post("http://localhost:3000/reservations", {
        sala,
        reason,
        availability,
      });

      setSuccess(`¡La sala ${sala} ha sido reservada con éxito!`);
      setError("");
      setFormData({ sala: "", reason: "", availability: "" }); // Reiniciar formulario
    } catch (err) {
      setError("Ocurrió un error al registrar la reserva.");
      setSuccess("");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Reserva de Sala</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
          Sala:
        </label>
        <select
          name="sala"
          value={formData.sala}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <option value="" disabled>
            Seleccione una sala
          </option>
          {availableRooms.map((room) => (
            <option key={room.id} value={room.sala}>
              {room.sala}
            </option>
          ))}
        </select>

        <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
          Razón de la reserva:
        </label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Escriba la razón de la reserva..."
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        ></textarea>

        <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
          Disponibilidad:
        </label>
        <input
          type="text"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          placeholder="dd/mm/yyyy hh:mm"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />

        {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: "15px" }}>{success}</div>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reservar
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
