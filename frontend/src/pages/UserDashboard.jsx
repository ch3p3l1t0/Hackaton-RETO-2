
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const UserDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(true); // Estado para disponibilidad de la sala
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha seleccionada
  const [messageVisible, setMessageVisible] = useState(false); // Estado para mostrar el mensaje temporal
  const [availableHours, setAvailableHours] = useState([]); // Estado para las horas disponibles
  const [selectedHour, setSelectedHour] = useState(null); // Estado para el horario seleccionado
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Función para cambiar la disponibilidad
  const toggleAvailability = () => {
    setIsAvailable((prev) => !prev); // Función para cambiar la disponibilidad de la sala
  };

  // Función para manejar el cambio de fecha en el calendario
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    fetchAvailableHours(newDate); // Llamada para obtener las horas disponibles para la fecha seleccionada
  };

  // Función para mostrar el mensaje temporal
  const showMessage = () => {
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false); // Oculta el mensaje después de 3 segundos
    }, 3000);
  };

  // Función para simular la disponibilidad horaria de la sala
  const fetchAvailableHours = (date) => {
    const hours = [
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "12:00 PM - 1:00 PM",
      "1:00 PM - 2:00 PM",
      "2:00 PM - 3:00 PM",
      "3:00 PM - 4:00 PM",
      "4:00 PM - 5:00 PM",
    ]; // Ejemplo de horarios disponibles

    // Simulación de que la disponibilidad varía dependiendo de la fecha (esto puedes adaptarlo a tu lógica de backend)
    if (date.getDay() === 0 || date.getDay() === 6) {
      // Si es sábado o domingo, mostramos disponibilidad reducida
      setAvailableHours(hours.slice(0, 4)); // Solo muestra la disponibilidad de la mañana
    } else {
      // En días de semana, mostramos todo el rango de horas
      setAvailableHours(hours);
    }
  };

  // Función para manejar la selección del horario
  const handleHourSelect = (hour) => {
    setSelectedHour(hour); // Actualiza el estado con el horario seleccionado
  };

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {
    if (!selectedHour) {
      alert("Por favor selecciona un horario.");
      return;
    }
    console.log("Datos enviados:", data);
    alert(`Reserva generada:\nSala: ${data.Sala}\nRazón: ${data.Razon}\nHorario: ${selectedHour}`);
    showMessage(); // Muestra el mensaje temporal cuando se genera la reserva
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mr-4 w-[620px] h-[550px]">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Genera tu reserva
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de selección de sala */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Sala a reservar
            </label>
            <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-cyan-500">
              <FaEnvelope className="ml-3 text-gray-500" />
              <select
                {...register("Sala", {
                  required: "Seleccionar una sala es obligatorio",
                })}
                className="w-full p-2 border-none focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona una sala
                </option>
                <option value="Sala1">Sala 1</option>
                <option value="Sala2">Sala 2</option>
                <option value="Sala3">Sala 3</option>
              </select>
            </div>
            {errors.Sala && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Sala.message}
              </p>
            )}
          </div>

          {/* Campo para razón de la reserva */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Razón de la reserva
            </label>
            <textarea
              {...register("Razon", {
                required: "Escribir una razón es obligatorio",
              })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows="4"
              placeholder="Escribe la razón de tu reserva"
            ></textarea>
            {errors.Razon && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Razon.message}
              </p>
            )}
          </div>

          {/* Botón de disponibilidad */}
          <div className="mb-4">
            <button
              type="button"
              onClick={toggleAvailability}
              className={`w-full py-2 px-4 rounded-lg ${
                isAvailable ? "bg-green-500" : "bg-red-500"
              } text-white font-bold hover:opacity-80 transition`}
            >
              {isAvailable ? "Sala Disponible" : "Sala No Disponible"}
            </button>
          </div>
        </form>
        {isAvailable ? (
          <>
            <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-lg hover:bg-green-200 transition duration-300 ease-in-out">
              Hola, la sala está disponible.
            </p>
            <p className="text-green-700 font-medium mt-3">
              ¡Genial! Ahora puedes proceder con tu reserva.
            </p>
          </>
        ) : (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-lg">
            Lo siento, la sala no está disponible.
          </p>
        )}
      </div>

      {/* Mensaje de disponibilidad */}
      {isAvailable ? (
        <div className="mt-6 p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white w-[620px] h-[565px] ">
          <div className="flex space-x-4">
            {/* Calendario - Moverlo hacia la derecha */}
            <div className="w-[60%]">
              <Calendar
                onChange={handleDateChange} // Actualiza la fecha al seleccionarla
                value={selectedDate} // Muestra la fecha seleccionada
              />
            </div>

            {/* Información de la fecha seleccionada y horarios disponibles */}
            <div className="w-[40%]">
              <div className="mt-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-md shadow-md">
                <p>
                  <strong>Fecha seleccionada:</strong>{" "}
                  {selectedDate.toLocaleDateString()}
                </p>
              </div>

              {/* Horarios disponibles - Columna con barra de desplazamiento */}
              <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md shadow-md max-h-[300px] overflow-y-auto">
                <p>
                  <strong>Horarios disponibles:</strong>
                </p>
                <ul>
                  {availableHours.map((hour, index) => (
                    <li
                      key={index}
                      className={`mt-2 cursor-pointer p-2 rounded-md ${
                        selectedHour === hour
                          ? "bg-blue-500 text-white"
                          : "bg-white hover:bg-blue-100"
                      }`}
                      onClick={() => handleHourSelect(hour)} // Selecciona el horario
                    >
                      {hour}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mostrar la fecha seleccionada y el botón de generar reserva */}
          <div className="mt-6">
            <button
              type="submit" // Asegura que el formulario se envíe
              className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-700 transition"
            >
              Generar Reserva
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserDashboard;
