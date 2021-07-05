const quizContainer = document.querySelector("#quiz-container");
const quizIntroEl = document.querySelector("#quiz-intro");
const quizQuestionsEl = document.querySelector("#quiz-questions");
const highScoreEl = document.querySelector("#high-score");
const startBtn = document.querySelector("#start-btn");
const timerEl = document.querySelector("#timer");
const quizScore = 0;
let quizTimer = 5;
const quizQuestionsArr = [
    // copy this object format for each question, a: is number of correct answer
    { q: 'This is question 1', 1: '', 2: '', 3: '',  4: '', a: 2 },
    { q: 'This is question 2', 1: '', 2: '', 3: '',  4: '', a: 2 },
    { q: 'This is question 3', 1: '', 2: '', 3: '',  4: '', a: 2 },
    { q: 'This is question 4', 1: '', 2: '', 3: '',  4: '', a: 2 },
    { q: 'This is question 5', 1: '', 2: '', 3: '',  4: '', a: 2 },
    { q: "end of quiz!"}
    ];


/*
// TIMER THAT COUNTS DOWN FROM 60 
*/
function countdown() {
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
      quizOver();
    }
  }, 1000);
};

/*
   QUIZ INTRO FUNCTION
  creates div for directions and start button
*/

const quizIntro = function () {
// if buttons are on the page, skip create div, form, and button
  // creates div and adds directions
  let quizDirections = document.createElement("h2");  
    quizDirections.className="directions";
    quizDirections.textContent= "Answer as many questions as you can in 1 minute. If you get a question wrong, it subtracts 5 seconds from your timer!";
 
    // creates button
  let startQuizBtn = document.createElement("button");
      startQuizBtn.className = "start-btn";
      startQuizBtn.setAttribute('id', 'start-btn');
      // adds button text
      startQuizBtn.textContent = "START QUIZ";

    // add directions to div
    quizIntroEl.appendChild(quizDirections);
    // add button to div
    quizIntroEl.appendChild(startQuizBtn);
  };

  let i = 0;
  
  const quizQuestions = function() { 
    quizQuestionsEl.textContent = quizQuestionsArr[i].q;
    // i++;
  };







const quizOver = function() {
  // create new high score div

  let highScoreText = document.createElement("h2");
    highScoreText.textContent = "I WONDER WHAT THE HIGH SCORE WILL BE?!";

   // creates play again button
  let playAgainBtn = document.createElement("button");
    // adds button text
    playAgainBtn.textContent = "Try Again";
    playAgainBtn.setAttribute('id', 'replay-btn');

  // add button to div
highScoreEl.appendChild(highScoreText);
highScoreEl.appendChild(playAgainBtn);
// remove correct answers div
// quizContainer.removeChild();
quizQuestionsEl.textContent = "";
i = 0;
quizTimer = 5;
};







/*
// STARTS QUIZ
// timer starts, questions populate, keeps track of correct answers
*/

const startQuiz = function() {
  // clear out quiz intro from the div
  quizIntroEl.textContent = "";
  // start timer
  countdown();
  quizQuestions();
  }; 

  







  
/*
// STARTS THE QUIZ ON BUTTON CLICK
*/
const quizButtonHandler = function (event) {
  var targetEl = event.target;

if (targetEl.matches("#start-btn")) {
  startQuiz();
  console.log("Start Quiz", targetEl);
} if (targetEl.matches("#replay-btn")) {
    quizIntroEl.textContent = "";
    highScoreEl.textContent = "";
    quizIntro();
  console.log("Try Again", targetEl);
} if (targetEl.matches("#quiz-questions")) {
      quizQuestions();
      i++;
      if (i == quizQuestionsArr.length) {
        quizQuestionsEl.textContent = "YOUR HAVE ANSWERED ALL QUIZ QUESTIONS! GAME OVER.";
        console.log("END OF ARRAY. GAME OVER.");
        timerEl.textContent ="Quiz Finished!"
       quizTimer = 0;
        // quizOver();
      }
  }
};



quizIntro();


/*
Event Listeners
*/

// event listener on start button to call start quiz
quizIntroEl.addEventListener("click", quizButtonHandler);
// event listener on answer selection to bring the next question 
quizQuestionsEl.addEventListener("click", quizButtonHandler);
// event listener on try again to start quiz intro
highScoreEl.addEventListener("click", quizButtonHandler);

