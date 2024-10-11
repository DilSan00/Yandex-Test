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

  const offsetX = event.clientX - basket.getBoundingClientRect().left - 10;
  const offsetY = event.clientY - basket.getBoundingClientRect().top - 10;

  const newProduct = document.createElement("div");
  newProduct.classList.add("product");
  newProduct.innerHTML = event.dataTransfer.getData("text/plain");
  newProduct.style.position = "absolute";
  newProduct.style.left = `${offsetX}px`;
  newProduct.style.top = `${offsetY}px`;
  newProduct.draggable = true;

  basketSave.appendChild(newProduct);

  const originalProduct = [...products].find(
    (product) =>
      product.innerHTML === event.dataTransfer.getData("text/product-id")
  );
  if (originalProduct) {
    originalProduct.remove();
  }

  itemCount++;
  button.style.display = itemCount >= 3 ? "block" : "none";
});

// Touch events для мобильных устройств
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

    const onTouchMove = (moveEvent) => {
      const moveTouch = moveEvent.touches[0];
      newProduct.style.left = `${moveTouch.clientX}px`;
      newProduct.style.top = `${moveTouch.clientY}px`;
    };

    const onTouchEnd = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      product.remove();
    };

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  });
});
