import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Error404 from "./pages/Error404";
import Login from "./pages/login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/*"
            element={<Error404 />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          {/* Rutas Privadas  */}
          <Route
            path="/dashboard/admin"
            element={<AdminDashboard />}
          />
          <Route
            path="/dashboard/admin/listRervations"
            element={<AdminDashboard />}
          />
          <Route
            path="/dashboard/user"
            element={<UserDashboard />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
