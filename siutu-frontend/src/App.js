import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext.jsx";
import Home from "./components/Home";
import Viaje from "./components/Viaje";
import Reserva from "./components/Reserva";
import Login from "./components/Login";
import Registro from "./components/Registro";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/viaje"
            element={
              <PrivateRoute>
                <Viaje />
              </PrivateRoute>
            }
          />
          <Route
            path="/reserva"
            element={
              <PrivateRoute>
                <Reserva />
              </PrivateRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
}

export default App;

/*<Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/viaje" element={<PrivateRoute><Viaje /></PrivateRoute>} />
      <Route path="/reserva" element={<PrivateRoute><Reserva /></PrivateRoute>} />
    </Routes>*/
