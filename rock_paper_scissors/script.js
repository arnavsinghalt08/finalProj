const playerScoreEL = document.getElementById('player-score');
const computerScoreEL = document.getElementById('computer-score');
const playerHandEL = document.getElementById('player-hand');
const computerHandEL = document.getElementById("computer-hand");
const playerHandImg = playerHandEL.querySelector('img');
const computerHandImg = computerHandEL.querySelector('img');
const resultText = document.querySelector('.result p');
const optionButtons = document.querySelectorAll('.choice-button');
const gameContainer = document.querySelector('.game-container');

let playerScore = 0;
let computerScore = 0;
const choices = ['rock', 'paper', 'scissors'];


optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.dataset.choice;
        playRound(playerChoice);
    });
});

function playRound(playerChoice) {
    togglebutton(true);

    resultText.textContent = 'Rock... Paper... Scissors...';
    playerHandImg.src = 'images/logo.png';
    computerHandImg.src = 'images/logo.png';

    playerHandEL.classList.add('shake');
    computerHandEL.classList.add('shake');

    setTimeout(() => {
        playerHandEL.classList.remove('shake');
        computerHandEL.classList.remove('shake');

        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        playerHandImg.src = `images/${playerChoice}.png`;
        computerHandImg.src = `images/${computerChoice}.png`;
        const winner = determineWinner(playerChoice, computerChoice);
        updateScoreboard(winner);
        togglebutton(false);
    }, 1600);
}

function determineWinner(player, computer) {
    if (player === computer) {
        return 'tie';
    }
    if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        return 'player';
    }
    return 'computer';
}


function updateScoreboard(winner) {
    gameContainer.classList.remove('player-wins-transform');

    if (winner === 'player') {
        playerScore++;
        resultText.textContent = 'You Win!';
        playerScoreEL.textContent = playerScore;

        playerScoreEL.classList.add('score-update');
        gameContainer.classList.add('player-wins-transform');
    }
    else if (winner === 'computer') {
        computerScore++;
        resultText.textContent = 'Computer Wins!';
        computerScoreEL.textContent = computerScore;
        computerScoreEL.classList.add('score-update');
    }
        else {
            resultText.textContent = "It's a tie!";
        }
}

setTimeout(() => {
    playerScoreEL.classList.remove('score-update');
    computerScoreEL.classList.remove('score-update');
}, 500);
setTimeout(() => {
    gameContainer.classList.remove('player-wins-transform');
}, 600);
function togglebutton(disable) {
    optionButtons.forEach(button => {
        button.disabled = disable;
    });
}