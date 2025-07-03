import { useState } from "react";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavourite = (apod) => {
    const exists = favourites.some(f => f.date === apod.date);
    const updated = exists
      ? favourites.filter(f => f.date !== apod.date)
      : [...favourites, apod];

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const isFavourite = (apod) => {
    return favourites.some(f => f.date === apod.date);
  };

  return { favourites, toggleFavourite, isFavourite };
};
