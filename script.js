/* MOBILE MENU */
const menuBtn = document.getElementById("menu");
const navList = document.getElementById("nav-list");
menuBtn.addEventListener("click", () => navList.classList.toggle("show"));

/* FADE-IN */
const observer = new IntersectionObserver(
  (entries)=>entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("visible"); }),
  { threshold: 0.2 }
);
document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

/* TILT EFFECT */
document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("mousemove",(e)=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width - 0.5;
    const y = (e.clientY-r.top)/r.height - 0.5;
    card.style.transform = `rotateX(${-y*8}deg) rotateY(${x*8}deg)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="rotateX(0) rotateY(0)");
});

/* THEME TOGGLE */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if(localStorage.getItem("theme")==="dark"){
  body.classList.add("dark"); body.classList.remove("light");
  themeToggle.textContent="☀️";
}

themeToggle.addEventListener("click",()=>{
  body.classList.toggle("dark");
  body.classList.toggle("light");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* POPUP IMAGE GALLERY */
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".project").forEach(item=>{
  item.addEventListener("click",()=>{
    modal.style.display = "flex";
    modalImg.src = item.dataset.img;
  });
});

closeBtn.addEventListener("click",()=>modal.style.display="none");
modal.addEventListener("click",(e)=>{ if(e.target === modal) modal.style.display="none"; });

/* ---------- POPUP MODAL ---------- */
.modal{
  display:none;
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.85);
  justify-content:center;
  align-items:center;
  z-index:2000;
  backdrop-filter:blur(6px);
}
.modal-content{
  max-width:90%;
  max-height:85%;
  border-radius:14px;
  box-shadow:0 0 40px rgba(0,0,0,.5);
  animation:zoomIn .4s ease;
}
@keyframes zoomIn{
  from{transform:scale(.6);opacity:0}
  to{transform:scale(1);opacity:1}
}
.close-btn{
  position:absolute;
  top:20px;
  right:30px;
  font-size:40px;
  color:white;
  cursor:pointer;
  font-weight:600;
  transition:.3s;
}
.close-btn:hover{
  color:var(--highlight);
}
