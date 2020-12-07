// Array with lego figures
const figures = ["lego1.png", "lego1.png", "lego2.png", "lego2.png", "lego3.png", "lego3.png", "lego4.png", "lego4.png", "lego5.png", "lego5.png", "lego6.png", "lego6.png", "lego7.png", "lego7.png", "lego8.png", "lego8.png"];
// ----------------------- Global variables
// Main menu section
const mainMenuSection = document.getElementById("main-menu-section");
const volumeMenu = document.getElementById("volume-up-menu");
// Game arena section
const quit = document.getElementById("exit");
const gameArenaSection = document.getElementById("game-arena-section");
const boardArena = document.getElementById("board");
const pointsArena = document.querySelector("#points span:nth-child(2)");
const levelArena = document.querySelector("#level span:nth-child(2)");
const timeArena = document.querySelector("#time span:nth-child(2)");
const counterArena = document.querySelector("#counter span:nth-child(2)");
const volumeArena = document.getElementById("volume-up-arena");
// Game level modal
const easyButton = document.getElementById("easy");
easyButton.addEventListener("click", function () {
    level("easy");
});
const mediumButton = document.getElementById("medium");
mediumButton.addEventListener("click", function () {
    level("medium");
});
const hardButton = document.getElementById("hard");
hardButton.addEventListener("click", function () {
    level("hard");
});
// Highscores modal
const highscoresButton = document.getElementById("highscores");
const clearButton = document.getElementById("clear");
const easyTable = document.getElementById("easy-table");
const mediumTable = document.getElementById("medium-table");
const hardTable = document.getElementById("hard-table");
const closeHighscores = document.getElementById("close-high");
// Game win modal
const levelWinModal = document.getElementById("game-level");
const pointsWinModal = document.getElementById("points-scored");
const mistakesWinModal = document.getElementById("mistakes-penalties");
const timeBonusWinModal = document.getElementById("time-bonus");
const totalScore = document.querySelector("#total-score strong");
const playerNameInput = document.getElementById("playerName");
const saveButton = document.getElementById("save-score");
const closeButton = document.getElementById("close-win");
// Times up modal
const playAgainButton = document.getElementById("play-again");
const noAgainButton = document.getElementById("play-again-no");

// ----------------------- Buttons
// Back to main menu buttons
closeButton.addEventListener("click", function () {
    startGame();
});
quit.addEventListener("click", function () {
    startGame();
});
noAgainButton.addEventListener("click", function () {
    startGame();
});
closeHighscores.addEventListener("click", function () {
    startGame();
});
// Audio buttons
const clickButton = document.querySelectorAll(".click");
clickButton.forEach((element) => {
    element.addEventListener("click", function () {
        click.play();
    });
});

// ----------------------- Audio
// Audio files
const click = new Audio("assets/audio/click.mp3");
const wrong = new Audio("assets/audio/wrong.mp3");
const match = new Audio("assets/audio/match.mp3");
const finish = new Audio("assets/audio/finish.mp3");
const over = new Audio("assets/audio/over.mp3");
const revers = new Audio("assets/audio/revers.mp3");
// Volume on/off toggle
const volumeOnIcon = document.querySelectorAll(".fa-volume-up");
volumeMenu.addEventListener("click", function () {
    volumeOnIcon.forEach((element) => {
        element.classList.toggle("fa-volume-up");
        element.classList.toggle("fa-volume-mute");
    });
    click.muted = !click.muted;
    wrong.muted = !wrong.muted;
    match.muted = !match.muted;
    finish.muted = !finish.muted;
    over.muted = !over.muted;
    revers.muted = !revers.muted;
});
volumeArena.addEventListener("click", function () {
    volumeOnIcon.forEach((element) => {
        element.classList.toggle("fa-volume-up");
        element.classList.toggle("fa-volume-mute");
    });
    click.muted = !click.muted;
    wrong.muted = !wrong.muted;
    match.muted = !match.muted;
    finish.muted = !finish.muted;
    over.muted = !over.muted;
    revers.muted = !revers.muted;
});

// ----------------------- Game start
function startGame() {
    mainMenuSection.style.display = "flex";
    gameArenaSection.style.display = "none";
}
window.onload = startGame;

// Create cards in game arena according to the selected level
// Hide main menu section and show game arena section
// Set and display points, level, timer, turn counter in their starting values
// Call functions to shuffle cards, start timer and active score system
let turnCounter;
let time;
let addPoints;
let subtractPoints;
let gameLevel;
let pairs;
function level(userChoice) {
    let cards = "";
    let cardNum = 15;
    if (userChoice === "easy") {
        gameLevel = "easy";
        cardNum = 7;
        levelArena.innerHTML = gameLevel;
        pairs = 4;
    } else if (userChoice === "medium") {
        gameLevel = "medium";
        cardNum = 11;
        levelArena.innerHTML = gameLevel;
        pairs = 6;
    } else if (userChoice === "hard") {
        gameLevel = "hard";
        levelArena.innerHTML = gameLevel;
        pairs = 8;
    }
    let i;
    for (i = 0; i <= cardNum; i++) {
        cards = `${cards}<div class="card" onclick="reverse(${i})" id="c${i}"></div>`;
    }
    mainMenuSection.style.display = "none";
    gameArenaSection.style.display = "flex";
    turnCounter = 0;
    time = 60;
    addPoints = 0;
    subtractPoints = 0;
    boardArena.innerHTML = cards;
    counterArena.innerHTML = turnCounter;
    timeArena.innerHTML = time;
    shuffle();
    timerStart();
    scoreSystem();
}

// Shuffle cards before each game
let figShuffle;
function shuffle() {
    figShuffle = figures.slice();
    let cardNum = 14;
    if (gameLevel === "easy") {
        cardNum = 6;
    } else if (gameLevel === "medium") {
        cardNum = 10;
    }
    let i;
    let j;
    let temp;
    for (i = cardNum; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = figShuffle[i];
        figShuffle[i] = figShuffle[j];
        figShuffle[j] = temp;
    }
    return figShuffle;
}

// Add figure on the other side of card
// Check if one or two cards reversed
// Check if two cards are the same
// Add lock to prevent reverse more than 2 cards before check
// Update turn counter with every two cards reversed
// Call scoring function to add points when 2 cards match and subtract points when don't
let oneVisible = false;
let firstCardNo;
let lock = false;
function reverse(no) {
    if (lock === false) {
        lock = true;
        let element = `c${no}`;
        let picture = `url(assets/images/${figShuffle[no]})`;
        document.getElementById(element).style.background = picture;
        document.getElementById(element).style.backgroundSize = "cover";
        document.getElementById(element).classList.add("cardA");
        document.getElementById(element).classList.remove("card");
        if (oneVisible === false) {
            oneVisible = true;
            firstCardNo = no;
            lock = false;
            revers.play();
        } else {
            if (figShuffle[firstCardNo] === figShuffle[no]) {
                match.volume = 1;
                match.play();
                keep2Cards();
                addPoints++;
            } else {
                wrong.play();
                setTimeout(function () {
                    restore2Cards(firstCardNo, no);
                }, 750);
                subtractPoints++;
            }
            turnCounter++;
            counterArena.innerHTML = turnCounter;
            oneVisible = false;
            scoreSystem();
        }
    }
}

// When 2 reversed cards match keep them on board
// Remove lock
// Update pairs variable and if 0 clear time interval
// Play finish audio when all pairs reversed
function keep2Cards() {
    lock = false;
    pairs--;
    if (pairs === 0) {
        match.volume = 0;
        clearInterval(countDown);
        finish.play();
    }
}

// When 2 reversed cards do not match restore them
// Remove lock
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

// Game timer
// Set interval
// Clear interval when times up or quit button hit
// Show times up modal when time = 0
let countDown;
function timerStart() {
    countDown = setInterval(timer, 1000);
}

function timer() {
    time--;
    timeArena.innerHTML = time;
    if (time < 10 && time > 0) {
        timeArena.innerHTML = "0" + time;
    } else if (time === 0) {
        oneVisible = false;
        over.play();
        $("#times-up-modal").modal("show");
        clearInterval(countDown);
    }
}
quit.addEventListener("click", function () {
    clearInterval(countDown);
});

// Score system
// Show game win modal when all pairs match
function scoreSystem() {
    pointsArena.innerHTML = 50 * addPoints - 20 * subtractPoints;
    if (pairs === 0) {
        $("#game-win-modal").modal("show");
        levelWinModal.innerHTML = gameLevel;
        pointsWinModal.innerHTML = 50 * addPoints;
        mistakesWinModal.innerHTML = -20 * subtractPoints;
        timeBonusWinModal.innerHTML = time;
        if (gameLevel === "medium") {
            timeBonusWinModal.innerHTML = `${time * 2} (added time bonus: x2)`;
        } else if (gameLevel === "hard") {
            timeBonusWinModal.innerHTML = `${time * 3} (added time bonus: x3)`;
        }
        totalScore.innerHTML = 50 * addPoints - 20 * subtractPoints + parseInt(timeBonusWinModal.innerHTML);
    }
}

// Play again when times up
playAgainButton.addEventListener("click", function () {
    playAgain();
});

function playAgain() {
    if (gameLevel === "easy") {
        level("easy");
    } else if (gameLevel === "medium") {
        level("medium");
    } else if (gameLevel === "hard") {
        level("hard");
    }
}

// Save score to local storage
// Show score in highscores modal
const printScoresEasy = document.getElementById("print-scores-easy");
const printScoresMedium = document.getElementById("print-scores-medium");
const printScoresHard = document.getElementById("print-scores-hard");
clearButton.addEventListener("click", function () {
    if (gameLevel === "easy") {
        printScoresEasy.style.display = "none";
        localStorage.removeItem("highScoresEasy");
    } else if (gameLevel === "medium") {
        printScoresMedium.style.display = "none";
        localStorage.removeItem("highScoresMedium");
    } else if (gameLevel === "hard") {
        printScoresHard.style.display = "none";
        localStorage.removeItem("highScoresHard");
    } else {
        localStorage.removeItem("highScoresEasy");
        localStorage.removeItem("highScoresMedium");
        localStorage.removeItem("highScoresHard");
        printScoresEasy.style.display = "none";
        printScoresMedium.style.display = "none";
        printScoresHard.style.display = "none";
    }
});
highscoresButton.addEventListener("click", function () {
    gameLevel = null;
    easyTable.style.display = "block";
    mediumTable.style.display = "block";
    hardTable.style.display = "block";
    printScoresEasy.innerHTML = (JSON.parse(localStorage.getItem("highScoresEasy")) || [])
        .map((score) => {
            return `<tr class="select">
        <td>${score.name}</td>
        <td>${score.score}</td>
        <td>${score.turns}</td>
        </tr>`;
        })
        .join("");
    printScoresMedium.innerHTML = (JSON.parse(localStorage.getItem("highScoresMedium")) || [])
        .map((score) => {
            return `<tr class="select">
        <td>${score.name}</td>
        <td>${score.score}</td>
        <td>${score.turns}</td>
        </tr>`;
        })
        .join("");
    printScoresHard.innerHTML = (JSON.parse(localStorage.getItem("highScoresHard")) || [])
        .map((score) => {
            return `<tr class="select">
        <td>${score.name}</td>
        <td>${score.score}</td>
        <td>${score.turns}</td>
        </tr>`;
        })
        .join("");
});
saveButton.addEventListener("click", function () {
    const score = {
        name: playerNameInput.value,
        score: totalScore.innerHTML,
        turns: turnCounter,
    };
    const getHighScoresEasy = JSON.parse(localStorage.getItem("highScoresEasy")) || [];
    const getHighScoresMedium = JSON.parse(localStorage.getItem("highScoresMedium")) || [];
    const getHighScoresHard = JSON.parse(localStorage.getItem("highScoresHard")) || [];
    let getHighScores;
    let printScores;
    if (gameLevel === "easy") {
        getHighScores = getHighScoresEasy;
        printScores = printScoresEasy;
        easyTable.style.display = "block";
        mediumTable.style.display = "none";
        hardTable.style.display = "none";
    } else if (gameLevel === "medium") {
        getHighScores = getHighScoresMedium;
        printScores = printScoresMedium;
        easyTable.style.display = "none";
        mediumTable.style.display = "block";
        hardTable.style.display = "none";
    } else if (gameLevel === "hard") {
        getHighScores = getHighScoresHard;
        printScores = printScoresHard;
        easyTable.style.display = "none";
        mediumTable.style.display = "none";
        hardTable.style.display = "block";
    }
    printScores.style.display = "table-row-group";
    getHighScores.push(score);
    getHighScores.sort((a, b) => b.score - a.score);
    getHighScores.splice(5);
    localStorage.setItem("highScoresEasy", JSON.stringify(getHighScoresEasy));
    localStorage.setItem("highScoresMedium", JSON.stringify(getHighScoresMedium));
    localStorage.setItem("highScoresHard", JSON.stringify(getHighScoresHard));
    $("#highscores-modal").modal("show");
    $("#game-win-modal").modal("hide");
    printScores.innerHTML = getHighScores
        .map((score) => {
            return `<tr class="select">
        <td>${score.name}</td>
        <td>${score.score}</td>
        <td>${score.turns}</td>
        </tr>`;
        })
        .join("");
});
