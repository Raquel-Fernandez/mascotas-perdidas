import "./App.css";
import React, { useState, useEffect } from "react";
import MascotasCard from "./components/Cards/MascotasCard";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./components/Cards/MascotasCard.css";
import Login from "./components/login";
import MascotasDetail from "./components/Details/MascotasDetail";
import Register from "./components/Register";
import NavBar from "./components/NavBar/NavBar";
import NuevaMascota from "./components/NuevaMascota/NuevaMascota";
import mascotasPerdidas from "./mock/Mascotas";
import MyPosts from "./components/MyPosts/MyPosts";


function App() {
  document.title = "Mascotas Perdidas";
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const [mascotas, setMascotas] = useState([]);
  
    useEffect(() => {
      setMascotas(mascotasPerdidas);
    }, []);
    
  return (
    <div className="container">
      <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></NavBar>
        <Routes>
          <Route exact path="/" element={<MascotasCard isLoggedIn={isLoggedIn} mascotas={mascotas}/>} />
          <Route path="/iniciarSesion" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path="/registro" element={<Register />} />
          <Route path="/nuevaMascota" element={<NuevaMascota isLoggedIn={isLoggedIn}/>}></Route>
          <Route path="/detail/:keyword" element={<MascotasDetail />}></Route>
          <Route path="/myPosts" element={<MyPosts />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
