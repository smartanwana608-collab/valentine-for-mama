/* =========================
   ELEMENTS
========================= */
const music = document.getElementById("bgMusic");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");

const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

/* =========================
   CANVAS SETUP
========================= */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

/* =========================
   MUSIC (MOBILE FRIENDLY)
========================= */
let musicStarted = false;

document.body.addEventListener("click", () => {
  if (!musicStarted) {
    music.play().catch(() => {});
    musicStarted = true;
  }
});

/* =========================
   NO BUTTON DODGING
========================= */
function moveNoButton() {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 120);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

/* =========================
   YES BUTTON CLICK
========================= */
yesBtn.addEventListener("click", () => {
  message.classList.remove("hidden");
  explodeHearts();
  sendNotification();
});

/* =========================
   HEART EXPLOSION
========================= */
function explodeHearts() {
  for (let i = 0; i < 100; i++) {
    createHeart(
      canvas.width / 2,
      canvas.height / 2
    );
  }
}

function createHeart(x, y) {
  let size = Math.random() * 12 + 10;
  let dx = (Math.random() - 0.5) * 8;
  let dy = (Math.random() - 0.5) * 8;
  let opacity = 1;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    opacity -= 0.015;
    x += dx;
    y += dy;

    ctx.globalAlpha = opacity;
    ctx.font = `${size}px serif`;
    ctx.fillText("💖", x, y);

    if (opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      ctx.globalAlpha = 1;
    }
  }

  animate();
}

/* =========================
   NOTIFICATION (FORMPSREE)
========================= */
function sendNotification() {
  fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "She said YES 💖 – Valentine invitation accepted!"
    })
  }).catch(() => {});
}
