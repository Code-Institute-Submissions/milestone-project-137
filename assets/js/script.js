// Array with lego figures
const figures = [
    "lego1.png",
    "lego1.png",
    "lego2.png",
    "lego2.png",
    "lego3.png",
    "lego3.png",
    "lego4.png",
    "lego4.png",
    "lego5.png",
    "lego5.png",
    "lego6.png",
    "lego6.png",
    "lego7.png",
    "lego7.png",
    "lego8.png",
    "lego8.png"
]

// ----------------------- Global variables
// Game level modal
const easyButton = document.getElementById("easy").addEventListener("click", function () { level("easy") });
const mediumButton = document.getElementById("medium").addEventListener("click", function () { level("medium") });
const hardButton = document.getElementById("hard").addEventListener("click", function () { level("hard") });

// Main menu section
const mainMenuSection = document.getElementById("main-menu-section");

// Game arena section
const gameArenaSection = document.getElementById("game-arena-section");
const boardArena = document.getElementById("board");
const pointsArena = document.querySelector("#points span:nth-child(2)");
const levelArena = document.querySelector("#level span:nth-child(2)");
const timeArena = document.querySelector("#time span:nth-child(2)");
const counterArena = document.querySelector("#counter span:nth-child(2)");

// Game win modal
const levelWinModal = document.getElementById("game-level");
const pointsWinModal = document.getElementById("points-scored");
const mistakesWinModal = document.getElementById("mistakes-penalties")
const timeBonusWinModal = document.getElementById("time-bonus");
const totalScore = document.querySelector("#total-score strong");
const playerNameInput = document.getElementById("playerName");
const save_button = document.getElementById("save-score");

// Times up modal
const timesUpModal = document.getElementById("times-up-modal");
const playAgainButton = document.getElementById("play-again").addEventListener('click', function () { playAgain() });


// ----------------------- JS variables
let turnCounter = 0;
let time = 20;
let addPoints = 0;
let subtractPoints = 0;
let gameLevel;
let pairs;
// ----------------------- Game start
function startGame() {
    gameArenaSection.style.display = "none";
}

window.onload = startGame;

// Create cards in game arena
function level(userChoice) {
    let cards = "";
    let cardNum = 15;
    if (userChoice === "easy") {
        gameLevel = "easy";
        cardNum = 7;
        levelArena.innerHTML = gameLevel
        pairs = 4;
    } else if (userChoice === "medium") {
        gameLevel = "medium";
        cardNum = 11;
        levelArena.innerHTML = gameLevel
        pairs = 6;
    } else if (userChoice === "hard") {
        gameLevel = "hard";
        levelArena.innerHTML = gameLevel
        pairs = 8;
    };
    for (i = 0; i <= cardNum; i++) {
        cards = `${cards}<div class="card" onclick="reverse(${i})" id="c${i}"></div>`
    };
    mainMenuSection.style.display = "none";
    gameArenaSection.style.display = "flex";
    boardArena.innerHTML = cards;
    counterArena.innerHTML = turnCounter;
    shuffle();
    timer();
    scoreSystem();
};

// Shuffle cards before game starts
function shuffle() {
    let cardNum = 14;
    if (gameLevel === "easy") {
        cardNum = 6;
    } else if (gameLevel === "medium") {
        cardNum = 10;
    };
    for (i = cardNum; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = figures[i];
        figures[i] = figures[j];
        figures[j] = temp;
    };
    return figures;
};

// Add figure on the other side of card
// Check if one or two cards reversed
// Check if two cards are the same
// Add lock to prevent reverse more than 2 cards before check
// Add scoring system that will add points for cards that match and subtract points for cards that not match
let oneVisible = false;
let firstCardNo;
let lock = false;
function reverse(no) {
    if (lock === false) {

        lock = true;

        let element = `c${no}`
        let picture = `url(assets/images/${figures[no]})`
        document.getElementById(element).style.background = picture
        document.getElementById(element).style.backgroundSize = "cover";
        document.getElementById(element).classList.add("cardA");
        document.getElementById(element).classList.remove("card");

        if (oneVisible === false) {
            oneVisible = true;
            firstCardNo = no;
            lock = false;
        } else {
            if (figures[firstCardNo] === figures[no]) {
                keep2Cards();
                addPoints++;
            } else {
                setTimeout(function () {
                    restore2Cards(firstCardNo, no);
                }, 750);
                subtractPoints++
            };
            turnCounter++;
            counterArena.innerHTML = turnCounter;
            oneVisible = false;
            scoreSystem();
        };
    };
};

// When 2 reversed cards match
function keep2Cards() {
    lock = false;
    pairs--;
};

// When 2 reversed cards do not match
function restore2Cards(firstCardNo, no) {
    let element1 = `c${firstCardNo}`;
    let element2 = `c${no}`;
    document.getElementById(element1).style.background = "rgb(67, 176, 42)";
    document.getElementById(element1).classList.add("card");
    document.getElementById(element1).classList.remove("cardA");
    document.getElementById(element2).style.background = "rgb(67, 176, 42)";
    document.getElementById(element2).classList.add("card");
    document.getElementById(element2).classList.remove("cardA");

    lock = false;
}

// Set game timer
function timer() {
    time--;
    timeArena.innerHTML = time
    if (time === 0) {
        $('#times-up-modal').modal('show');
        return;
    } else if (pairs === 0) {
        return;
    }
    setTimeout(timer, 1000);
};

// Score system
// Show game win modal when all pairs match
function scoreSystem() {
    pointsArena.innerHTML = 50 * addPoints - 20 * subtractPoints
    if (pairs === 0) {
        $('#game-win-modal').modal('show');
        levelWinModal.innerHTML = gameLevel
        pointsWinModal.innerHTML = 50 * addPoints;
        mistakesWinModal.innerHTML = -20 * subtractPoints;
        timeBonusWinModal.innerHTML = time;
        if (gameLevel === "medium") {
            timeBonusWinModal.innerHTML = `${time * 2} (added time bonus: x2)`
        } else if (gameLevel === "hard") {
            timeBonusWinModal.innerHTML = `${time * 3} (added time bonus: x3)`
        };
        totalScore.innerHTML = (50 * addPoints - 20 * subtractPoints) + parseInt(timeBonusWinModal.innerHTML);
    };
};

// Play again when times up
function playAgain() {
    turnCounter = 0;
    time = 20;
    addPoints = 0;
    subtractPoints = 0;
    if (gameLevel === "easy") {
        level("easy");
    } else if (gameLevel === "medium") {
        level("medium");
    } else if (gameLevel === "hard") {
        level("hard");
    };
};

// Save score to local storage
const printScores_tbody = document.getElementById("print-scores");
const getHighScores = JSON.parse(localStorage.getItem("highScores")) || [];

save_button.addEventListener("click", function () {
    const score = {
        name: playerNameInput.value,
        score: totalScore.innerHTML,
        level: gameLevel,
    };

    getHighScores.push(score);
    getHighScores.sort((a, b) => b.score - a.score);

    localStorage.setItem("highScores", JSON.stringify(getHighScores))
});

printScores_tbody.innerHTML = getHighScores
    .map(score => {
        return `<tr>
        <td>${score.name}</td>
        <td>${score.score}</td>
        <td>${score.level}</td>
        </tr>`;
    }).join("");
