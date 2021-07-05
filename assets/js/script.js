const quizContainer = document.querySelector("#quiz-container");
const startBtn = document.querySelector("#start-button");
const timerEl = document.querySelector("#timer");
const quizScore = 0;
const quizQuestions = [
    // copy this object format for each question, a: is number of correct answer
    { q: '', 1: '', 2: '', 3: '',  4: '', a: 2 }
    ];

/*
   QUIZ INTRO FUNCTION
  creates div for directions and start button
*/
const quizDirectionsEl = document.createElement("div");
const quizFormEl = document.createElement("form");

const quizIntro = function () {
  // creates div and adds directions

  quizDirectionsEl.className="directions";
  quizDirectionsEl.textContent= "Answer as many questions as you can in 1 minute. If you get a question wrong, it subtracts 5 seconds from your timer!";
  
  // creates form and gives class

    quizFormEl.className = "quiz-form";
 
  // creates button
  let startQuizBtn = document.createElement("button");
      // adds button text
      startQuizBtn.textContent = "START QUIZ";
    startQuizBtn.className = "btn start-btn";



    // add button to form
    quizFormEl.appendChild(startQuizBtn);
  
    // add directions to div
    quizContainer.appendChild(quizDirectionsEl);

    // add form to div
    quizContainer.appendChild(quizFormEl);
};

/*
// STARTS THE QUIZ ON BUTTON CLICK
*/
const quizButtonHandler = function (event) {
  event.preventDefault();
  startQuiz();
};

/*
// TIMER THAT COUNTS DOWN FROM 60 
*/
function countdown() {
  let quizTimer = 60;
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    // As long as the `quizTimer` is greater than 1
    if (quizTimer > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = quizTimer + ' seconds remaining';
      // Decrement `quizTimer` by 1
      quizTimer--;
    } else if (quizTimer === 1) {
      // When `quizTimer` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = quizTimer + ' second remaining';
      quizTimer--;
    } else {
      // Once `quizTimer` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = "TIMES UP!";
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `gameOver()` function
      gameOver();
    }
  }, 1000);
};

const quizOver = function() {

};

/*
// STARTS QUIZ
// timer starts, questions populate, keeps track of correct answers
*/
const startQuiz = function() {
  // clear out quiz intro from the div
let quizQuestionsEl = document.createElement("div");
quizQuestionsEl.className = "quiz-questions";
quizQuestionsEl.textContent = "JAVASCRIPT CODE QUESTIONS WILL BE HERE!";

quizContainer.appendChild(quizQuestionsEl);
quizContainer.removeChild(quizFormEl);
quizContainer.replaceChild(quizQuestionsEl, quizDirectionsEl);

countdown();
};





quizIntro();
/*

Event Listeners

*/
// event listener on start button to call start quiz
quizFormEl.addEventListener("click", quizButtonHandler);

// event listener that response to answer click to bring the next question 










