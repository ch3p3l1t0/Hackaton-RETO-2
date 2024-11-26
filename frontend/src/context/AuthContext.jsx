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
  //register
  const signup = async (data) => {
    try {
      const res = await registerRequest(data);
      // esta es toda la respuesta
      console.log(res);
      // entrando a data
      console.log(res.data);

      // si quisieramos que esos datos quedaran solo dentro de la data tendriamos que modificar el backend eliminando el contenido del array y modificandolo por solo los datos de user
    } catch (error) {
      console.error(error.response);
      console.error(error.response.data);
    }
  };
  //login
  const signin = async (data) => {
    try {
      const res = await loginRequest(data);
      console.log(res);
      localStorageUser(res.data.userSaved);
      console.log(res.data.userSaved);
      setUser(res.data.userSaved, localStorage.getItem("user"));
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
