"use strict";

const againBtn = document.querySelector(".again");
const secretVal = document.querySelector(".secret-val");
const input = document.querySelector("input");
const checkBtn = document.querySelector(".check");
const guessReview = document.querySelector(".guess-review");
const score = document.querySelector(".score");
const highscore = document.querySelector(".highscore");
const body = document.querySelector("body");
const card = document.querySelector(".card");
const overlay = document.querySelector(".overlay");
const closeCardBtn = document.querySelector(".close-card-btn");

/* The whole game revolves around this randomNum */
const randomNum = Math.trunc(Math.random() * 20) + 1;
let endOfGame = false;

if (localStorage.getItem("highscore") != null) {
    highscore.innerText = localStorage.getItem("highscore");
}

function displayCard() {
    const cardGuessReview = document.querySelectorAll(".guess-review")[1];
    const cardScore = document.querySelectorAll(".score")[1];
    const cardHighscore = document.querySelectorAll(".highscore")[1];

    cardGuessReview.innerText = guessReview.innerText;
    cardScore.innerText = score.innerText;
    cardHighscore.innerText = highscore.innerText;

    card.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeCard() {
    card.classList.add("hidden");
    overlay.classList.add("hidden");
}

function gameEnd() {
    endOfGame = true;
    secretVal.innerText = randomNum;
    input.readOnly = "true";
    displayCard();
}

function play() {
    if (endOfGame) {
        gameEnd();
    } else if (input.value.length != 0) {
        const inputValue = Number(input.value);
        input.value = "";
        if (inputValue === randomNum) {
            guessReview.innerText = "You Win!";
            if (Number(score.innerText) > Number(highscore.innerText)) {
                highscore.innerText = score.innerText;
                localStorage.setItem("highscore", highscore.innerText);
            }
            body.classList.add("win");
            card.classList.add("win-border");
            gameEnd();
        } else {
            inputValue > randomNum ? guessReview.innerText = "Too High!" : guessReview.innerText = "Too Low!";
            score.innerText = Number(score.innerText) - 1;
            if (score.innerText == 0) {
                guessReview.innerText = "You Lost the Game!";
                body.classList.add("lost");
                card.classList.add("lost-border");
                gameEnd();
            }
        }
    } else if (input.value.length == 0) {
        guessReview.innerText = "No Number!";
    }
}

checkBtn.addEventListener("click", play);

document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        play();
    }
});

document.addEventListener("input", function(e) {
    const inRange = input.value >= 1 && input.value <= 20;
    if (!inRange && input.value != "") {
        input.value = "";
        guessReview.innerText = "Out of Range!";
    }
});

againBtn.addEventListener("click", function(e) {
    location.reload();
});

closeCardBtn.addEventListener("click", closeCard);