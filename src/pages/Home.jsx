// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

function Home() {
  const [apods, setApods] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedDate) return;

    if (!API_KEY) {
      setError("Missing NASA API key. Please check your .env file.");
      return;
    }

    const today = new Date();
    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate);
    endDate.setDate(startDate.getDate() + 6);

    const actualEndDate = endDate > today ? today : endDate;

    const formattedStart = startDate.toISOString().split("T")[0];
    const formattedEnd = actualEndDate.toISOString().split("T")[0];

    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${formattedStart}&end_date=${formattedEnd}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch APOD data.");
        return res.json();
      })
      .then((data) => {
        const finalData = Array.isArray(data)
          ? data.sort((a, b) => new Date(a.date) - new Date(b.date))
          : [data];
        setApods(finalData);
        setError("");
      })
      .catch((err) => {
        console.error("API error:", err);
        setError("Could not fetch image(s). Try another date.");
      });
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">NASA APOD Viewer</h1>
        <p className="text-center text-gray-600 mb-6">
          Select a date to explore 7 days of NASA Astronomy Pictures!
        </p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <Input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full max-w-xs"
          />
        </div>

        {error && (
          <div className="text-red-600 text-center font-medium mb-4">{error}</div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apods.map((apod) => (
            <Card key={apod.date} className="shadow-lg hover:scale-[1.02] transition">
              <CardHeader>
                <CardTitle className="text-lg">{apod.title}</CardTitle>
                <p className="text-xs text-gray-500">{apod.date}</p>
              </CardHeader>
              <CardContent>
                {apod.media_type === "image" ? (
                  <img
                    src={apod.url}
                    alt={apod.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                ) : (
                  <iframe
                    src={apod.url}
                    title={apod.title}
                    className="w-full h-48 rounded-md mb-2"
                    allowFullScreen
                  ></iframe>
                )}
                <p className="text-sm text-gray-700 line-clamp-5">
                  {apod.explanation}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
