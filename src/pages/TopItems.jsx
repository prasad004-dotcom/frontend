import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { API } from '../api'

function Stars({n}){
  return <span className='stars'>
    {'★'.repeat(Math.round(n))}
    {'☆'.repeat(5-Math.round(n))}
  </span>
}

export default function TopItems(){
  const [items,setItems]=useState([])

  useEffect(()=>{ 
    axios.get(`${API}/api/ratings/top`)
      .then(r=>setItems(r.data))
  },[])

  return (
    <div>
      <h1>Top Rated Items</h1>
      <div className="grid">
        {items.map(it=>(

          <div className="card" key={it.id}>
            <h3>{it.name}</h3>
            <p>{it.description}</p>
            <div>Avg: <Stars n={it.avg_rating || 0}/> ({it.count_rating})</div>
          </div>

        ))}
      </div>
    </div>
  )
}
