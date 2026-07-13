const messages = [
  "Hello Brotherr",
  "Es tu cumpleaños brilla pero no como los de crepusculo.",
  "Eres un Targaryen: fuerte, leal, valiente y nacido para ganar.",
  "PEDIRE DE DESEO QUE TE CASES CON UNA DE RAZA ARIA",
  "Gracias por ser un amigo tan real y especial.",
  "recuerda que eres un Rockstar forever."
];

const heroMessage = document.querySelector("#hero-message");
const button = document.querySelector("#message-button");
let messageIndex = 0;

button.addEventListener("click", () => {
  messageIndex = (messageIndex + 1) % messages.length;
  heroMessage.textContent = messages[messageIndex];
  createFireBurst();
});

function createFireBurst() {
  for (let i = 0; i < 18; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.textContent = i % 2 === 0 ? "🔥" : "⚡";
    spark.style.left = `${45 + Math.random() * 10}%`;
    spark.style.top = `${54 + Math.random() * 8}%`;
    spark.style.setProperty("--x", `${Math.random() * 220 - 110}px`);
    spark.style.setProperty("--y", `${Math.random() * -180 - 30}px`);
    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 900);
  }
}

const style = document.createElement("style");
style.textContent = `
  .spark {
    position: fixed;
    z-index: 20;
    pointer-events: none;
    font-size: 1.5rem;
    animation: burst 900ms ease-out forwards;
  }

  @keyframes burst {
    to {
      opacity: 0;
      transform: translate(var(--x), var(--y)) scale(0.2) rotate(90deg);
    }
  }
`;
document.head.appendChild(style);
