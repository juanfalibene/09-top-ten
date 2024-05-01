const draggableList = document.getElementById("draggable-list");
const checkButton = document.getElementById("check");

const healtyFood = [
  "Water 🚰",
  "Dark green vegetables 🥦",
  "Whole grains 🌾",
  "Beans and lentils 🫘",
  "Fish 🐟",
  "Berries 🫐",
  "Winter squash 🍠",
  "Soy 🫛",
  "Flaxseed, nuts and seeds 🌰",
  "Organic yogurt 🍦",
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
    </div>`;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListener();
}

function dragStart() {
  //console.log("Event ", "dragstart");
  // tomar el atributo custom (index) de elemento mas cercano
  // + delante de this para convertirlo en numero
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  //console.log("Event ", "dragenter");
  //usar this que pertecene a la lista de los elementos
  this.classList.add("over");
}
function dragLeave() {
  //console.log("Event ", "dragsleave");
  this.classList.remove("over");
}
function dragOver(e) {
  //console.log("Event ", "dragover");
  e.preventDefault();
}
function dragDrop() {
  //console.log("Event ", "drop");
  const dragEndIndex = +this.getAttribute("data-index");
  // controla el final
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

// switchear los div
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// check orden de list items .trim() para evitar espacion en blanco en el nombre
function checkOrder() {
  console.log("check");
  listItems.forEach((listItem, index) => {
    const foodName = listItem.querySelector(".draggable").innerText.trim();
    console.log(foodName, index);

    // match index de items ordenados segun usuario y array
    if (foodName !== healtyFood[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

checkButton.addEventListener("click", checkOrder);
