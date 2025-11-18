import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API } from '../api'

function Stars({n}){
  return <span className='stars'>
    {'★'.repeat(Math.round(n))}
    {'☆'.repeat(5-Math.round(n))}
  </span>
}

export default function Canteen(){
  const { id } = useParams()
  const [items,setItems]=useState([])
  const [name,setName]=useState('')
  const [form,setForm]=useState({item_id:'',rating:5,comment:'',user_name:''})

  useEffect(()=>{ 
    axios.get(`${API}/api/items/canteen/${id}`)
      .then(r=>setItems(r.data))

    axios.get(`${API}/api/canteens`)
      .then(r=>{
        const c = r.data.find(x=>x.id===Number(id))
        if(c) setName(c.name)
      })
  },[id])

  const submitRating = async (e)=>{
    e.preventDefault()
    if(!form.item_id) return alert('Choose an item')

    await axios.post(`${API}/api/ratings`, form)

    alert('Thanks for rating!')
    setForm({...form, rating:5, comment:'', user_name:''})

    const r = await axios.get(`${API}/api/items/canteen/${id}`)
    setItems(r.data)
  }

  return (
    <div>
      <h1>{name || 'Canteen'}</h1>

      <div className="grid">
        {items.map(it=>(

          <div className="card" key={it.id}>
            {it.image_url && (
              <img 
                src={`${API}/uploads/${it.image_url}`} 
                style={{width:"100%",borderRadius:"8px"}} 
              />
            )}

            <h3>{it.name} ₹{it.price}</h3>
            <p>{it.description}</p>
            <div>Avg: <Stars n={it.avg_rating || 0}/> ({it.count_rating})</div>
          </div>

        ))}
      </div>

      <div className="card">
        <h3>Rate an item</h3>
        <form onSubmit={submitRating}>

          <select className="input" value={form.item_id}
            onChange={e=>setForm({...form,item_id:e.target.value})}>
            <option value="">-- choose item --</option>
            {items.map(it=>(
              <option key={it.id} value={it.id}>{it.name}</option>
            ))}
          </select>

          <label>Rating</label>
          <select className="input" value={form.rating}
            onChange={e=>setForm({...form,rating:Number(e.target.value)})}>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Bad</option>
          </select>

          <input className="input" placeholder="Your name (optional)"
            value={form.user_name}
            onChange={e=>setForm({...form,user_name:e.target.value})} />

          <textarea className="input" placeholder="Comment (optional)"
            value={form.comment}
            onChange={e=>setForm({...form,comment:e.target.value})} />

          <button className="btn">Submit Rating</button>
        </form>
      </div>
    </div>
  )
}
