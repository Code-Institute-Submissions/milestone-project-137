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
let points_p = document.getElementById("points");
let level_p = document.getElementById("level");
let time_p = document.getElementById("time");
let counter_p = document.getElementById("counter");

// Create cards in game arena
window.onload = level;

function level() {
    let cards = "";
    for (i = 0; i <= 7; i++) {
        cards = `${cards}<div class="card" onclick="reverse(${i})" id="c${i}"></div>`
    }
    board_div.innerHTML = cards;
};

// Add figure on the other side of card
// Check if one or two cards reversed
let oneVisible = false;
turnCounter = 0;
function reverse(no) {
    let element = `c${no}`
    let picture = `url(assets/images/${figures[no]})`
    document.getElementById(element).style.background = picture
    document.getElementById(element).style.backgroundSize = "cover";
    document.getElementById(element).classList.add("cardA");
    document.getElementById(element).classList.remove("card");

    if (oneVisible === false) {
        oneVisible = true;
    } else {
        turnCounter++;
        counter_p.innerText = `Turncounter: ${turnCounter}`
        oneVisible = false;
    }
};