import React from "react";
import { useFavourites } from "../hooks/useFavourites";
import APODCard from "../components/APODCard";

const Favourites = () => {
  const { favourites, toggleFavourite } = useFavourites();

  return (
    <div className="p-4">
      {favourites.length === 0 ? (
        <p className="text-center">No favourites yet.</p>
      ) : (
        favourites.map((apod) => (
          <APODCard
            key={apod.date}
            apod={apod}
            isFavourite={true}
            onToggleFavourite={() => toggleFavourite(apod)}
          />
        ))
      )}
    </div>
  );
};

export default Favourites;
