import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function TrackerItem({
  id,
  food,
  protein,
  carb,
  fat,
  kcal,
  removeId,
  editItem
}) {
  const [toggle, setToggle] = React.useState(false);
  const handleEdit = () => {
    editItem(id);
    setToggle(!toggle);
  };
  const handleDelete = () => {
    removeId(id);
    setToggle(!toggle);
  };

  return (
    <>
      <div
        key={id}
        className="relative grid grid-cols-5 mt-2 gap-x-2 w-11/12 md:w-4/5 mx-auto gap-3"
      >
        <h1 className="capitalize">{food}</h1>
        <h1>{protein}</h1>
        <h1>{carb}</h1>
        <h1>{fat}</h1>
        <h1>{kcal}</h1>
        <button
          className="absolute right-0"
          onClick={() => {
            setToggle(!toggle);
          }}
          style={{ top: "15%" }}
        >
          <BiDotsVerticalRounded />
        </button>
        {toggle && (
          <div className=" absolute right-0 mt-6 flex flex-col bg-white p-5 rounded overflow-hidden">
            <button
              className="flex items-center text-green-500"
              onClick={handleEdit}
            >
              <AiOutlineEdit className="mr-2" /> Ändern
            </button>
            <button
              className="flex items-center text-red-500"
              onClick={handleDelete}
            >
              <AiOutlineDelete className="mr-2" /> Löschen
            </button>
          </div>
        )}
      </div>
    </>
  );
}
