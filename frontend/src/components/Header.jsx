import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Obtén la ruta actual

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white py-4 top-0 left-0 right-0">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Empresa Nido</h1>
        <div className="flex space-x-4 items-center">
          {location.pathname === "/productos" && usuario ? ( // Mostrar solo en /productos
            <>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-300"
                />
                <span className="text-gray-300">{usuario.nombre}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-300 ml-4">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-300 flex">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-300 mx-2 pt-1"
                />
                <p className="hover:underline">Login</p>
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-300 flex">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="text-gray-300 mx-2 pt-1"
                />
                <p className="hover:underline">Register</p>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
