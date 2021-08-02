// Config
const alertQueue = new Queue();
const DISPLAY_DURATION = 5 * 1000;
const alertData = {
  sub: {
    message: "you're a real pal!",
    gif: "https://media.giphy.com/media/3ndAvMC5LFPNMCzq7m/giphy.gif",
  },
  subgift: {
    message: "just added to the gang!",
    gif: "https://media.giphy.com/media/9J1xDN2fwjKqwKnYN7/giphy.gif",
  },
  resub: {
    message: "is now extra snazzy!",
    gif: "https://media.giphy.com/media/fVtcfEXWQJQUbsF1sH/giphy.gif",
  },
};
const subEmotes = ["yourEmoteOne", "yourEmoteTwo"];

// DOM
const confettiContainer = document.querySelector(".confetti");

const createAlert = (type, user) => {
  alertQueue.add(async () => {
    alerts.innerHTML = `
      <h2>${user + " " + alertData[type].message}</h2>
      <img src="${alertData[type].gif}" />
    `;

    alerts.classList.add("active");

    await wait(DISPLAY_DURATION);

    if (!alertQueue.isLooping) {
      alerts.classList.remove("active");
      alerts.innerHTML = "";
    }
  });
};

const randomize = (min, max, round = false) => {
  const randomPick = Math.random() * (max - min) + min;

  return round ? Math.round(randomPick) : randomPick;
};

const confetti = () => {
  // Inspired by https://codepen.io/z-/pen/bpxgWZ
  var confetticount = 220;
  for (var i = 0; i <= confetticount; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");
    particle.classList.add(`c${randomize(1, 3, true)}`);
    particle.style.left = `${randomize(0, 100)}%`;
    particle.style.width = `${randomize(12, 14, true)}px`;
    particle.style.height = `${randomize(7, 9, true)}px`;
    particle.style.animationDelay = `${randomize(0, 3)}s`;
    confettiContainer.appendChild(particle);
  }
};

const triggerFlyer = (msgEmotes) => {
  if (
    msgEmotes.length &&
    msgEmotes.filter((e) => subEmotes.includes(e)).length
  ) {
    moveFlyer(true);
  }
};

const clearQuestion = () => {
  highlightChat.innerHTML = "";
};

const highlightQuestion = (question) => {
  const newQuestion = question.cloneNode(true);

  highlightChat.innerHTML = "";
  highlightChat.appendChild(newQuestion);

  highlightChat.addEventListener("click", clearQuestion, { once: true });

  setTimeout(() => {
    highlightChat.innerHTML = "";
  }, 15000);
};

document.addEventListener("click", (el) => {
  if (el.target.closest("#chatter") !== null) {
    highlightQuestion(el.target.parentNode);
  }
});
