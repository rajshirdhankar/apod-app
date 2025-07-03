import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-6 bg-gray-300 rounded w-2/3" />
      <div className="h-96 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-300 rounded w-full" />
      <div className="h-4 bg-gray-300 rounded w-5/6" />
      <div className="h-4 bg-gray-300 rounded w-2/3" />
      <div className="flex gap-4 pt-4">
        <div className="h-10 w-36 bg-gray-300 rounded" />
        <div className="h-10 w-36 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
