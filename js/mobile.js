const products = document.querySelectorAll(".product");
const basketSave = document.getElementById("basket-save");
const button = document.querySelector(".btn");

let itemCount = 0; 

products.forEach((product) => {
  product.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    const newProduct = document.createElement("div");
    newProduct.classList.add("product");
    newProduct.innerHTML = product.innerHTML; 
    newProduct.style.position = "absolute";
    newProduct.style.left = `${touch.clientX}px`;
    newProduct.style.top = `${touch.clientY}px`;
    basketSave.appendChild(newProduct);

    itemCount++;
    button.style.display = itemCount >= 3 ? "block" : "none";

    // Перемещение продукта
    const onTouchMove = (moveEvent) => {
      const moveTouch = moveEvent.touches[0];
      newProduct.style.left = `${moveTouch.clientX}px`;
      newProduct.style.top = `${moveTouch.clientY}px`;
    };

    // Обработка завершения перетаскивания
    const onTouchEnd = () => {
      newProduct.style.position = "absolute";
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      product.remove(); 
    };

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  });
});




