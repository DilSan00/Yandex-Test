if ("ontouchstart" in window) {
  // Мобильное устройство
  const script = document.createElement("script");
  script.src = "/js/mobile.js";
  document.body.appendChild(script);
} else {
  // Десктоп
  const script = document.createElement("script");
  script.src = "/js/desktop.js";
  document.body.appendChild(script);
}
