import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

export default function AddItem() {
  const [canteens,setCanteens]=useState([]);
  const [form,setForm]=useState({
    name:'',
    description:'',
    price:'',
    canteen_id:'',
    image: null
  });
  const nav = useNavigate();

  useEffect(()=>{
    axios.get(`${API}/api/canteens`)
      .then(r=>setCanteens(r.data));
  },[]);

  const submit = async (e)=>{
    e.preventDefault();

    if(!form.name || !form.canteen_id) return alert("Missing fields");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("canteen_id", form.canteen_id);
    fd.append("image", form.image);

    await axios.post(`${API}/api/items`, fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Item added!");
    nav("/");
  };

  return (
    <div className="card">
      <h2>Add Item</h2>
      <form onSubmit={submit}>

        <input className="input" placeholder="Item name"
          onChange={e=>setForm({...form,name:e.target.value})} />

        <textarea className="input" placeholder="Description"
          onChange={e=>setForm({...form,description:e.target.value})} />

        <input className="input" placeholder="Price"
          onChange={e=>setForm({...form,price:e.target.value})} />

        <select className="input"
          onChange={e=>setForm({...form,canteen_id:e.target.value})}>
          
          <option value="">-- select canteen --</option>
          {canteens.map(c=>(
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input type="file" className="input"
          onChange={e=>setForm({...form,image:e.target.files[0]})} />

        <button className="btn">Add Item</button>
      </form>
    </div>
  );
}
