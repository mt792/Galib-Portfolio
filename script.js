/* -------------------------------
   MOBILE MENU
--------------------------------*/
const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("show");
});


/* -------------------------------
   THEME TOGGLE (LIGHT / DARK)
--------------------------------*/
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});


/* -------------------------------
   SCROLL REVEAL ANIMATIONS
--------------------------------*/
const revealElements = document.querySelectorAll(".fade-in, .slide-up");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect().top;
    if (rect < trigger) el.classList.add("show");
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* -------------------------------
   MODAL VIEWER (PORTFOLIO)
--------------------------------*/
const modal = document.getElementById("media-modal");
const modalImg = document.getElementById("modal-image");
const modalClose = document.getElementById("modal-close");
const modalBackdrop = document.querySelector(".backdrop");

document.querySelectorAll(".media-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    modalImg.src = btn.dataset.src;
    modal.classList.add("show");
  });
});

function closeModal() {
  modal.classList.remove("show");
  modalImg.src = "";
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);


/* -------------------------------
   TILT HOVER EFFECT
--------------------------------*/
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `
      rotateX(${-y * 10}deg)
      rotateY(${x * 10}deg)
      translateZ(10px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) translateZ(0)";
  });
});


/* -------------------------------
   SMOOTH LOAD ANIMATION
--------------------------------*/
window.onload = () => {
  document.body.classList.add("loaded");
};
