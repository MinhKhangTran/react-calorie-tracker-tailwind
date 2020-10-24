import React from "react";
import Alert from "./Alert";
import SearchForm from "./SearchForm";
import TrackerList from "./TrackerList";
import { v4 as uuidv4 } from "uuid";

const getLocalItem = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};
export default function Tracker() {
  const [alert, setAlert] = React.useState({
    show: false,
    type: "",
    msg: ""
  });
  const [meal, setMeal] = React.useState({
    id: "",
    food: "",
    protein: "",
    carb: "",
    fat: "",
    kcal: ""
  });
  const [list, setList] = React.useState(getLocalItem());
  const [isEditing, setIsEditing] = React.useState(false);
  const [editID, setEditID] = React.useState(null);
  const handleChange = (e) => {
    // console.log(e.target);

    const { name, value } = e.target;

    setMeal((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    if (!meal.food || !meal.protein || !meal.carb || !meal.fat || !meal.kcal) {
      showAlert(true, "red", "Bitte etwas eingeben");
      // console.log("allert");
    } else if (
      meal.food &&
      meal.protein &&
      meal.carb &&
      meal.fat &&
      meal.kcal &&
      isEditing
    ) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              food: meal.food,
              protein: meal.protein,
              carb: meal.carb,
              fat: meal.fat,
              kcal: meal.kcal
            };
          }
          return item;
        })
      );
      setIsEditing(false);
      setEditID(null);
      setMeal({
        id: "",
        food: "",
        protein: "",
        carb: "",
        fat: "",
        kcal: ""
      });
      showAlert(true, "blue", "Eintrag wurde geändert");
    } else {
      const newMeal = {
        id: uuidv4(),
        food: meal.food,
        protein: meal.protein,
        carb: meal.carb,
        fat: meal.fat,
        kcal: meal.kcal
      };
      setList([...list, newMeal]);
      console.log(meal);

      setMeal({
        id: "",
        food: "",
        protein: "",
        carb: "",
        fat: "",
        kcal: ""
      });
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const removeId = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "red", "Diese Mahlzeit wurde entfernt");
  };

  const editItem = (id) => {
    setIsEditing(true);
    setEditID(id);
    const uniqueItem = list.find((item) => item.id === id);
    setMeal(uniqueItem);
  };
  React.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <>
      <section className="text-center">
        {alert.show && (
          <Alert alert={alert} showAlert={showAlert} list={list} />
        )}

        <h1 className="text-indigo-500 text-xl border-b-2 inline-block border-indigo-500 mt-2">
          Wie viel hast du heute gegessen?
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-5 mt-2 gap-x-2 w-11/12 md:w-4/5 mx-auto gap-3">
            <SearchForm
              type="text"
              name="food"
              value={meal.food}
              handleChange={handleChange}
            />
            <SearchForm
              type="number"
              name="protein"
              value={meal.protein}
              handleChange={handleChange}
            />
            <SearchForm
              type="number"
              name="carb"
              value={meal.carb}
              handleChange={handleChange}
            />
            <SearchForm
              type="number"
              name="fat"
              value={meal.fat}
              handleChange={handleChange}
            />
            <SearchForm
              type="number"
              name="kcal"
              value={meal.kcal}
              handleChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-400 text-indigo-100 px-3 my-3 rounded capitalize hover:bg-indigo-700"
          >
            {isEditing ? "ändern" : "hinzufügen"}
          </button>
        </form>

        {list.length > 0 && (
          <article>
            <TrackerList list={list} removeId={removeId} editItem={editItem} />

            <div className="grid grid-cols-5 mt-2 gap-x-2 w-11/12 md:w-4/5 font-semibold mx-auto gap-3 border-2 border-indigo-400 bg-indigo-400 text-indigo-100">
              <h1>Gesamt</h1>
              <h1>
                {list.reduce((total, item) => {
                  item = parseInt(item.protein, 0);
                  // console.log(item);
                  // console.log(total);
                  return (total += item);
                }, 0)}
              </h1>
              <h1>
                {list.reduce((total, item) => {
                  item = parseInt(item.carb, 0);
                  // console.log(item);
                  // console.log(total);
                  return (total += item);
                }, 0)}
              </h1>
              <h1>
                {list.reduce((total, item) => {
                  item = parseInt(item.fat, 0);
                  // console.log(item);
                  // console.log(total);
                  return (total += item);
                }, 0)}
              </h1>
              <h1>
                {list.reduce((total, item) => {
                  item = parseInt(item.kcal, 0);
                  // console.log(item);
                  // console.log(total);
                  return (total += item);
                }, 0)}
              </h1>
            </div>
            <div className="bg-red-500 rounded text-red-200 px-3 hover:bg-red-700 inline-block text-center mt-5">
              <button onClick={() => setList([])}>Alles löschen</button>
            </div>
          </article>
        )}
      </section>
    </>
  );
}
