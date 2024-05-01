const draggableList = document.getElementById("draggable-list");
console.group(draggableList);
const checkButton = document.getElementById("check");

const healtyFood = [
  "Water",
  "Dark green vegetables",
  "Whole grains",
  "Beans and lentils",
  "Fish",
  "Berries",
  "Winter squash",
  "Soy",
  "Flaxseed, nuts and seeds",
  "Organic yogurt",
];

// guardar list items
const listItems = [];

let dragStartIndex;

createList();

// insertar list items en el DOM
function createList() {
  // spread operator para genera copia
  // cambiar array a array de objetos
  // cambiar el orden con un value(decimal) random
  // mapear el value(nombre de food)
  // recorrer y crear li
  [...healtyFood]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((food, index) => {
      const listItem = document.createElement("li");
      // creaer custom attribute para difenciarlo
      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `<span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
    <p class="food-name">${food}</p>
    <span class="icon la--grip-lines-vertical"></span>
    </div>`;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });
}
