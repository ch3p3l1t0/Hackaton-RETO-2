import { useForm } from "react-hook-form";
import { FaUser, FaBuilding, FaLock, FaEnvelope } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Register Data:", data);
  };

  // Animación con React Spring
  const animationStyles = useSpring({
    from: { transform: "translateX(-100%)", opacity: 0 }, // Comienza fuera de la pantalla (izquierda)
    to: { transform: "translateX(0%)", opacity: 1 }, // Termina en su posición actual
    config: { tension: 170, friction: 20 }, // Configuración para suavizar la animación
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500">
      {/* Aplicación de la animación al contenedor principal */}
      <animated.div
        style={animationStyles}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Crear Cuenta
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nombre
              </label>
              <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-teal-500">
                <FaUser className="ml-3 text-gray-500" />
                <input
                  type="text"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                  className="w-full p-2 border-none focus:outline-none"
                  placeholder="Nombre"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Apellido
              </label>
              <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-teal-500">
                <FaUser className="ml-3 text-gray-500" />
                <input
                  type="text"
                  {...register("lastname", {
                    required: "El apellido es obligatorio",
                  })}
                  className="w-full p-2 border-none focus:outline-none"
                  placeholder="Apellido"
                />
              </div>
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          {/* Correo Electrónico */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Correo Electrónico
            </label>
            <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-teal-500">
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

          {/* Empresa */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Empresa
            </label>
            <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-teal-500">
              <FaBuilding className="ml-3 text-gray-500" />
              <input
                type="text"
                {...register("company", {
                  required: "El nombre de la empresa es obligatorio",
                })}
                className="w-full p-2 border-none focus:outline-none"
                placeholder="Nombre de la empresa"
              />
            </div>
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>
            <div className="flex items-center border rounded-lg focus-within:ring-2 focus-within:ring-teal-500">
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
                placeholder=""
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            className="mt-6 w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg shadow-md transition duration-300">
            Registrarse
          </button>
        </form>
      </animated.div>
    </div>
  );
}
