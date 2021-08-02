/* @link https://github.com/BenDMyers/eleventy-plugin-twitch-chat/blob/main/src/scripts/handleChat.js */
const htmlEntities = (html) => {
  function it() {
    return html.map(function (n) {
      if (n.length == 1) {
        return n.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
          return "&#" + i.charCodeAt(0) + ";";
        });
      }
      return n;
    });
  }
  var isArray = Array.isArray(html);
  if (!isArray) {
    html = html.split("");
  }
  html = it(html);
  if (!isArray) html = html.join("");
  return html;
};

const emoteList = (text, emotes = {}) => {
  const emoteList = [];
  for (let emoteId in emotes) {
    let e = emotes[emoteId];
    for (let j in e) {
      let mote = e[j];
      if (typeof mote == "string") {
        mote = mote.split("-");
        mote = [parseInt(mote[0]), parseInt(mote[1])];
        let length = mote[1] - mote[0];
        let emoteName = text.substr(mote[0], length + 1);
        emoteList.push(emoteName);
      }
    }
  }
  return emoteList;
};

const formatEmotes = (text, emotes = {}) => {
  let splitText = text.split("");
  for (let emoteId in emotes) {
    let e = emotes[emoteId];
    for (let j in e) {
      let mote = e[j];
      if (typeof mote == "string") {
        mote = mote.split("-");
        mote = [parseInt(mote[0]), parseInt(mote[1])];
        let length = mote[1] - mote[0];
        let empty = Array.apply(null, new Array(length + 1)).map(function () {
          return "";
        });
        let emoteName = text.substr(mote[0], length + 1);
        splitText = splitText
          .slice(0, mote[0])
          .concat(empty)
          .concat(splitText.slice(mote[1] + 1, splitText.length));
        splitText.splice(
          mote[0],
          1,
          `<img alt="${emoteName}" data-twitch-emote="${emoteName}" src="http://static-cdn.jtvnw.net/emoticons/v1/${emoteId}/3.0">`
        );
      }
    }
  }
  return htmlEntities(splitText).join("");
};
