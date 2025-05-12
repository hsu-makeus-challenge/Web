import React from "react";

export default function SkeletonCard() {
  return (
    <div
      className="relative w-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 animate-pulse"
      style={{ paddingBottom: "100%" }}
    >
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <div className="w-2/3 h-6 bg-gray-500 rounded mb-2 opacity-60" />
        <div className="w-1/2 h-4 bg-gray-500 rounded opacity-40" />
      </div>
    </div>
  );
}