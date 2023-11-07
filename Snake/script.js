const playBoard = document.querySelector('.play-board');
const htmlMarkup = document.querySelector('.food');
const htmlScore = document.querySelector('.score');
const controls = document.querySelectorAll('.controls i');


let foodX;
let foodY;
let snakeX = 5;
let snakeY = 10;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score = 0


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
};

const handleGame = () => {
    clearInterval(setIntervalId)
    alert('Game Over')
    location.reload()
};  

const changeDirection = (e) => {
    if (e.key === 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } 
    initGame()
};

controls.forEach(key => {
    key.addEventListener('click', () => changeDirection({ key: key.dataset.key }))
});

const initGame = () => {
    if (gameOver) return handleGame();
    let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition()
        snakeBody.push(foodX, foodY)
        score++;

        htmlScore.innerHTML = `Score ${score}`;
    }
   

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY]

    snakeX += velocityX;
    snakeY += velocityY;

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="snake" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true
        }
    }

    playBoard.innerHTML = htmlMarkup
};

changeFoodPosition()
setIntervalId = setInterval(initGame, 125);

document.addEventListener('keydown', changeDirection)

