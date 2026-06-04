const score = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const gameBoard = document.getElementById("gameBoard");

let snake = [ { x: 10, y: 10} ];
let direction = "right";
let gameStarted = false;

function drawSnake() {

    gameBoard.innerHTML = "";

    snake.forEach(part => {
        const snakePart = document.createElement("div");

        snakePart.classList.add("snake");
        snakePart.style.gridColumnStart = part.x;
        snakePart.style.gridRowStart = part.y;
        gameBoard.appendChild(snakePart);
    });
}

function moveSnake() {

    const head = { ...snake[0] };

    if(direction === "right") {
        head.x++;
    }

    if(direction === "left") {
        head.x--;
    }

    if(direction === "up") {
        head.y--;
    }

    if(direction === "down") {
        head.y++;
    }

    snake.unshift(head);
    snake.pop();

    drawSnake();
}

function startGame() {

    drawSnake();

    setInterval(() => {
        moveSnake();
    }, 200);
}

document.addEventListener("keydown", event => {

    if(event.key === "ArrowUp") {
        direction = "up";
    }

    if(event.key === "ArrowDown") {
        direction = "down";
    }

    if(event.key === "ArrowLeft") {
        direction = "left";
    }

    if(event.key === "ArrowRight") {
        direction = "right";
    }
});

startBtn.addEventListener("click", () => {

    if(gameStarted) {
        return;
    }

    gameStarted = true;
    startBtn.textContent = "Game Running";

    startGame();
}); 