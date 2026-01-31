const cursor = document.querySelector(".heart-cursor");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

/* ===============================
   CURSOR FOLLOW (SMOOTH)
================================ */
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // heart trail
  const trail = document.createElement("div");
  trail.className = "heart-trail";
  trail.innerText = "💗";
  trail.style.left = mouseX + "px";
  trail.style.top = mouseY + "px";
  document.body.appendChild(trail);

  setTimeout(() => trail.remove(), 900);
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.18;
  cursorY += (mouseY - cursorY) * 0.18;

  cursor.style.transform =
    `translate(${cursorX - 11}px, ${cursorY - 11}px) rotate(45deg)`;

  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ===============================
   CLICK HEART BURST
================================ */
document.addEventListener("click", (e) => {
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.className = "heart-burst";
    heart.innerText = "💗";
    heart.style.left = e.clientX + (Math.random() * 40 - 20) + "px";
    heart.style.top = e.clientY + (Math.random() * 40 - 20) + "px";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1200);
  }

  cursor.style.transform += " scale(1.3)";
  setTimeout(() => {
    cursor.style.transform =
      `translate(${cursorX - 11}px, ${cursorY - 11}px) rotate(45deg)`;
  }, 150);
});
/* ===============================
   FLOATING LILY PETALS
================================ */
const petalsContainer = document.querySelector(".petals-container");

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  const size = Math.random() * 12 + 10; // 10–22px
  petal.style.width = size + "px";
  petal.style.height = size + "px";

  petal.style.left = Math.random() * 100 + "vw";

  const duration = Math.random() * 8 + 10; // 10–18s
  petal.style.animationDuration = duration + "s";

  petal.style.animationDelay = Math.random() * 5 + "s";

  petalsContainer.appendChild(petal);

  // remove after animation
  setTimeout(() => {
    petal.remove();
  }, duration * 1000);
}

// generate continuously
setInterval(createPetal, 600);
