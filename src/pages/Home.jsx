import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useFavourites } from "../hooks/useFavourites";
import { format, parseISO, addDays, subDays } from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

// Custom calendar input with icon
const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    className="flex items-center border rounded px-3 py-2 text-sm gap-2 cursor-pointer hover:opacity-90"
  >
    <Calendar size={18} className="text-gray-500" />
    <span>{value}</span>
  </button>
));

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { favourites, toggleFavourite, isFavourite } = useFavourites();

  const fetchData = async (selectedDate) => {
    setIsLoading(true);
    try {
      const apiDate = format(selectedDate, "yyyy-MM-dd");
      const apiKey = import.meta.env.VITE_NASA_API_KEY;

      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${apiDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("NASA API Error:", errorData);
        throw new Error(errorData.msg || "API Error");
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Fetch error:", error.message);
      setData({ error: true });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(date);
  }, [date]);

  const changeDate = (days) => {
    const newDate = days > 0 ? addDays(date, days) : subDays(date, -days);
    setDate(newDate);
  };

  const downloadImage = () => {
    if (!data || !data.url) return;
    const link = document.createElement("a");
    link.href = data.hdurl || data.url;
    link.download = "apod.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDisplayDate = (dateStr) => {
    const parsed = parseISO(dateStr);
    return format(parsed, "dd-MM-yyyy");
  };

  return (
    <div className="p-4">
      {/* Calendar & Nav */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          minDate={new Date(1995, 5, 16)} // June 16, 1995
          maxDate={new Date()}
          dateFormat="dd-MM-yyyy"
          customInput={<CustomDateInput />}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
        />
        <div className="flex gap-2">
          <Button onClick={() => changeDate(-1)} className="cursor-pointer">
            ← Prev
          </Button>
          <Button onClick={() => changeDate(1)} className="cursor-pointer">
            Next →
          </Button>
        </div>
      </div>

      {/* APOD Card */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : data?.error ? (
        <p className="text-center text-red-500 mt-4"> Something went wrong. Try another date.</p>
      ) : (
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <p className="text-sm text-muted-foreground">{formatDisplayDate(data.date)}</p>

            {data.media_type === "image" ? (
              <img
                src={data.url}
                alt={data.title}
                className="w-full max-h-[400px] object-contain rounded-md"
              />
            ) : (
              <iframe
                title="space-video"
                src={data.url}
                className="w-full max-h-[400px] rounded-md"
              />
            )}

            <p className="text-muted-foreground text-sm">{data.explanation}</p>

            <div className="flex gap-2 pt-2">
              <Button
  onClick={() => toggleFavourite(data)}
  className={`cursor-pointer border ${
    isFavourite(data) ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"
  }`}
>
  {isFavourite(data) ? "Remove from Favourites" : "Add to Favourites"}
</Button>

              <Button
                onClick={downloadImage}
                className="cursor-pointer hover:opacity-90"
                variant="outline"
              >
                 Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;
