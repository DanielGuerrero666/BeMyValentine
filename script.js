const subtitle = document.getElementById("subtitle");
subtitle.textContent =
  "Hola mi amooooor, lo pusé en inglés porque suena más bonito jajjajjaja";

// Elementos
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const result = document.getElementById("result");
const buttons = document.querySelector(".buttons");

// Estado
let noClicked = 0;

// Sí
yesBtn.addEventListener("click", () => {
  buttons.style.display = "none";

  // Update result message based on noClicked state
  const finalMsg = document.querySelector(".final-message");
  if (noClicked === 0) {
    finalMsg.innerHTML = "¡Eso fue rápido! 😍<br>Recarga la página y mira todos los \"No\" que te perdiste 👀";
  } else if (noClicked >= 1 && noClicked <= 8) {
    finalMsg.innerHTML = `¡Aún quedaban ${10 - noClicked} "No" más por ver! 😜<br>Pero gracias por decir que sí. 💕`;
  } else if (noClicked >= 9) {
    finalMsg.innerHTML = "¡Eso tardó demasiado! 😤<br>Pero al final dijiste que sí… y eso es lo que importa. 💖";
  }

  result.classList.remove("hidden");
  launchHearts();
});

// Messages for each "No" click
const noMessages = [
  "¿Estás segura? 🥺",
  "¿De verdad de verdad? 😢",
  "Piénsalo otra vez… 💔",
  "¡No me hagas esto! 😭",
  "Te lo pido por favor 🙏",
  "¿Y si te digo que te quiero mucho? 💕",
  "Mi corazón se rompe… 💔💔",
  "Última oportunidad… ¿no? 🥹",
  "Ok ya ni modo… jk PIÉNSALO 😤",
  "Ya no hay botón de No 😏",
];

// No
noBtn.addEventListener("click", () => {
  noClicked += 1;

  // Update subtitle message
  const msgIndex = Math.min(noClicked - 1, noMessages.length - 1);
  subtitle.textContent = noMessages[msgIndex];

  // Yes button grows with each click
  const yesScale = 1 + noClicked * 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;

  // No button shrinks with each click
  const noScale = Math.max(1 - noClicked * 0.08, 0.3);
  noBtn.style.transform = `scale(${noScale})`;
  noBtn.style.opacity = Math.max(1 - noClicked * 0.08, 0.3);

  // Different behaviors based on noClicked count
  switch (noClicked) {
    case 1:
      // Gentle nudge — just dim a little
      noBtn.classList.add("dimmed");
      break;

    case 2:
      // Move No button to a random spot inside the card
      moveNoButton();
      break;

    case 3:
      // Move again + shake the card
      moveNoButton();
      document.querySelector(".card").classList.add("shake");
      setTimeout(() => document.querySelector(".card").classList.remove("shake"), 500);
      break;

    case 4:
      // Flip the No button upside down + move
      noBtn.style.transform += " rotate(180deg)";
      moveNoButton();
      break;

    case 5:
      // No button runs away to a corner
      moveNoButton();
      noBtn.textContent = "...";
      break;

    case 6:
      // Button teleports again, text changes
      moveNoButton();
      noBtn.textContent = "Bueno...";
      break;

    case 7:
      // Move + card background changes
      moveNoButton();
      document.body.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
      break;

    case 8:
      // Move + more shaking
      moveNoButton();
      document.querySelector(".card").classList.add("shake");
      setTimeout(() => document.querySelector(".card").classList.remove("shake"), 800);
      noBtn.textContent = "😢";
      break;

    default:
      // After 9+ clicks, just auto-click Yes
      yesBtn.click();
      break;
  }
});

// Move the No button to a random position on the full page
function moveNoButton() {
  // Move button to body so it can roam freely
  if (noBtn.parentElement !== document.body) {
    document.body.appendChild(noBtn);
  }

  noBtn.style.position = "fixed";
  noBtn.style.zIndex = "9999";

  const btnWidth = noBtn.offsetWidth || 80;
  const btnHeight = noBtn.offsetHeight || 40;

  const maxX = window.innerWidth - btnWidth - 20;
  const maxY = window.innerHeight - btnHeight - 20;

  noBtn.style.left = Math.random() * Math.max(maxX, 50) + 10 + "px";
  noBtn.style.top = Math.random() * Math.max(maxY, 50) + 10 + "px";
}

// Animación de corazones
function launchHearts() {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");
    heart.textContent = "❤️✨🥰";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-20px";
    heart.style.fontSize = "1.5rem";
    heart.style.animation = "floatUp 2.5s ease-out forwards";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2500);
  }
}

// Keyframes dinámicos
const style = document.createElement("style");
style.innerHTML = `
@keyframes floatUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100vh);
  }
}`;
document.head.appendChild(style);
