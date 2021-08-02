# Twitch Scenes - Gamified

> An Eleventy-based Twitch scenes starter with a chat-controlled game! Includes ComfyJS with command responses, and 6 scenes including guest support.

**Scenes are optimal at `1280x720`**, and are included for:

- Preshow, postshow, and break messages
- Main scene with large capture area and host webcam capture
- Main scene also accomdates a guest if details added
- Game scene for a dedicated backdrop with brief instructions
- _Bonus feature:_ Use [OBS Interact mode](https://www.youtube.com/watch?v=QRDT3UFdjE4) to be able to click a chat message and highlight it within any scene!

All scenes include the stream "header" details, which also features embedded chat.

**[Check out the scene previews below](#scene-previews)** ⬇️

## Initial Stream Setup

Customize the stream meta data including allowed chat commands within `/src/_data/stream.js`.

**Run `npm start` to launch the scenes** at `http://localhost:8090/` (or customize the port within the package `watch:eleventy` script).

### Adding Captions

Captions can be added when using [OBS](https://obsproject.com/download) (not Streamlabs) and the [OBS Captions Plugin](https://github.com/ratwithacompiler/OBS-captions-plugin).

## Theme the Starter

CSS custom properties are available to quickly re-theme the scenes and are located in `src/sass/_theme.scss`.

For super quick results, provide a new color hue value for the `--color-primary-hue` property (based on the HSL color model). The other variables will then update to be based off that color.

## Customize Scenes

You can modify scene styles within `src/sass/_scenes.scss`. When a new scene file is added, a class is created on the `main` scene area in the format of `scene-[fileslug]` so that you can scope styles.

CSS grid layout is used to easily position the main scene elements.

**Modify the display capture area** within this file for the `.display-capture` rule. The default will create an area with an aspect ratio of 16:9.

## Chat Command and Subscriber Action Reponses

Scripts and styles are included to handle showing chat, and responding to chat commands and subscriber actions. These are received with the help of [ComfyJS](https://github.com/instafluff/ComfyJS).

You must provide your `twitchUsername` within `/src/_data/stream.js` and at least one `chatCommand` for this to work.

_Optional:_ Also create a `.env` file with a `OAUTH` value matching what's described [in the ComfyJS docs](https://github.com/instafluff/ComfyJS#sending-chat-messages) in order to be able to send a chat message back.

> 🚨 **Important:** If you choose to add your oauth, _DO NOT_ host your scenes publically as the value will be exposed in plain text due to how the script gains access to that value.

To modify behavior:

- edit `_includes/scripts/comfy.js` to alter the ComfyJS scripts
- edit `sass/_commands.scss` to modify the appearance of command words

Command words are given a bold, large, outlined style, and will be positioned randomly across the `main` area of the screen. They will come in with a zoom transition and then zoom back out of view after one second.

If you keep the provided style, it's best to keep command words under 5 characters for the best effect.

> Catch the last scene preview to see how the scene would look if chat mobbed the available commands

### Test Chat Commands

Visit `https://www.twitch.tv/popout/[TWITCH USERNAME]/chat?popout=` and enter your chat command - example: `!dev` - to test the display.

### Edit Chat Commands

If you want to enable chat commands, add those within the `src/_data/stream.js`. Each command will be automatically listed in the frame `header`.

> Fun tip: you can edit these during your stream to add/remove commands live! Perhaps an incentive for chat participation.

### Subscriber Action Response Gifs

Responses are included for the following ComfyJS subscriber actions:

- `onSub`
- `onSubGift`
- `onResub`

A response is an "alert" that includes the user name and short message as well as a corresonding gif reaction. Messages and gifs can be configured within `_includes/scripts/effects.js`.

## Game Setup and Play

The included chat-controlled game allows chatters to include the world "fly" somewhere in their message (fly, flyer, flying, FLY, etc.) to keep a hot air balloon afloat. As a reward for floating the hot air balloon clear to the top of the page, confetti will drift down. Game play will not exceed 3 minutes.

Once game play has started, subscribers can use your subscription tier emotes to boost the balloon to a higher degree than regular chat. **This requires configuration** to list your own custom emotes within the array found in `_includes/scripts/effects.js`.

A dedicated scene is included, but the flyer will work across all scenes.

To modify the game, find the following:

- `img/flyer.png` - change the flyer image
- `sass/_flyer.scss` - contains only the CSS animation, explained next
- `_includes/scripts/flyer.js` - the critical functions to repond to chat initiation and trigger the flyer movement
- `_includes/scripts/effects.js` - includes the functions to modify flyer behavior for sub emotes (`triggerFlyer()`), and to trigger the `confetti()`

### How the Game Works

The flyer scripts randomly select a value to increment a CSS custom property that connects to the `translateY()` position of the flyer. Meanwhile, a CSS animation on the flyer continually drags it down, simulating gravity.

When the `y` position relative to the viewport is `<= 0` the confetti fires. When the `y` position is larger than the viewport height, the flyer position resets.

Upon natural animation end, the game will reset.

**As the broadcaster** you may also reset the game at any time with the command `!replay`.

## OBS Setup

To make the capture areas transparent, add the scene as a Browser Source, then open the Filters panel. Select "Color Key" and the default settings for "Green" should successfullly make the lime green capture area transparent. You can then add display and video sources _under_ the browser source layer to be masked.

## Scene Previews

**/game/**
![a hot air balloon floats over a grassy landscape with a calm blue sky](/scene-previews/flyer-game.png)

**/** (Main)
![](/scene-previews/main.png)

**/display/**
![](/scene-previews/display.png)

**/preshow/**
![](/scene-previews/preshow.png)

**/postshow/**
![](/scene-previews/postshow.png)

**/break/**
![](/scene-previews/break.png)

**higlight chat feature**
![](/scene-previews/highlight-chat.png)

**Command mob preview**
![](/scene-previews/commands.png)
