import axios from "axios";

export const registerRequest = (user) => {
  return axios.post(`/autenticacion/register`, user);
};

export const loginRequest = (user) => {
  return axios.post(`/autenticacion/login`, user);
};

// export const logoutRequest = () => {
//   return axios.post(`/autenticacion/logout`);
// };

// export const verifyTokenRequest = () => {
//   return axios.get(`/autenticacion/verifyToken`);
// };
