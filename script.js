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
  subtitle.remove();
  noBtn.remove();

  // Update result message based on noClicked state
  const finalMsg = document.querySelector(".final-message");
  if (noClicked === 0) {
    finalMsg.innerHTML = "¡Awwwwww lo hiciste de una veeez, gashas baby :3!<br>En caso de que no los hayas visto ya, aún hay varios \"No\"";
  } else if (noClicked >= 1 && noClicked <= 7) {
    finalMsg.innerHTML = `¡Nice, aun faltan ${8 - noClicked} cambios en el boton de "No" ! <br>Pero gracias por decir que sí :3. 💕`;
  } else if (noClicked >= 8) {
    finalMsg.innerHTML = "¡Dijiste que no muchas veces, demasiadas veceeees!<br>Pero al final dijiste que sí… y eso es lo que importa mi amor de mi alma, preciosa!. 💖";
  }

  result.classList.remove("hidden");
  launchHearts();
});

// Messages for each "No" click
const noMessages = [
  ":0, baby...",
  "Waos, dos veces no, pareciera que no me amaras :,c",
  "Arremangala arrempujala si, arremangala arrempujala NO MÁS NOOOOS :(",
  "Asi que quieres jugar baby? ",
  "Ay amoooooooor, divinooooo..... pronto tienes que deciiiiiiiiiiiiiiir, que Yeeeees",
  "¿Y si te compro helado?",
  "Ahora cambiaste el fondo de color, no te basta con mi doloooor!!!!",
  "Acabo de temblar y eso deveria indicarte que ya es hora de decir que sí :3",
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
      document.body.style.background = "linear-gradient(135deg, #d98d90, #c16aa2)";
      break;

    case 8:
      // Last straw, remove the No button and shake the card violently
      noBtn.remove();
      document.querySelector(".card").classList.add("shake");
      setTimeout(() => document.querySelector(".card").classList.remove("shake"), 800);
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
const heartEmojis = ["❤️", "💖", "💕", "💗", "💘", "💝", "🩷", "✨", "🥰", "😍"];

function launchHearts() {
  // Confetti burst from center
  launchConfetti();
  // Multiple waves of floating hearts
  for (let wave = 0; wave < 3; wave++) {
    setTimeout(() => spawnWave(18 + wave * 5), wave * 800);
  }
}

function spawnWave(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => spawnParticle(), i * 60);
  }
}

function spawnParticle() {
  const el = document.createElement("div");
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const size = 1 + Math.random() * 2;
  const startX = Math.random() * 100;
  const drift = (Math.random() - 0.5) * 200;
  const duration = 2.5 + Math.random() * 2.5;
  const delay = Math.random() * 0.3;
  const spin = (Math.random() - 0.5) * 720;

  Object.assign(el.style, {
    position: "fixed",
    left: startX + "vw",
    bottom: "-30px",
    fontSize: size + "rem",
    pointerEvents: "none",
    zIndex: "10000",
    willChange: "transform, opacity",
    animation: `heartRise ${duration}s cubic-bezier(.2,.6,.3,1) ${delay}s forwards`,
  });
  el.style.setProperty("--drift", drift + "px");
  el.style.setProperty("--spin", spin + "deg");

  document.body.appendChild(el);
  setTimeout(() => el.remove(), (duration + delay) * 1000 + 100);
}

function launchConfetti() {
  const colors = ["#e94b6a", "#f7c6d9", "#e6d8f5", "#ff6b9d", "#ffd700", "#ff85a2", "#ff4081"];
  for (let i = 0; i < 50; i++) {
    const conf = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const velocity = 200 + Math.random() * 350;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;
    const size = 5 + Math.random() * 8;
    const duration = 1.5 + Math.random() * 1.5;

    Object.assign(conf.style, {
      position: "fixed",
      left: "50vw",
      top: "50vh",
      width: size + "px",
      height: size * (0.4 + Math.random() * 0.6) + "px",
      backgroundColor: color,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      pointerEvents: "none",
      zIndex: "10001",
      animation: `confettiBurst ${duration}s cubic-bezier(.15,.6,.35,1) forwards`,
    });
    conf.style.setProperty("--dx", dx + "px");
    conf.style.setProperty("--dy", dy + "px");
    conf.style.setProperty("--rot", (Math.random() * 1080 - 540) + "deg");

    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), duration * 1000 + 100);
  }
}

// Keyframes dinámicos
const style = document.createElement("style");
style.innerHTML = `
@keyframes heartRise {
  0% {
    opacity: 1;
    transform: translateY(0) translateX(0) rotate(0deg) scale(0.3);
  }
  15% {
    opacity: 1;
    transform: translateY(-10vh) translateX(calc(var(--drift) * 0.15)) rotate(calc(var(--spin) * 0.1)) scale(1.1);
  }
  50% {
    opacity: 0.9;
    transform: translateY(-50vh) translateX(calc(var(--drift) * 0.6)) rotate(calc(var(--spin) * 0.5)) scale(0.9);
  }
  100% {
    opacity: 0;
    transform: translateY(-110vh) translateX(var(--drift)) rotate(var(--spin)) scale(0.5);
  }
}
@keyframes confettiBurst {
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  70% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(0.2);
  }
}`;
document.head.appendChild(style);
