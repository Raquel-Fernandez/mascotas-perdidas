import React, { useState, useEffect } from 'react'
import MascotasCard from '../Cards/MascotasCard'
import { collection, query, getDocs } from 'firebase/firestore';
import { auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { orderBy } from "firebase/firestore";


function MyPost({ isLoggedIn }) {

  let navigate = useNavigate();

  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  const postsCollectionRef = collection(db, "mascotas")
  const postsOrdered = query(postsCollectionRef, orderBy("timeNow", "desc"));
    
  const getPosts = async () => {
    const data = await getDocs(postsOrdered);
    const dataList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  
    let myData = dataList.filter(row => row.author.id == auth.currentUser.uid);
    setMascotas(myData)
  };
  
  useEffect(() => {
    getPosts()
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/iniciarSesion");
    }
  }, [isLoggedIn, navigate]);

  return(
    <div>
      <MascotasCard mascotas={mascotas} loading={loading} isLoggedIn = {isLoggedIn} setMascotas={setMascotas}/>
    </div>
  )
}

export default MyPost