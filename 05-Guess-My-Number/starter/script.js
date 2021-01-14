'use strict';


let againButton = document.querySelector(".again");
againButton.onclick = function() {
    window.location.reload();

};
let number = Math.floor(Math.random() * 20);
let message = document.querySelector(".message");

let score = 20;


let num = document.querySelector(".number");
num.textContent = number;
document.querySelector('.check').addEventListener('click', function() {
    let guess = document.querySelector(".guess").value;
    score -= 1;
    document.querySelector(".score").textContent = score;
    if (guess > number) {

        message.textContent = "📈Too high";
    }

    if (guess < number) {
        message.textContent = "📉Too low";
    }

    if (guess == number) {
        message.textContent = "Correct number!";
        document.querySelector(".highscore").textContent = score;
    }



});

// let secretNumber = Math.trunc(Math.random() * 20) + 1;
// let score = 20;
// let highscore = 0;

// const displayMessage = function(message) {
//     document.querySelector('.message').textContent = message;
// };

// document.querySelector('.check').addEventListener('click', function() {
//     const guess = Number(document.querySelector('.guess').value);
//     console.log(guess, typeof guess);

//     // When there is no input
//     if (!guess) {
//         // document.querySelector('.message').textContent = '⛔️ No number!';
//         displayMessage('⛔️ No number!');

//         // When player wins
//     } else if (guess === secretNumber) {
//         // document.querySelector('.message').textContent = '🎉 Correct Number!';
//         displayMessage('🎉 Correct Number!');
//         document.querySelector('.number').textContent = secretNumber;

//         document.querySelector('body').style.backgroundColor = '#60b347';
//         document.querySelector('.number').style.width = '30rem';

//         if (score > highscore) {
//             highscore = score;
//             document.querySelector('.highscore').textContent = highscore;
//         }

//         // When guess is wrong
//     } else if (guess !== secretNumber) {
//         if (score > 1) {
//             // document.querySelector('.message').textContent =
//             // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
//             displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
//             score--;
//             document.querySelector('.score').textContent = score;
//         } else {
//             // document.querySelector('.message').textContent = '💥 You lost the game!';
//             displayMessage('💥 You lost the game!');
//             document.querySelector('.score').textContent = 0;
//         }
//     }

//     //   // When guess is too high
//     // } else if (guess > secretNumber) {
//     //   if (score > 1) {
//     //     document.querySelector('.message').textContent = '📈 Too high!';
//     //     score--;
//     //     document.querySelector('.score').textContent = score;
//     //   } else {
//     //     document.querySelector('.message').textContent = '💥 You lost the game!';
//     //     document.querySelector('.score').textContent = 0;
//     //   }

//     //   // When guess is too low
//     // } else if (guess < secretNumber) {
//     //   if (score > 1) {
//     //     document.querySelector('.message').textContent = '📉 Too low!';
//     //     score--;
//     //     document.querySelector('.score').textContent = score;
//     //   } else {
//     //     document.querySelector('.message').textContent = '💥 You lost the game!';
//     //     document.querySelector('.score').textContent = 0;
//     //   }
//     // }
// });