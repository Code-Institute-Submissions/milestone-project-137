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

// Global variables
const easy_button = document.getElementById("easy");
const medium_button = document.getElementById("medium");
const hard_button = document.getElementById("hard");

const mainMenuSection = document.getElementById("main-menu-section");

const gameArenaSection = document.getElementById("game-arena-section");
const board_div = document.getElementById("board");
let points_span = document.querySelector("#points span");
let level_span = document.querySelector("#level span");
let time_span = document.querySelector("#time span");
let counter_span = document.querySelector("#counter span");

// JS variables
let turnCounter = 0;
let time;

window.onload = level;

// Create cards in game arena
function level() {
    let cards = "";
    for (i = 0; i <= 7; i++) {
        cards = `${cards}<div class="card" onclick="reverse(${i})" id="c${i}"></div>`
    }
    board_div.innerHTML = cards;
    level_span.innerHTML = `Level: Test`
    time = 60;
    shuffle();
    timer();
    
};

// Shuffle cards before game starts
function shuffle() {
    let i,
        j,
        temp;
    for (i = 7 - 1; i > 0; i--) {
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
            } else {
                setTimeout(function () {
                    restore2Cards(firstCardNo, no);
                }, 750);
            };

            turnCounter++;
            counter_span.innerHTML = `Turn counter: ${turnCounter}`
            oneVisible = false;
        };
    };
};

// When 2 reversed cards match
function keep2Cards() {
    lock = false;
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
    time_span.innerHTML = `Time: ${time}`
    if (time === 0) {
        return;
    };
    setTimeout(timer, 1000);
};