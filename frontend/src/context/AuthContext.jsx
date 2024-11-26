/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const localStorageUser = () => {
    const user = localStorage.getItem("user");
    return user;
  };

  const signup = async (data) => {
    try {
      const res = await registerRequest(data);
      // esta es toda la respuesta
      console.log(res);
      // entrando a data
      console.log(res.data);
      // como en el backend estoy devolviendo un array con success y con esta propiedad entonces es aqui a donde debemos acceder
      setIsAuth(true);

      // si quisieramos que esos datos quedaran solo dentro de la data tendriamos que modificar el backend eliminando el contenido del array y modificandolo por solo los datos de user
    } catch (error) {
      console.error(error.response);
      console.error(error.response.data);
    }
  };

  const signin = async (data) => {
    try {
      const res = await loginRequest(data);
      console.log(res);
      localStorageUser();
      console.log(res.data.userSaved);
      setUser(
        res.data.userSaved,
        localStorage.setItem("user", res.data.userSaved)
      );
      // setUser(res.data.userSaved);
      // setIsAuth(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        console.error(error.response.data);
      }
      console.log([error.response.data.message]);
    }
  };
  return (
    <AuthContext.Provider value={{ user, isAuth, signin, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
