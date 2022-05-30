import "./App.css";
import React, { useState } from "react";
import MascotasCard from "./components/Cards/MascotasCard";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./components/Cards/MascotasCard.css";
import Login from "./components/login";
import MascotasDetail from "./components/Details/MascotasDetail";
import Register from "./components/Register";
import NavBar from "./components/NavBar/NavBar";
import NuevaMascota from "./components/NuevaMascota/NuevaMascota";

function App() {
  document.title = "Mascotas Perdidas";
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  return (
    <div className="container">
      <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></NavBar>
        <Routes>
          <Route exact path="/" element={<MascotasCard />} />
          <Route path="/iniciarSesion" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path="/registro" element={<Register />} />
          <Route path="/nuevaMascota" element={<NuevaMascota />}></Route>
          <Route path="/detail/:keyword" element={<MascotasDetail />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
