/* ==========================================================
   SCRIPT FOR GALIB PORTFOLIO WEBSITE
   Mobile Menu • Theme Toggle • Scroll Animations • Tilt Effect
   ========================================================== */


/* ---------- MOBILE MENU ---------- */
const menuBtn = document.getElementById("menu");
const navList = document.getElementById("nav-list");

menuBtn.addEventListener("click", () => {
  navList.classList.toggle("show");
});


/* ---------- SCROLL FADE-IN ANIMATION ---------- */
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach(el => observer.observe(el));


/* ---------- 3D TILT HOVER EFFECT ---------- */
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});


/* ---------- THEME TOGGLE (LIGHT / DARK) ---------- */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";  // sun icon
} else {
  themeToggle.textContent = "🌙";  // moon icon
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  const isDark = body.classList.contains("dark");

  themeToggle.textContent = isDark ? "☀️" : "🌙";

  // Save choice
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
