import React from "react";
import TrackerItem from "./TrackerItem";

export default function TrackerList({ list, removeId, editItem }) {
  return (
    <>
      <h1 className="text-indigo-500 text-xl border-b-2 inline-block border-indigo-500 mt-2">
        Deine Mahlzeiten
      </h1>
      <div className="grid grid-cols-5 mt-2 gap-x-2 w-11/12 md:w-4/5 md:font-semibold mx-auto gap-3 border-2 border-indigo-400">
        <h1>Essen</h1>
        <h1>Protein</h1>
        <h1>Carbs</h1>
        <h1>Fette</h1>
        <h1>Kcal</h1>
      </div>
      <article>
        {list.map((item) => {
          return (
            <TrackerItem
              key={item.id}
              {...item}
              removeId={removeId}
              editItem={editItem}
            />
          );
        })}
      </article>
    </>
  );
}
