document.addEventListener("DOMContentLoaded", function () {
    const bird = document.getElementById("bird");
    const gameContainer = document.getElementById("game-container");
    let pipes = [];
    let gravity = 1;
    let velocity = 0;
    let lift = -15;
    let isGameOver = false;
    let score = 0;

    function jump() {
        if (!isGameOver) {
            velocity = lift; 
        }
    }

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            jump();
        }
    });

    function generatePipe() {
        const pipe = document.createElement("div");
        pipe.className = "pipe";
        gameContainer.appendChild(pipe);
        pipes.push(pipe);
        pipe.style.left = gameContainer.offsetWidth + "px";
        pipe.style.height = Math.floor(Math.random() * 300) + 50 + "px";
    }

    function movePipes() {
        for (let i = 0; i < pipes.length; i++) {
            pipes[i].style.left = pipes[i].offsetLeft - 3 + "px";

            if (pipes[i].offsetLeft + pipes[i].offsetWidth < 0) {
                pipes[i].remove();
                pipes.splice(i, 1);
                i--;
                score++;
            }
        }
    }

    function checkCollision() {
        const birdTop = bird.offsetTop;
        const birdBottom = birdTop + bird.offsetHeight;
    
        if (birdTop < 0) {
            gameOver();
        }
    
        if (birdBottom > gameContainer.offsetHeight) {
            gameOver();
        }
    
        for (let i = 0; i < pipes.length; i++) {
            const birdLeft = bird.offsetLeft;
            const birdRight = birdLeft + bird.offsetWidth;
    
            const pipeTop = pipes[i].offsetTop;
            const pipeBottom = pipeTop + pipes[i].offsetHeight;
            const pipeLeft = pipes[i].offsetLeft;
            const pipeRight = pipeLeft + pipes[i].offsetWidth;
    
            if (birdBottom > pipeTop && birdTop < pipeBottom && birdRight > pipeLeft && birdLeft < pipeRight) {
                gameOver();
            }
        }
    }
    
    function gameOver() {
        isGameOver = true;
        alert("Game Over! Score: " + score);
        location.reload();
    }

    function updateScore() {
        document.getElementById("score").innerText = "Score: " + score;
    }

    function gameLoop() {
        velocity += gravity;
        bird.style.top = bird.offsetTop + velocity + "px";

        movePipes();
        checkCollision();
        updateScore();

        if (!isGameOver) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initializeGame() {
        startScreen.style.display = "none";
        gameLoop(); 
    }

    const startScreen = document.getElementById("start-screen");
    const startButton = document.getElementById("start-button");

    startButton.addEventListener("click", initializeGame);

    setInterval(generatePipe, 2000);
});
