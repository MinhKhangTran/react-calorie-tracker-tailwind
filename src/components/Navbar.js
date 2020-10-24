import React from "react";
import { GiMeal } from "react-icons/gi";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center py-3 bg-indigo-200">
      <GiMeal className="text-indigo-500 text-3xl md:text-5xl " />
      <h1 className="text-indigo-500 text-3xl md:text-5xl font-mono pl-4">
        Tracker
      </h1>
    </div>
  );
}
