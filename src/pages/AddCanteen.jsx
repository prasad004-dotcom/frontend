import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

export default function AddCanteen() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    location: "",
    admin_key: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    if (form.admin_key !== "kjlp123") {
      alert("Invalid Admin Key!");
      return;
    }

    if (!form.name) return alert("Canteen name required!");

    await axios.post(`${API}/api/canteens`, {
      name: form.name,
      location: form.location
    });

    alert("Canteen created!");
    nav("/");
  };

  return (
    <div className="card">
      <h2>Add Canteen (Admin Only)</h2>
      <form onSubmit={submit}>
        <label>Canteen Name</label>
        <input className="input"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <label>Location</label>
        <input className="input"
          onChange={(e) => setForm({ ...form, location: e.target.value })} />

        <label>Admin Key</label>
        <input className="input" type="password"
          onChange={(e) => setForm({ ...form, admin_key: e.target.value })} />

        <button className="btn">Create Canteen</button>
      </form>
    </div>
  );
}
