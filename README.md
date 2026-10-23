# Escape the Evil AI — Project NEXUS

A browser-based text adventure game built with **HTML, CSS, and JavaScript**.
The player is trapped in a facility controlled by an evil AI named **NEXUS** and must
collect items, shut the AI down, and escape before being caught.

## How the game works

1. **Laboratory** — Search the desk to collect the **keycard**.
2. **Security Room** — Search the computer to discover the **server shutdown code**.
3. **Server Room** — Shut down NEXUS using the code.
4. **Exit Gate** — Attempt to escape the facility.

You need **both** the keycard and the shutdown code (with NEXUS offline) to escape
successfully. Otherwise, NEXUS catches you!

The game also includes an **unsuccessful ending** (several failure outcomes) and an
**option to replay** after each run.

## Language / Tech Stack

- **HTML5** — page structure (`index.html`)
- **CSS3** — styling (`style.css`)
- **JavaScript (ES6)** — game logic (`script.js`)

No build tools or external dependencies are required; everything runs in the browser.

## Functions used

| Function | Description |
|----------|-------------|
| `playGame()` | Runs one complete adventure. Manages game state (`hasKeycard`, `hasCode`, `nexusDown`, `currentRoom`, `gameOver`) and handles player choices per room. Returns `"cancelled"` if the player cancels, or `"ended"` when the game finishes. |
| `startGame()` | Displays the welcome/instruction alert, then loops `playGame()` to allow replay without recursive calls. Ends when the player declines to play again. |

## How to play

1. Open `index.html` in a modern browser (Chrome or Edge recommended).
2. Follow the prompts and enter the number of your chosen action.
3. Open the browser console (F12 / Ctrl + Shift + J) to view room changes, collected items, and endings.
4. Press **Cancel** in any prompt to end the game safely.

## Project structure

```
escape-the-evil-ai/
├── index.html   # Entry point
├── style.css    # Styles
├── script.js    # Game logic
└── README.md    # This file
```
