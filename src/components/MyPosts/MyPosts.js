import React, {useState, useEffect} from 'react'
import MascotasCard from '../Cards/MascotasCard';

function MyPosts() {
    const [mascotas, setMascotas] = useState([])
    const mascotasPerdidas = [
        {
          id: 13,
          name: "Lola",
          lugar: "A Coruña",
          fecha: "07/05/2022",
     
        },
        
      ];
    useEffect(() => {
        setMascotas(mascotasPerdidas);
      }, []);
    
  return (
    <MascotasCard  mascotas={mascotas}/>
  )
}

export default MyPosts