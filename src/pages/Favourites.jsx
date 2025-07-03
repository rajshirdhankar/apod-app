import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Favourites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      console.log("Loaded favorites from localStorage:", stored);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.error("Error parsing favorites:", e);
      setFavorites([]);
    }
  }, []);

  console.log("Favorites state:", favorites);

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          My Favorite APODs
        </h1>
        {/* Clear Button */}
        {favorites.length > 0 && (
          <div className="text-center mb-6">
            <button
              onClick={clearFavorites}
              className="text-sm text-red-500 underline"
            >
              Clear All Favorites
            </button>
          </div>
        )}
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">
            No favorites yet. Go add some!
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((apod) => (
              <Card key={apod.date} className="shadow-lg">
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
        )}
      </div>
    </div>
  );
}

export default Favourites;