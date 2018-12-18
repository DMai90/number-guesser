/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if they lost
- Let player choose to play again
*/

// Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for Guess
guessBtn.addEventListener("click", function(e) {
  let guess = parseInt(guessInput.value);
  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }
  // Check if winner
  else if (guess === winningNum) {
    // Game Over Won
    // // Disable Input
    // guessInput.disabled = true;
    // // Change Border Color
    // guessInput.style.borderColor = 'green';
    // // Set Winning Message
    // setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game Over - lost
      // guessInput.disabled = true;
      // guessInput.style.borderColor = 'red';
      // setMessage(`GAME OVER, you lost! The correct number is ${winningNum}`, 'red');
      gameOver(
        false,
        `GAME OVER, you lost! The correct number is ${winningNum}`
      );
    } else {
      guessInput.style.borderColor = "red";
      guessInput.value = "";
      setMessage(
        `${guess} is incorrect!!!! ${guessesLeft} guesses remaining`,
        "red"
      );
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : "red";

  // Disable Input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  setMessage(msg, color);
  // Play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}
// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
