import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const APODCard = ({ apod, isFavourite, onToggleFavourite }) => {
  const formattedDate = new Date(apod.date).toLocaleDateString("en-GB").replace(/\//g, "-");

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white shadow rounded-xl p-4 max-w-2xl mx-auto mb-8">
      <h2 className="text-lg font-semibold">{apod.title}</h2>
      <p className="text-sm mb-2">{formattedDate}</p>
      <img
        src={apod.url}
        alt={apod.title}
        className="rounded-xl w-full max-h-[500px] object-cover"
        loading="lazy"
      />
      <p className="text-sm mt-4 text-gray-800 dark:text-gray-200 leading-relaxed">
        {apod.explanation}
      </p>
      <div className="flex gap-3 mt-4">
        <Button
          variant={isFavourite ? "destructive" : "default"}
          onClick={onToggleFavourite}
        >
          <Heart className="mr-2 h-4 w-4" />
          {isFavourite ? "Unfavourite" : "Add to Favourites"}
        </Button>
        <a
          href={apod.hdurl || apod.url}
          download={`apod-${apod.date}.jpg`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline">Download</Button>
        </a>
      </div>
    </div>
  );
};

export default APODCard;
