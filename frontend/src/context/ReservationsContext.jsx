/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ReservationsContext = createContext();

export const ReservationsProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  return (
    <ReservationsContext.Provider value={{}}>
      {children}
    </ReservationsContext.Provider>
  );
};
