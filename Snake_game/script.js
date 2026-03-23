const board = document.querySelector('#board');
const startbutton = document.querySelector('.btn-start');
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#Score");
const timeElement = document.querySelector("#Time");

const blockSize = 30;

let highScore = Number(localStorage.getItem("highScore")) || 0;
let score = 0;
let time = `00-00`;

highScoreElement.innerText = highScore;

// Board ka actual size lo
const cols = Math.floor(board.clientWidth / blockSize);
const rows = Math.floor(board.clientHeight / blockSize);

// Grid dynamically set karo
board.style.display = "grid";
board.style.gridTemplateColumns = `repeat(${cols}, ${blockSize}px)`;
board.style.gridTemplateRows = `repeat(${rows}, ${blockSize}px)`;

let intervalId = null;
let timerIntervalId = null;

let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
const blocks = [];
let snake = [{ x: 1, y: 3 }];
let direction = 'down';
let nextDirection = 'down';

// Grid banana
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

function gameLoop() {
    direction = nextDirection;

    blocks[`${food.x}-${food.y}`].classList.add('food');

    let head = null;
    if (direction === "left")       head = { x: snake[0].x, y: snake[0].y - 1 };
    else if (direction === "right") head = { x: snake[0].x, y: snake[0].y + 1 };
    else if (direction === "down")  head = { x: snake[0].x + 1, y: snake[0].y };
    else if (direction === "up")    head = { x: snake[0].x - 1, y: snake[0].y };

    // Wall collision
    if (head.x < 0 || head.y < 0 || head.x >= rows || head.y >= cols) {
        endGame(); return;
    }

    // Self collision
    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        endGame(); return;
    }

    // Food khaya
    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove('food');
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
        snake.unshift(head);
        score += 10;
        scoreElement.innerText = score;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore.toString());
            highScoreElement.innerText = highScore;
        }
    } else {
        blocks[`${snake[snake.length - 1].x}-${snake[snake.length - 1].y}`].classList.remove('fill');
        snake.pop();
        snake.unshift(head);
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
    });

    blocks[`${food.x}-${food.y}`].classList.add('food');
}

function endGame() {
    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    intervalId = null;
    timerIntervalId = null;
    modal.style.display = "flex";
    startGameModal.style.display = 'none';
    gameOverModal.style.display = "flex";
}

function startTimer() {
    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split("-").map(Number);
        if (sec === 59) { min += 1; sec = 0; }
        else { sec += 1; }
        time = `${String(min).padStart(2, '0')}-${String(sec).padStart(2, '0')}`;
        timeElement.innerText = time;
    }, 1000);
}

startbutton.addEventListener("click", () => {
    if (intervalId) return;
    modal.style.display = "none";
    intervalId = setInterval(gameLoop, 300);
    startTimer();
});

restartButton.addEventListener("click", () => {
    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    intervalId = null;
    timerIntervalId = null;

    blocks[`${food.x}-${food.y}`].classList.remove('food');
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    });

    score = 0;
    time = `00-00`;
    direction = 'down';
    nextDirection = 'down';
    snake = [{ x: 1, y: 3 }];
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

    scoreElement.innerText = score;
    timeElement.innerText = time;
    highScoreElement.innerText = highScore;

    gameOverModal.style.display = "none";
    startGameModal.style.display = "flex";
    modal.style.display = "flex";
});

addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp"    && direction !== 'down')  nextDirection = 'up';
    else if (event.key === "ArrowRight" && direction !== 'left')  nextDirection = 'right';
    else if (event.key === "ArrowLeft"  && direction !== 'right') nextDirection = 'left';
    else if (event.key === "ArrowDown"  && direction !== 'up')    nextDirection = 'down';
});