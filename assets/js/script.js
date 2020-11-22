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
// Check if two cards are the same
let oneVisible = false;
let turnCounter = 0;
let firstCardNo;
function reverse(no) {
    let element = `c${no}`
    let picture = `url(assets/images/${figures[no]})`
    document.getElementById(element).style.background = picture
    document.getElementById(element).style.backgroundSize = "cover";
    document.getElementById(element).classList.add("cardA");
    document.getElementById(element).classList.remove("card");

    if (oneVisible === false) {
        oneVisible = true;
        firstCardNo = no;
    } else {
        if (figures[firstCardNo] === figures[no]) {
            keep2Cards();
        } else {
            restore2Cards(firstCardNo, no);
        }

        turnCounter++;
        counter_span.innerHTML = `Turn counter: ${turnCounter}`
        oneVisible = false;
    }
};

function keep2Cards() {
    alert("same!");
};

function restore2Cards(firstCardNo, no) {
    let element1 = `c${firstCardNo}`;
    let element2 = `c${no}`;
    document.getElementById(element1).style.background = "rgb(67, 176, 42)";
    document.getElementById(element1).classList.add("card");
    document.getElementById(element1).classList.remove("cardA");
    document.getElementById(element2).style.background = "rgb(67, 176, 42)";
    document.getElementById(element2).classList.add("card");
    document.getElementById(element2).classList.remove("cardA");
}