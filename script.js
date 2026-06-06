const score = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
const statusText = document.getElementById("status");

let snake = [ { x: 10, y: 10} ];

let food = {
    x: 5, y: 5 
};

let direction = "right";
let gameStarted = false;
let gameOver = false;
let currentScore = 0;
let gameLoop;

function createFood() {

    food = { x: Math.floor(Math.random() * 20) + 1,
             y: Math.floor(Math.random() * 20) + 1
    };
}

function drawGame() {

    gameBoard.innerHTML = "";

    snake.forEach(part => {
        const snakePart = document.createElement("div");
        snakePart.classList.add("snake");

        snakePart.style.gridColumnStart = part.x;
        snakePart.style.gridRowStart = part.y;
        gameBoard.appendChild(snakePart);
    });

    const foodElement = document.createElement("div");
    foodElement.classList.add("food");

    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;

    gameBoard.appendChild(foodElement);
}

function checkCollision(head) {

    if(head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
        return true;
    }

    for(let i = 1; i < snake.length; i++) {

        if(head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;

}

function endGame() {

    gameOver = true;
    clearInterval(gameLoop);
    statusText.textContent = "Game Over";
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

    if(checkCollision(head) ) {

        endGame();
        return;
    }

    snake.unshift(head);
    
    if(head.x === food.x && head.y === food.y) {

        currentScore++;
        score.textContent = currentScore;
        createFood();
    }

    else{
        snake.pop();
    }

    drawGame();
}

function startGame() {

    drawGame();

   gameLoop =  setInterval(() => {
    
    moveSnake();
    }, 200);

}

function restartGame() {

    clearInterval(gameLoop);

    snake = [ { x: 10, y:10 }];
    food = [ {x: 5, y:5} ];

    direction = "right";
    gameStarted = false;
    gameOver = false;
    currentScore = 0;

    score.textContent = 0;
    statusText.textContent = "";

    drawGame();
    startBtn.textContent = "Start Game";

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

restartBtn.addEventListener("click", () => {
    restartGame();
});