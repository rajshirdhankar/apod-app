import React from "react";
import { Button } from "@/components/ui/button";

const APODCard = ({ apod, isFavourite, onToggleFavourite }) => {
  const formattedDate = new Date(apod.date)
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-");

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white shadow border border-gray-300 dark:border-gray-700 rounded-xl p-4 max-w-2xl mx-auto mb-8">
      <h2 className="text-lg font-semibold">{apod.title}</h2>
      <p className="text-sm mb-2">{formattedDate}</p>

      <img
        src={apod.url}
        alt={apod.title}
        className="rounded-xl w-full max-h-[400px] object-contain"
        loading="lazy"
      />

      <p className="text-sm mt-4 text-gray-800 dark:text-gray-200 leading-relaxed">
        {apod.explanation}
      </p>

      <div className="flex gap-3 mt-4">
        <Button
          onClick={onToggleFavourite}
          className="cursor-pointer hover:opacity-90"
          variant={isFavourite ? "destructive" : "default"}
        >
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </Button>

        <a
          href={apod.hdurl || apod.url}
          download={`apod-${apod.date}.jpg`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="cursor-pointer hover:opacity-90"
          >
            Download
          </Button>
        </a>
      </div>
    </div>
  );
};

export default APODCard;
