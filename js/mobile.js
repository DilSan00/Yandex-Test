const products = document.querySelectorAll(".product");
const basket = document.getElementById("basket");
const basketSave = document.getElementById("basket-save");
const button = document.querySelector(".btn");

let itemCount = 0;

products.forEach((product) => {
  product.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];

    let offsetX = touch.clientX - basket.getBoundingClientRect().left;
    let offsetY = touch.clientY - basket.getBoundingClientRect().top;

    const newProduct = document.createElement("div");
    newProduct.classList.add("product");
    newProduct.innerHTML = product.innerHTML;
    newProduct.style.position = "absolute";
    newProduct.style.left = `${offsetX}px`;
    newProduct.style.top = `${offsetY}px`;
    newProduct.draggable = true;
    newProduct.id = `product-${itemCount}`;

    basketSave.appendChild(newProduct);

    itemCount++;
    button.style.display = itemCount >= 3 ? "block" : "none";

    const onTouchMove = (moveEvent) => {
      console.log("x: ", offsetX, "y: ", offsetY);
      const moveTouch = moveEvent.touches[0];
      let offsetXX = moveTouch.clientX - basket.getBoundingClientRect().left;
      let offsetYY = moveTouch.clientY - basket.getBoundingClientRect().top;
      if (offsetYY > 140) {
        offsetYY = 140;
      }
      if (offsetXX > 220) {
        offsetXX = 220;
      }
      if (offsetXX < 80) {
        offsetXX = 80;
      }
      newProduct.style.left = `${offsetXX}px`;
      newProduct.style.top = `${offsetYY}px`;
    };

    const onTouchEnd = () => {
      console.log("x: ", offsetX, "y: ", offsetY);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      product.remove();
    };

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  });
});
