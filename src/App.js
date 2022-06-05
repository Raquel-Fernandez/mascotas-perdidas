import "./App.css";
import React, { useState, useEffect } from "react";
import MascotasCard from "./components/Cards/MascotasCard";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./components/Cards/MascotasCard.css";
import Login from "./components/login/Login";
import MascotasDetail from "./components/Details/MascotasDetail";
import Register from "./components/Register";
import NavBar from "./components/NavBar/NavBar";
import NuevaPublicacion from "./components/NuevaPublicacion/NuevaPublicacion";  
import MyPost from "./components/MyPosts/MyPost";
import { collection, onSnapshot, query, getDoc, orderBy} from 'firebase/firestore';
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

//import { storage } from "./firebase-config";
function App() {

  document.title = "Mascotas Perdidas";
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );


  //const [imageUrls, setImageUrls] = useState([]);

  //const imagesListRef = ref(storage, "images/");

  /*useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);*/

  
  const [mascotas, setMascotas] = useState([]);

  const postsCollectionRef = collection(db, "mascotas");
  const postsOrdered = query(postsCollectionRef, orderBy("timeNow", "desc"));

  const getPosts = async () => {
    const data = await getDocs(postsOrdered)
    setMascotas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    getPosts();
  }, []);




  return (
    
    <div className="container">
      
      <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></NavBar>
        <Routes>
          <Route exact path="/" element={<MascotasCard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} mascotas={mascotas} setMascotas={setMascotas}/>} />
          <Route path="/registro" element={<Register />} />
          <Route path="/nuevaPublicacion" element={<NuevaPublicacion isLoggedIn={isLoggedIn}/>}></Route>
          <Route path="/detail/:keyword" element={<MascotasDetail />}></Route>
          <Route path="/myPosts" element={<MyPost isLoggedIn={isLoggedIn}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
