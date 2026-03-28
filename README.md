# 🐍 Snake Game

A classic Snake Game built with vanilla HTML, CSS, and JavaScript.
---
---
> A dark-themed snake game where you control the snake using arrow keys, eat food to grow longer and increase your score.
>---
    
## 🚀 Features

- ✅ Classic snake movement with arrow key controls
- ✅ Food spawns randomly on the grid
- ✅ Score increases by 10 on every food eaten
- ✅ High score saved in browser (localStorage)
- ✅ Timer to track how long you play
- ✅ Game Over screen with restart option
- ✅ Smooth grid-based rendering
- ✅ Opposite direction lock (snake can't reverse into itself)
- ✅ Self collision detection
- ✅ Wall collision detection

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Game structure |
| CSS3 | Styling & layout |
| JavaScript (Vanilla) | Game logic |
| LocalStorage | High score persistence |

---

## 📁 Project Structure

```
Snake_game/
├── index.html      # Game layout and structure
├── style.css       # Dark theme styling
└── script.js       # Game logic
```

---

## 🎯 How to Play

1. Open `index.html` in your browser
2. Click **Start Game**
3. Use **Arrow Keys** to control the snake
   - ⬆️ Arrow Up — Move Up
   - ⬇️ Arrow Down — Move Down
   - ⬅️ Arrow Left — Move Left
   - ➡️ Arrow Right — Move Right
4. Eat the 🔴 red food to grow and score points
5. Avoid hitting the **walls** or **yourself**
6. Try to beat your **High Score!**

---

## 💻 Run Locally

```bash
git clone https://github.com/prachichauhan006/snake-game.git
cd snake-game/Snake_game
# open index.html in browser
```

---

## 🧠 Game Logic

- Snake is stored as an array of `{x, y}` block positions
- Every game tick, a new head is added in the current direction
- If food is eaten → snake grows (tail not removed)
- If no food → tail is removed (snake moves forward)
- Grid is built dynamically based on screen size

---

## 👩‍💻 Developer

Made by **Prachi Chauhan**  
GitHub: [@prachichauhan006](https://github.com/prachichauhan006)

---

## 📜 License

This project is open source and free to use.

---
Hope you Enjoy This Game....
---
