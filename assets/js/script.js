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
let timeInterval = null;
const quizScore = 0;
let answerBtnId = 0;
let q = 0;
let quizTimer = 10;
let questionNumber = 0;

const quizQuestionsArr = [
    // copy this object format for each question
  { question: 'Where is the correct place to insert JavaScript in an HTML file?', 
    answer: {
      1:"Both the '<head>' and the '<body>' section are correct",
      2:'The "<body>" section', /*correct answer*/
      3: 'the "<head>" section',
    },
    correct: 2
  },
  { question: 'How do you display an alert box with the messagee "Hello World"?',
    answer: {
      1:  "alert('Hello World')", /*correct answer*/
      2: "msgBox('Hello World')", 
      3: "Alexa, make an alert box with 'Hello World'",
      },
    correct: 1
  },
];


/*
TIMER FUNCTION
Counts Down from 60
*/


function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
   timeInterval = setInterval(function() {
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
    } else if (quizTimer === 0) {
        // Once `quizTimer` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = "TIMES UP!";
        quizOver();
        clearInterval(timeInterval);
      }
  }, 1000);
};

/*
QUIZ INTRO FUNCTION
Creates div for directions and start button
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
    quizTimer = 60;
  };



  
  // QUIZ QUESTIONS FUNCTION
  // populates each question


  const quizQuestions = function() { 
    const currentQuestion = quizQuestionsArr[questionNumber];
    answerResponseEl.textContent = "";
    if (questionNumber === quizQuestionsArr.length) {
      stopTimer();
    } else {
      console.log("Here is the Question: ", currentQuestion.question);
    questionEl.textContent = currentQuestion.question;

    for (let [key, value] of Object.entries(currentQuestion.answer)){
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


const stopTimer = function() {
  if (questionNumber === quizQuestionsArr.length) {
    answersEl.innerHTML = "";
    questionEl.innerHTML = "YOUR HAVE ANSWERED ALL QUIZ QUESTIONS! GAME OVER.";
    console.log("END OF ARRAY. GAME OVER.");
    setTimeout(function() {quizOver();}, 1000);
    clearInterval(timeInterval);
  } else {
    // Once `quizTimer` gets to 0, set `timerEl` to an empty string
    questionEl.textContent = "TIMES UP!";
    answersEl.innerHTML = "";
    quizOver();
  }
  questionNumber = 0;
};


/*
QUIZ OVER FUNCTION
Ends quiz, shows score, and resets quiz
*/
const quizOver = function() {
  // stop timer
  quizTimer = 0;
  // QuestionNumber = 0;

  
  // create new high score text
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
    answersEl.textContent = "";
    questionEl.textContent = "";
  
  // reset questions and timer
    timerEl.innerHTML = "";
    
  };



/*
STARTS QUIZ
timer starts, questions populate, keeps track of correct answers
*/
const startQuiz = function() {
  // clear out quiz intro from the div
  quizIntroEl.textContent = "";
  // start questions and timer
  countdown();
  quizQuestions();
  QuestionNumber = 0;
  }; 


  
/*
QUIZ BUTTON HANDLER
Controls start button, answer choices, and replay button
*/


const quizButtonHandler = function (event) {
  var targetEl = event.target;

// start quiz
  if (targetEl.matches("#start-btn")) {
    startQuiz();
    console.log("Start Quiz", targetEl);
// play agin
} if (targetEl.matches("#replay-btn")) {
    quizIntroEl.textContent = "";
    highScoreEl.textContent = "";
    answersEl.textContent = "";
    timerEl.innterHTML = "";
    quizTimer = 10;
    quizIntro();
  console.log("Try Again", targetEl);
// quiz answer choice
} if (targetEl.matches(".choice-button")) {
  console.log(targetEl);
  answersEl.innerHTML = "";
  
  console.log(questionNumber);
    // on click, quiz over
    //  if (i === quizQuestionsArr.length) {
    //   answersEl.innerHTML = "";
    //   questionEl.innerHTML = "YOUR HAVE ANSWERED ALL QUIZ QUESTIONS! GAME OVER.";
    //   console.log("END OF ARRAY. GAME OVER.");
    //   setTimeout(function() {quizOver();}, 1000);
      // quiz answer choice is correct]
 if (targetEl.id == JSON.stringify(quizQuestionsArr[questionNumber].correct)) {
  console.log("Correct! Next question.", targetEl.id);
  answerResponseEl.innerHTML = "Correct!";
  setTimeout(function() {quizQuestions();}, 1000);
 } else { answerResponseEl.innerHTML = "Incorrect! -5 seconds";
 setTimeout(function() {quizQuestions();}, 1000);
 console.log("Incorrect, next question.", targetEl.id);
      // quiz answer choice is incorrect
    }
    questionNumber++;
  }
};



// STARTS QUIZ
quizIntro();



/*
EVENT LISTENERS
*/

// event listener on start button to call start quiz
quizContainer.addEventListener("click", quizButtonHandler);
quizContainer.addEventListener("click", quizButtonHandler);



