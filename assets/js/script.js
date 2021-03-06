const quizContainer = document.querySelector("#quiz-container");
const quizIntroEl = document.querySelector("#quiz-intro");
const quizQuestionsEl = document.querySelector("#quiz-questions");
const highScoreEl = document.querySelector("#high-score");
const startBtn = document.querySelector("#start-btn");
const timerEl = document.querySelector("#timer");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answer-choices");
const answerBtn = document.querySelector(".choice-button");
const answerResponseEl = document.querySelector("#answer-response");
const answerChoiceLi = document.querySelector(".answer-choice");
const questionCounter = document.querySelector("#question-counter");
const highScoresList = document.querySelector("#high-scores");
const initialsEl = document.querySelector("#initials");
const scoreEntryForm = document.querySelector("#score-entry-form");
const scoreP = document.querySelector("#score");
let timeInterval = null;
const quizScore = 0;
let answerBtnId = 0;
let quizTimer = 30;
let questionNumber = 0;
let questionsCorrect = 0;
let entryId = 0;
let i = 0;
let highScoresArr = [];
const finalScore = document.querySelector("#final-score");
const quizQuestionsArr = [
  // copy this object format for each question
  {
    question: 'Where is the correct place to insert a JavaScript in an HTML file?',
    answer: {
      1: "Both the '<head>' and the '<body>' section are correct", /*correct answer*/
      2: 'The "<body>" section',
      3: 'the "<head>" section',
    },
    correct: 1
  },
  {
    question: 'How do you display an alert box with the message "Hello World"?',
    answer: {
      1: "alert('Hello World')", /*correct answer*/
      2: "msgBox('Hello World')",
      3: "Alexa, make an alert box with 'Hello World'",
    },
    correct: 1
  },
  {
    question: 'What is an object that stores multiple values in a single variable?',
    answer: {
      1: "a storage bin",
      2: "a web",
      3: "an array" /*correct answer*/
    },
    correct: 3
  },
  {
    question: 'How are Boolean functions used?',
    answer: {
      1: "to make your application more efficient",
      2: "to find if an expression is true or false", /*correct answer*/
      3: "to warn users about hackers"
    },
    correct: 3
  },
  {
    question: 'Do you think you will earn a high score?',
    answer: {
      1: "Yep, I'm a web dev pro",
      2: "Maybe, I knew some of them",
      3: "Unlikely, I'm just here to see Kelly's code quiz", /*correct answer*/
    },
    correct: 3
  }
];




/*
// QUIZ INTRO FUNCTION
// Creates div for directions and start button
// */
const quizIntro = function () {
  loadHighScores();
  document.getElementById("high-score-form").style.visibility = "hidden";
  // if buttons are on the page, skip create div, form, and button
  // creates div and adds directions
  let quizDirections = document.createElement("h2");
  quizDirections.className = "directions";
  quizDirections.textContent = "Answer as many questions as you can in 1 minute. If you get a question wrong, it subtracts 5 seconds from your timer!";

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
  quizTimer = 30;
  questionNumber = 0;
  questionsCorrect = 0;
  questionCounter.innerHTML = "";
};

// QUIZ QUESTIONS FUNCTION
// populates each question
const quizQuestions = function () {
  if (questionNumber === quizQuestionsArr.length) {
    stopTimer();
  } else {
    const currentQuestion = quizQuestionsArr[questionNumber];
    answerResponseEl.textContent = "";
    console.log("Here is the Question: ", currentQuestion.question);
    questionEl.textContent = currentQuestion.question;

    for (let [key, value] of Object.entries(currentQuestion.answer)) {
      const choiceEl = document.createElement("li");
      choiceEl.className = "answer-choice";

      const choiceBtn = document.createElement("button");
      choiceBtn.className = "choice-button";
      choiceBtn.setAttribute("id", key);
      answerBtnId++;

      choiceBtn.textContent = value;
      choiceEl.appendChild(choiceBtn);
      answersEl.appendChild(choiceEl);
    };
  }
};



/*
TIMER FUNCTION
Counts Down from 60
*/


function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
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
    // } if (questionNumber === quizQuestionsArr.length) {
    //   answersEl.innerHTML = "";
    //   questionEl.innerHTML = "YOUR HAVE ANSWERED ALL QUIZ QUESTIONS! GAME OVER.";
    //   console.log("END OF ARRAY. GAME OVER.");
    //   setTimeout(function () { quizOver(); }, 1000);
    //   clearInterval(timeInterval);
    } else if (quizTimer <= 0) {
      // Once `quizTimer` gets to 0, set `timerEl` to an empty string
      stopTimer();
    }
  }, 1000);
};

const stopTimer = function () {
  if (questionNumber === quizQuestionsArr.length) {

    questionEl.innerHTML = "YOUR HAVE ANSWERED ALL QUIZ QUESTIONS! GAME OVER.";
    console.log("END OF ARRAY. GAME OVER.");
  }
  quizQuestionsEl.innerHTML = "";

  clearInterval(timeInterval);
  // Once `quizTimer` gets to 0, set `timerEl` to an empty string
  questionEl.textContent = "TIMES UP!";
  quizOver();
};

/*
QUIZ OVER FUNCTION
Ends quiz, shows score, and resets quiz
*/
const quizOver = function () {
  // stop timer
  quizTimer = 0;
  questionCounter.innerHTML = "";
  questionEl.textContent = "";

  // create new high score text
  let highScoreText = document.querySelector("#final-score");
  highScoreText.innerHTML = "Final Score: " + questionsCorrect + "/" + questionNumber + "<p>Would you like to save your score or try again?</p>";

  // creates play again button
  let playAgainBtn = document.createElement("input");
  playAgainBtn.setAttribute("type", "submit");
  playAgainBtn.setAttribute("value", "Try Again");
  playAgainBtn.setAttribute('id', 'replay-btn');

  // save initials to local storage converted to uppercase
  // creates button
  let enterScoreBtn = document.createElement("button");
  enterScoreBtn.className = "btn";
  enterScoreBtn.setAttribute("id", "enter-score");
  // adds button text
  enterScoreBtn.innerHTML = "Enter Score";

  // add button to div
  highScoreEl.appendChild(highScoreText);
  highScoreEl.appendChild(playAgainBtn);
  highScoreEl.appendChild(enterScoreBtn);
  answersEl.textContent = "";

  // reset questions and timer
  timerEl.innerHTML = "";

};

const highScoreEntry = function (highScoreObj) {
  const entry = document.createElement("li");
  const initials = document.getElementById("initials").value;
  entry.className = "high-score-entry list-group-item";
  entry.setAttribute("data-entry-id", entryId);
  highScoreObj = {
    initials: initials,
    score: questionsCorrect,
    id: entryId
  };

  entryText = document.createElement("div");
  entryText.className = "entry-text";
  entryText.innerHTML = "<p class='initials-entry'> " + highScoreObj.initials + " <span class='score-entry'> " + highScoreObj.score + " </span></p>";

  console.log(entry);
  highScoresList.appendChild(entry);
  entry.appendChild(entryText);

  highScoreObj.id = entryId;
  highScoresArr.push(highScoreObj);

  console.log("Score Added!");
  entryId++;
};

highScoreHandler = function (event) {
  let targetEl = event.target;
  event.preventDefault();
  if (targetEl.matches("#enter-score")) {
    document.getElementById("high-score-form").style.visibility = "visible";
    console.log("User would like to save their score!");
  } if (targetEl.matches("#save-score-btn")) {
    document.getElementById("high-score-form").style.visibility = "hidden";
    event.preventDefault();
    highScoreEntry();
    saveScores();
    document.getElementById("enter-score").remove();
  };
};



/*
STARTS QUIZ
timer starts, questions populate, keeps track of correct answers
*/
const startQuiz = function () {
  // clear out quiz intro from the div
  quizIntroEl.textContent = "";
  // start questions and timer
  countdown();
  quizQuestions();

};




/*
QUIZ BUTTON HANDLER
Controls start button, answer choices, and replay button
*/

const quizButtonHandler = function (event) {
  var targetEl = event.target;
  event.preventDefault;
  // start quiz
  if (targetEl.matches("#start-btn")) {
    startQuiz();
    console.log("Start Quiz", targetEl);
    // play agin
  } if (targetEl.matches("#replay-btn")) {
    window.location.reload();

  } if (targetEl.matches(".choice-button")) {
    console.log(targetEl);
    answersEl.innerHTML = "";
    console.log(questionNumber);
    if (targetEl.id == JSON.stringify(quizQuestionsArr[questionNumber].correct)) {
      console.log("Correct! Next question.", targetEl.id);
      answerResponseEl.innerHTML = "Correct!";
      questionsCorrect = questionsCorrect + 1;
      setTimeout(function () { quizQuestions(); }, 1000);
    } else {
      answerResponseEl.innerHTML = "Incorrect! -5 seconds";
      quizTimer = quizTimer - 5;
      setTimeout(function () { quizQuestions(); }, 1000);
      console.log("Incorrect, next question.", targetEl.id);

      // quiz answer choice is incorrect
    }
    questionNumber++;
    questionCounter.innerHTML = "Score: " + questionsCorrect + "/" + questionNumber;
  }
};

const saveScores = function () {
  localStorage.setItem("high-scores", JSON.stringify(highScoresArr));
};

const loadHighScores = function () {
  let savedScores = localStorage.getItem("high-scores");
  if (!savedScores) {
    return false;
  }
  savedScores = JSON.parse(savedScores);

  savedScores.forEach(function (index) {
    const savedScoreObj = {
      initials: index.initials,
      score: index.score,
      id: entryId
    };
    let savedEntry = document.createElement("li");
    savedEntry.className = "high-score-entry list-group-item";
    savedEntry.innerHTML = "<p class='initials-entry'>  " + savedScoreObj.initials + "<span class='score-entry'>  " + savedScoreObj.score + "</span></p>";
    highScoresList.appendChild(savedEntry);
    entryId++;
    console.log("Here are the saved scores!", savedScoreObj.initials, savedScoreObj.score);
  });
  highScoresArr = savedScores;
};

// STARTS QUIZ
quizIntro();

// event listener on start button to call start quiz
quizContainer.addEventListener("click", quizButtonHandler);
quizContainer.addEventListener("click", quizButtonHandler);
highScoreEl.addEventListener("click", highScoreHandler);