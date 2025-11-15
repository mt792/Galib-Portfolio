/* =======================================================
   MOBILE MENU
======================================================= */
const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("show");
});


/* =======================================================
   THEME TOGGLE
======================================================= */
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


/* =======================================================
   SCROLL REVEAL
======================================================= */
const revealElements = document.querySelectorAll(".fade-in, .slide-up");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    if (el.getBoundingClientRect().top < trigger) {
      el.classList.add("show");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* =======================================================
   TILT HOVER
======================================================= */
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `
      rotateX(${y * -10}deg)
      rotateY(${x * 10}deg)
      translateZ(12px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


/* =======================================================
   3D PARALLAX BACKGROUND
======================================================= */
const layers = document.querySelectorAll(".p-layer");

if (window.innerWidth > 768) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    layers.forEach((layer, index) => {
      const depth = (index + 1) * 10;
      layer.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
}


/* =======================================================
   PARALLAX PROFILE IMAGE
======================================================= */
const profile = document.querySelector(".parallax-profile");

if (profile && window.innerWidth > 768) {
  profile.addEventListener("mousemove", (e) => {
    const rect = profile.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    profile.style.transform = `
      rotateX(${y * -12}deg)
      rotateY(${x * 12}deg)
      scale(1.06)
    `;
  });

  profile.addEventListener("mouseleave", () => {
    profile.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
}


/* =======================================================
   MAGNETIC BUTTONS
======================================================= */
const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);

    const moveX = (x - rect.width / 2) / 10;
    const moveY = (y - rect.height / 2) / 10;

    btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});


/* =======================================================
   GALLERY DATA (IMAGES + CAPTIONS)
======================================================= */
const projectGalleries = {
  project1: [
    { src: "project1-1.jpg", caption: "Logo & Symbol Exploration" },
    { src: "project1-2.jpg", caption: "Color & Typography System" },
    { src: "project1-3.jpg", caption: "Final Brand Identity" }
  ],

  project2: [
    { src: "project2-1.jpg", caption: "Event Poster — Concept Sketches" },
    { src: "project2-2.jpg", caption: "Typography & Layout" },
    { src: "project2-3.jpg", caption: "Final Approved Poster" }
  ]
};


/* =======================================================
   MODAL & GALLERY ELEMENTS
======================================================= */
const modal = document.getElementById("media-modal");
const modalImg = document.getElementById("modal-image");
const thumbStrip = document.getElementById("thumb-strip");
const captionText = document.getElementById("image-caption");
const fullscreenBtn = document.getElementById("fullscreen-btn");

let currentGallery = [];
let currentIndex = 0;


/* =======================================================
   OPEN GALLERY
======================================================= */
document.querySelectorAll("[data-gallery]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const projectKey = btn.getAttribute("data-gallery");
    openGallery(projectKey);
  });
});

function openGallery(projectKey, startIndex = 0) {
  currentGallery = projectGalleries[projectKey];
  currentIndex = startIndex;

  updateGalleryDisplay();
  generateThumbnails();
  modal.classList.add("show");
}


/* =======================================================
   UPDATE IMAGE + CAPTION
======================================================= */
function updateGalleryDisplay() {
  modalImg.src = currentGallery[currentIndex].src;
  captionText.textContent = currentGallery[currentIndex].caption;
  highlightActiveThumbnail();
}


/* =======================================================
   NEXT / PREVIOUS
======================================================= */
function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateGalleryDisplay();
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateGalleryDisplay();
}

document.getElementById("gallery-next").addEventListener("click", nextImage);
document.getElementById("gallery-prev").addEventListener("click", prevImage);


/* =======================================================
   THUMBNAIL STRIP
======================================================= */
function generateThumbnails() {
  thumbStrip.innerHTML = "";

  currentGallery.forEach((item, index) => {
    const thumb = document.createElement("img");
    thumb.src = item.src;
    thumb.dataset.index = index;

    thumb.addEventListener("click", () => {
      currentIndex = index;
      updateGalleryDisplay();
    });

    thumbStrip.appendChild(thumb);
  });
}

function highlightActiveThumbnail() {
  [...thumbStrip.children].forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentIndex);
  });
}


/* =======================================================
   FULLSCREEN MODE
======================================================= */
fullscreenBtn.addEventListener("click", () => {
  modal.classList.toggle("fullscreen");
});


/* =======================================================
   CLOSE MODAL
======================================================= */
const modalClose = document.getElementById("modal-close");

function closeModal() {
  modal.classList.remove("show");
  modal.classList.remove("fullscreen");

  // Reset zoom
  scale = 1;
  modalImg.style.transform = "scale(1)";
}

modalClose.addEventListener("click", closeModal);
document.querySelector(".backdrop").addEventListener("click", closeModal);


/* =======================================================
   KEYBOARD NAVIGATION
======================================================= */
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("show")) return;

  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closeModal();
  if (e.key.toLowerCase() === "f") modal.classList.toggle("fullscreen");
});


/* =======================================================
   SWIPE GESTURES + PINCH + DRAG ZOOM
======================================================= */
const zoomContainer = document.getElementById("zoom-container");

let scale = 1;
let currentX = 0,
  currentY = 0;
let startX = 0,
  endX = 0;

let initialDistance = 0;
let initialScale = 1;
let lastTap = 0;

// Touch Start
zoomContainer.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    startX = e.touches[0].clientX;
  } else if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    initialDistance = Math.hypot(dx, dy);
    initialScale = scale;
  }
});

// Touch Move
zoomContainer.addEventListener("touchmove", (e) => {
  e.preventDefault();

  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const distance = Math.hypot(dx, dy);

    scale = Math.min(4, Math.max(1, initialScale * (distance / initialDistance)));
    modalImg.style.transform = `scale(${scale})`;
  }
});

// Touch End
zoomContainer.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;

  if (scale === 1) {
    if (endX - startX > 80) prevImage();
    if (startX - endX > 80) nextImage();
  }

  // Double tap zoom
  const now = Date.now();
  if (now - lastTap < 300) {
    scale = scale === 1 ? 2.3 : 1;
    modalImg.style.transform = `scale(${scale})`;
  }
  lastTap = now;
});


/* =======================================================
   DASHBOARD FILTER (projects.html)
======================================================= */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      card.style.display =
        filter === "all" || card.dataset.category === filter
          ? "block"
          : "none";
    });
  });
});
