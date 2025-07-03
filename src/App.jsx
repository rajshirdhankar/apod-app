import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function APITest() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;
    const today = new Date().toISOString().split("T")[0];
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${today}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Invalid or missing API key.");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>NASA API Key Test</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <>
          <h2>{data.title}</h2>
          <img src={data.url} alt={data.title} style={{ maxWidth: "400px" }} />
          <p>{data.date}</p>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/apitest" element={<APITest />} />
      </Routes>
    </Router>
  );
}

export default App;