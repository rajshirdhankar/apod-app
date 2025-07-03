import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          const message =
            errorData.error?.message || "Failed to fetch APOD data.";
          throw new Error(message);
        }
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
        setError(err.message);
      });
  }, [selectedDate]);

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavorite = (apod) => {
    const isFavorite = favorites.some((fav) => fav.date === apod.date);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.date !== apod.date);
    } else {
      updatedFavorites = [...favorites, apod];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (date) => favorites.some((fav) => fav.date === date);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          NASA APOD Viewer
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Select a date to explore 7 days of NASA Astronomy Pictures!
        </p>

        <div className="relative w-[220px] mx-auto">
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full pl-4 pr-3 py-2 text-sm rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          />
        </div>

        {error && (
          <div className="text-red-600 text-center font-medium mb-4">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apods.map((apod) => (
            <Card
              key={apod.date}
              className="shadow-lg hover:scale-[1.02] transition"
            >
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

                <div className="flex flex-wrap gap-2 mt-3">
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(apod)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      isFavorite(apod.date)
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {isFavorite(apod.date)
                      ? "Remove Favorite"
                      : "Add to Favorites"}
                  </button>

                  {/* View Image Button (only for images) */}
                  {apod.media_type === "image" && (
                    <button
                      onClick={() => {
                        window.open(apod.url, "_blank");
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                    >
                      View
                    </button>
                  )}

                  {/* Download Button (only for images) */}
                  {apod.media_type === "image" && (
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch(apod.url);
                          const blob = await response.blob();
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = url;
                          link.download = `${apod.title || "apod"}.jpg`;
                          link.click();
                          URL.revokeObjectURL(url);
                        } catch {
                          alert("Download failed. Try View instead.");
                        }
                      }}
                      className="px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                    >
                      Download
                    </button>
                  )}

                  {/* Share Button */}
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: apod.title,
                            text: "Check out this NASA Astronomy Picture of the Day!",
                            url: apod.url,
                          })
                          .catch((err) => console.error("Share failed:", err));
                      } else {
                        alert("Sharing not supported on this browser.");
                      }
                    }}
                    className="px-3 py-1 bg-purple-500 text-white rounded-md text-sm"
                  >
                    Share
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;