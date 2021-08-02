const flyerQueue = new Queue();
const flyer = document.querySelector(".flyer");
let gameInPlay = false;
const X = "--posX";
const Y = "--posY";
const MAX_FLOAT_Y = 7;
const MIN_FLOAT_Y = 4;

const resetGame = () => {
  flyer.classList.remove("inflight");
  flyer.style = "";
  gameInPlay = false;
};

const winningCalculation = () => {
  const flyerRect = flyer.getBoundingClientRect();
  const flyerYPos = flyerRect.y;

  if (flyerYPos <= 0) {
    // 🎉 Reached the top!
    confetti();
  }

  if (flyerYPos >= window.innerHeight) {
    // Sunk below the horizon
    resetGame();
  }
};

const positionFlyer = (boost) => {
  const posY = parseFloat(getComputedStyle(flyer).getPropertyValue(Y));
  const posX = parseFloat(getComputedStyle(flyer).getPropertyValue(X));

  const floatY = boost ? 10 : randomize(MIN_FLOAT_Y, MAX_FLOAT_Y);

  const adjustedY = posY > 1 ? posY * -1 : posY;

  flyer.style.setProperty(Y, `${adjustedY - floatY}vh`);
  flyer.style.setProperty(X, `${posX + 0.35}vw`);
  winningCalculation();
};

const moveFlyer = (boost) => {
  flyerQueue.add(async () => {
    positionFlyer(boost);

    await wait(100);

    if (!flyerQueue.isLooping) {
      // optional: do something when no items in queue
    }
  });
};

flyer.addEventListener("animationend", () => {
  // Ensure reset if animation duration runs out
  resetGame();
});
