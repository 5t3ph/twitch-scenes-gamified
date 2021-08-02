require("dotenv").config();

module.exports = {
  hostName: "Stephanie Eckles",
  hostTwitter: "5t3ph",
  twitchUsername: "5t3phDev",
  // Optional - see README
  twitchOauth: process.env.OAUTH || "",
  title: "Stream Title Here",
  chatCommands: ["dev", "yay"],
  guestName: "",
  guestTwitter: "",
};
