import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCanteen from "./pages/AddCanteen";
import AddItem from "./pages/AddItem";
import Canteen from "./pages/Canteen";
import TopItems from "./pages/TopItems";

export default function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/add-canteen">Add Canteen</Link>
        <Link to="/add-item">Add Item</Link>
        <Link to="/top">Top Items</Link>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-canteen" element={<AddCanteen />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/canteen/:id" element={<Canteen />} />
          <Route path="/top" element={<TopItems />} />
        </Routes>
      </main>

      <footer style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        opacity: 0.7,
        fontSize: "14px"
      }}>
        Developed by <b>KJLP Labs</b>
      </footer>
    </div>
  );
}
