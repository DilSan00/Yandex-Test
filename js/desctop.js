const products = document.querySelectorAll(".product");
const basket = document.getElementById("basket");
const basketSave = document.getElementById("basket-save");
const button = document.querySelector(".btn");

let itemCount = 0;

products.forEach((product) => {
  product.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.outerHTML);
    event.dataTransfer.setData("text/product-id", event.target.innerHTML);
  });
});

basket.addEventListener("dragover", (event) => {
  event.preventDefault();
});

basket.addEventListener("drop", (event) => {
  event.preventDefault();

  let offsetX = event.clientX - basket.getBoundingClientRect().left - 10;
  let offsetY = event.clientY - basket.getBoundingClientRect().top - 10;

  if (offsetY > 140) {
    offsetY = 140;
  }
  if (offsetX > 220) {
    offsetX = 220;
  }
  if (offsetX < 80) {
    offsetX = 80;
  }

  const newProduct = document.createElement("div");
  newProduct.classList.add("product");
  newProduct.innerHTML = event.dataTransfer.getData("text/plain");
  newProduct.style.position = "absolute";
  newProduct.style.left = `${offsetX}px`;
  newProduct.style.top = `${offsetY}px`;
  newProduct.draggable = true;
  newProduct.id = `product-${itemCount}`;

  basketSave.appendChild(newProduct);

  itemCount++;
  button.style.display = itemCount >= 3 ? "block" : "none";
});
