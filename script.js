// Navbar toggle
const menu = document.getElementById("menu");
const navList = document.getElementById("nav-list");
menu.addEventListener("click", () => navList.classList.toggle("show"));

// Fade-in effect
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
  { threshold: 0.2 }
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Lightbox
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbCap = document.getElementById("caption");
document.querySelectorAll(".zoomable").forEach((img) => {
  img.addEventListener("click", () => {
    lb.style.display = "block";
    lbImg.src = img.src;
    lbCap.textContent = img.alt;
  });
});
document.querySelector(".close").onclick = () => (lb.style.display = "none");
lb.onclick = (e) => e.target === lb && (lb.style.display = "none");

// Tilt
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener("mouseleave", () => (card.style.transform = "rotateX(0) rotateY(0)"));
});

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "🌙";
} else {
  themeToggle.textContent = "☀️";
}
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const theme = body.classList.contains("dark") ? "dark" : "light";
  themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
  localStorage.setItem("theme", theme);
});
