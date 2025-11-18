import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";

export default function AddItem() {
  const [canteens, setCanteens] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    canteen_id: "",
    admin_key: ""
  });

  useEffect(() => {
    axios
      .get(`${API}/api/canteens`)
      .then((res) => setCanteens(res.data))
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 Admin key check
    if (form.admin_key !== "kjlp123") {
      alert("❌ Invalid Admin Key!");
      return;
    }

    if (!form.name || !form.canteen_id) {
      alert("Please fill all required fields!");
      return;
    }

    axios
      .post(`${API}/api/items`, {
        name: form.name,
        description: form.description,
        price: form.price,
        canteen_id: form.canteen_id
      })
      .then(() => alert("Item added successfully!"))
      .catch(() => alert("Error adding item"));
  };

  return (
    <div className="card">
      <h2>Add Item (Admin Only)</h2>

      <form onSubmit={handleSubmit}>
        <label>Item Name</label>
        <input
          className="input"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label>Description</label>
        <textarea
          className="input"
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label>Price</label>
        <input
          className="input"
          type="number"
          placeholder="Price"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <label>Select Canteen</label>
        <select
          className="input"
          onChange={(e) => setForm({ ...form, canteen_id: e.target.value })}
        >
          <option value="">-- Select Canteen --</option>
          {canteens.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <label>Admin Key</label>
        <input
          className="input"
          type="password"
          placeholder="Enter Admin Key"
          onChange={(e) => setForm({ ...form, admin_key: e.target.value })}
        />

        <button className="btn">Add Item</button>
      </form>
    </div>
  );
}
