/* eslint-disable react/prop-types */
import { createContext } from "react";

export const ReservationsContext = createContext();

export const ReservationsProvider = ({ children }) => {
  return (
    <ReservationsContext.Provider value={{}}>
      {children}
    </ReservationsContext.Provider>
  );
};
