document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground-moving');
    const restartButton = document.querySelector('.restart-button');
    const gameOverModal = document.getElementById('gameOverModal');
    const finalScoreDisplay = document.getElementById('finalScore');
    const highestScoreDisplay = document.getElementById('highestScore');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 3;
    let isGameOver = false;
    let score = 0;
    let gap = 430;
    let gameTimerId;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }

    gameTimerId = setInterval(startGame, 20);

    function control(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
        playJumpSound();
    }

    function generateObstacle() {
        // Your existing obstacle generation logic here
    }

    function gameOver() {
        clearInterval(gameTimerId);
        console.log('Game over');
        isGameOver = true;
        document.removeEventListener('keyup', control);
        ground.classList.add('ground');
        ground.classList.remove('ground-moving');
        showGameOverModal();
        playGameOverSound();
        updateHighestScore();
    }

    function restartGame() {
        location.reload();
    }

    function showGameOverModal() {
        finalScoreDisplay.textContent = score;
        highestScoreDisplay.textContent = getHighestScore();
        gameOverModal.style.display = 'block';
    }

    function closeGameOverModal() {
        gameOverModal.style.display = 'none';
    }

    function updateScore() {
        score++;
        document.getElementById('score').textContent = score;
    }

    function saveHighestScore(score) {
        localStorage.setItem('highestScore', score);
    }

    function getHighestScore() {
        return localStorage.getItem('highestScore') || 0;
    }

    function updateHighestScore() {
        if (score > getHighestScore()) {
            saveHighestScore(score);
        }
    }

    document.addEventListener('keyup', control);
    restartButton.addEventListener('click', restartGame);

    // Call updateScore() whenever the bird passes an obstacle
});
