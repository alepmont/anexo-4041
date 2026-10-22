const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    navigation.classList.remove("is-open");
  }
});

document.querySelectorAll(".activity-carousel").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const count = carousel.querySelector(".carousel-count");
  const buttons = carousel.querySelectorAll(".carousel-button");
  let activeIndex = 0;

  buttons.forEach((button) => {
    button.disabled = slides.length < 2;
    button.addEventListener("click", () => {
      activeIndex = (activeIndex + Number(button.dataset.direction) + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });
      count.textContent = `${activeIndex + 1} / ${slides.length}`;
    });
  });
});
