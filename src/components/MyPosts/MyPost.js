import React, { useState, useEffect } from 'react'
import MascotasCard from '../Cards/MascotasCard'
import { collection, onSnapshot, query, getDoc } from 'firebase/firestore';
import { getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import {  where } from "firebase/firestore";
import { AuthErrorCodes } from 'firebase/auth';


function MyPost({ isLoggedIn }) {
  console.log("Estoy en my post")
 
  
  const [mascotasList, setMascotasList] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

 


  const postsCollectionRef = collection(db, "mascotas");

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    const pepe = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    console.log(pepe[0].author.id, "pepe")
  
    let filtered = pepe.filter(row => row.author.id == auth.currentUser.uid);
    setMascotas(filtered)
console.log(filtered, "filterred");
  };
  

 
  useEffect(() => {
    




    getPosts()
  }, []);
  /*
  useEffect(() => {
  

    const pepe = mascotasList.filter((mascotaList) =>{ return mascotaList.author.id === auth.currentUser.uid })
   
    console.log(pepe, "mascotasList")
    debugger
    setMascotas(pepe);
    getPosts();
  }, [mascotasList]);
 */


  return(

    <div>
      <MascotasCard mascotas={mascotas} loading={loading} />
    </div>
  )

}

export default MyPost