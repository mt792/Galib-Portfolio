/* Galib Portfolio • Mobile Menu • Theme Toggle • Fade-in • Tilt */

// Mobile menu
const menuBtn = document.getElementById("menu");
const navList = document.getElementById("nav-list");
menuBtn.addEventListener("click", () => navList.classList.toggle("show"));

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries)=>entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("visible"); } }),
  { threshold: 0.2 }
);
document.querySelectorAll(".fade-in").forEach(el=>observer.observe(el));

// Tilt effect
document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("mousemove",(e)=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateX(${-y*8}deg) rotateY(${x*8}deg)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="rotateX(0) rotateY(0)");
});

// Theme toggle with memory
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
if(localStorage.getItem("theme")==="dark"){ body.classList.remove("light"); body.classList.add("dark"); themeToggle.textContent="☀️"; }
themeToggle.addEventListener("click", ()=>{
  body.classList.toggle("dark");
  body.classList.toggle("light");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
