import React from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaEnvelope } from "react-icons/fa";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Bienvenido de nuevo
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Correo Electrónico
            </label>
            <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-cyan-500">
              <FaEnvelope className="ml-3 text-gray-500" />
              <input
                type="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Correo inválido",
                  },
                })}
                className="w-full p-2 border-none focus:outline-none"
                placeholder="ejemplo@correo.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-cyan-500">
              <FaLock className="ml-3 text-gray-500" />
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
                className="w-full p-2 border-none focus:outline-none"
                placeholder="********"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg shadow-md transition duration-300">
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes una cuenta?{" "}
          <a
            href="/register"
            className="text-teal-500 hover:text-teal-600 font-medium">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
