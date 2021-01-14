let newGame = document.querySelector(".btn--new");
newGame.addEventListener("click", function() {

    window.location.reload();
});

let player = [0, 1];
let index = 0;
let playerScore = [0, 0];

let addNumber = 0;

let rollDice = document.querySelector(".btn--roll");
rollDice.addEventListener("click", function() {

    let number = Math.floor(Math.random() * 6) + 1;

    displayDice(number);
    if (number === 1) {




        switchPlayer();

    } else {
        addNumber += number;
        document.querySelector(`#current--${index}`).textContent = addNumber;
    }




});

document.querySelector(".btn--hold").addEventListener("click", function() {
    let totalScore = document.querySelector(`#score--${index}`);
    playerScore[index] += addNumber;
    totalScore.textContent = playerScore[index];
    switchPlayer();
});


function displayDice(num) {
    let diceImage = document.querySelector(".dice");
    diceImage.style.display = "block"
    diceImage.src = `dice-${num}.png`;
}

function switchPlayer() {
    addNumber = 0;
    document.querySelector(`#current--${index}`).textContent = 0;
    document.querySelector(`.player--${player[index]}`).classList.remove("player--active");
    if (index === 0) {
        index = 1;
    } else {
        index = 0;
    }
    document.querySelector(`.player--${player[index]}`).classList.add("player--active");


}