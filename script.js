'use strict';

//* Selecting elements
const player0Element = document.querySelector(`.player--0`);
const player1Element = document.querySelector(`.player--1`);
const score0Element = document.getElementById(`score--0`);
const score1Element = document.getElementById(`score--1`);
const diceElement = document.querySelector(`.dice`);
let current0Element = document.getElementById(`current--0`);
let current1Element = document.getElementById(`current--1`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const winnerText = document.getElementById(`winner--text`); //* I implemented this myself! 🙋, it wasn't included in the course !
let scoreClassElement = document.querySelectorAll(`.score`);
let currentScoreClassElement = document.querySelectorAll(`.current-score`);

//* declare empty variables to be used later in the code
let scores, currentScore, activePlayer, playing;

//* starting condition function
const initial_state = () => {
  //* Starting conditions
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  //* Declare variables to be used in this file
  scores = [0, 0]; //* here, active player is at position 0, while next player is at position 1.
  currentScore = 0;
  activePlayer = 0;
  playing = true; //* we set this to true here but will be changed to false as soon as a player wins!
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add(`hidden`);
  winnerText.classList.add(`hidden`);
  player0Element.classList.remove(`player--winner`);
  player1Element.classList.remove(`player--winner`);
  player0Element.classList.add(`player--active`);
  player1Element.classList.remove(`player--active`);
};

initial_state(); //* Call the starting condition function.

//* This function switches from current player to the next and vice-versa.
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //* The code below will remove/add the 'player--active' class to switch to either of the players where necessary.
  player0Element.classList.toggle(`player--active`);
  player1Element.classList.toggle(`player--active`);
};

//* Rolling dice functionality
///
btnRoll.addEventListener(`click`, () => {
  if (playing) {
    //* Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    ///
    //* Display the random dice rolled
    diceElement.classList.remove(`hidden`);
    diceElement.src = `dice-${dice}.png`; //* Here we display the dice using the img 'src' element in the HTML.
    //////////
    ///////////////
    //* Check if 1 is rolled:
    if (dice !== 1) {
      //* add latest dice roll to the current score of the current player
      ////
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //* previous player score's updated to zero and switch to the next player immediately
      ////
      switchPlayer(); //* so switchPlayer function called here.
    }
  }
});

btnHold.addEventListener(`click`, () => {
  if (playing) {
    //* Add current score to the score of the active player's score
    //* get the declare scores array above, put 'activePlayer' in position 0 and assign currentScore to it.
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //* Check if the active player's score is >= 100, if so, finish the game
    if (scores[activePlayer] >= 100) {
      console.log(scores[activePlayer]);
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      //* remove the active player class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceElement.classList.add(`hidden`); //* hide the dice
      winnerText.classList.remove(`hidden`); //* show the winner text element
      if (activePlayer === 0) {
        winnerText.innerText = `Player 1 wins! 😜`;
      } else {
        winnerText.innerText = `Player 2 wins! 😜`;
      }
    } else {
      //* If not, switch to the next player
      switchPlayer(); //* so switchPlayer function called here.
    }
  }
});

btnNew.addEventListener(`click`, () => {
  initial_state(); //* call the initial state function again.
});
