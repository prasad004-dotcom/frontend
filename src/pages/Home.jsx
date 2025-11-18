import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../api';

export default function Home(){
  const [canteens,setCanteens]=useState([]);

  useEffect(()=>{ 
    axios.get(`${API}/api/canteens`)
      .then(r=>setCanteens(r.data))
      .catch(()=>{}) 
  },[]);

  return (
    <div>
      <h1>KARE CANTEENS</h1>
      <p>Welcome to KARE Canteens!</p>
      <p>Owners can ping me to add canteens → <span className="mail_id">prasadlucky040904@gmail.com</span></p>
      
      <div className="grid">
        {canteens.map(c=>(
          <div className="card" key={c.id}>
            <h3>{c.name}</h3>
            <p>{c.location}</p>
            <Link to={`/canteen/${c.id}`} className="btn">Open</Link>
          </div>
        ))}
        {canteens.length===0 && <div className="card">No canteens yet.</div>}
      </div>
    </div>
  );
}
