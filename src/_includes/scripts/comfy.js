// DOM
const main = document.querySelector("main");
const alerts = document.querySelector(".alerts");
const highlightChat = document.querySelector(".highlight-chat");
const chatter = document.getElementById("chatter");
const msgTemplate = document.getElementById("chatMsg");

ComfyJS.onSub = (user) => {
  createAlert("sub", user);
};

ComfyJS.onSubGift = (gifterUser) => {
  createAlert("subgift", gifterUser);
};

ComfyJS.onResub = (user) => {
  createAlert("resub", user);
};

ComfyJS.onCommand = (_user, command, _message, flags, _extra) => {
  if (command === "commands") {
    ComfyJS.Say(
      `Chat commands: ${chatCommands.map((c) => `!${c}`).join(", ")}`
    );
  } else if (flags.broadcaster && command == "replay") {
    resetGame();
  } else if (chatCommands.includes(command)) {
    const originalNode = document.querySelector(`.command-${command}`);
    const commandNode = originalNode.cloneNode(true);
    main.appendChild(commandNode);
  }
};

ComfyJS.onChat = (user, message, flags, _self, extra) => {
  const newMsg = msgTemplate.content.cloneNode(true);
  const isBroadcaster = flags.broadcaster;
  const isSubscriber = flags.subscriber;
  const emotes = extra.messageEmotes;
  const msgEmotes = emoteList(message, emotes);

  // For testing gifs: createAlert("subgift", user);

  if (gameInPlay && msgEmotes.length) {
    triggerFlyer(msgEmotes);
  } else if (message.toLowerCase().includes("fly")) {
    flyer.classList.add("inflight");
    gameInPlay = true;
    moveFlyer();
  } else {
    newMsg.querySelector("strong").textContent = user;
    newMsg.querySelector("span").innerHTML = formatEmotes(message, emotes);

    if (isBroadcaster) {
      newMsg.querySelector("strong").classList.add("broadcaster");
    }

    if (isSubscriber) {
      newMsg.querySelector("strong").classList.add("subscriber");
    }

    chatter.appendChild(newMsg);
  }
};

ComfyJS.Init(twitchUsername, twitchOauth);
