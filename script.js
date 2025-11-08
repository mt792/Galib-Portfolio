// Navigation Menu
const menu = document.getElementById('menu');
const navList = document.getElementById('nav-list');
menu.addEventListener('click', () => navList.classList.toggle('show'));

// Scroll Animations
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.2 }
);
document.querySelectorAll('.fade-in, .card, .about-grid, .skills-grid').forEach((el) => observer.observe(el));

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCap = document.getElementById('caption');
document.querySelectorAll('.zoomable').forEach((img) =>
  img.addEventListener('click', () => {
    lb.style.display = 'block';
    lbImg.src = img.src;
    lbCap.textContent = img.alt;
  })
);
document.querySelector('.close').onclick = () => (lb.style.display = 'none');
lb.onclick = (e) => e.target === lb && (lb.style.display = 'none');

// Tilt Effect
document.querySelectorAll('.tilt').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => (card.style.transform = 'rotateX(0) rotateY(0)'));
});

// 🌈 Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light');
  themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const theme = body.classList.contains('light') ? 'light' : 'dark';
  themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
});
