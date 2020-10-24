import React from "react";

export default function SearchForm({ type, name, value, handleChange }) {
  return (
    <>
      <input
        className="rounded bg-indigo-200 pl-2"
        type={type}
        placeholder={name}
        value={value}
        onChange={handleChange}
        name={name}
      ></input>
    </>
  );
}
