import React, { useEffect, useState } from "react";
import { useFavourites } from "../hooks/useFavourites";
import APODCard from "../components/APODCard";

const Favourites = () => {
  const { favourites, toggleFavourite } = useFavourites();
  const [cards, setCards] = useState([]);

  // Initialize local cards once
  useEffect(() => {
    const initializedCards = favourites.map((item) => ({
      ...item,
      localFavourite: true,
    }));
    setCards(initializedCards);
  }, []); // important: run only once on mount

  const handleToggle = (apod) => {
    toggleFavourite(apod);

    // Just flip local state
    setCards((prev) =>
      prev.map((item) =>
        item.date === apod.date
          ? { ...item, localFavourite: !item.localFavourite }
          : item
      )
    );
  };

  return (
    <div className="p-4">
      {cards.length === 0 ? (
        <p className="text-center">No favourites yet.</p>
      ) : (
        cards.map((apod) => (
          <APODCard
            key={apod.date}
            apod={apod}
            isFavourite={apod.localFavourite}
            onToggleFavourite={() => handleToggle(apod)}
          />
        ))
      )}
    </div>
  );
};

export default Favourites;
