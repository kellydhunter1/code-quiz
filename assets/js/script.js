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
const quizScore = 0;
let answerBtnId = 0;
let q = 0;
let quizTimer = 60;
let i = 0;

const quizQuestionsArr = [
    // copy this object format for each question
  {question: "Where is the correct place to insert JavaScript in an HTML file?", 
    answer: {
        choice1:"Both the <head> and the <body> section are correct",
          choice2: "The <body> section", /*correct answer*/
          choice3: "the <head> section"
          }
  },
  {question: "How do you display an alert box with the messagee 'Hello World'?", 
  answer: {
      choice1: "msgBox('Hello World')",
        choice2: "alert('Hello WOrld')", /*correct answer*/
        choice3: "Alexa, make an alert box with 'Hello World'"
        }
}
    ];


/*
TIMER FUNCTION
Counts Down from 60
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



// const finishAllQuestions = function() {
//   clearInterval(timeInterval);
//   questionEl.innerHTML = "YOUR HAVE ANSWERED ALL QUIZ QUESTIONS! GAME OVER.";
//   console.log("END OF ARRAY. GAME OVER.");
// setTimeout(quizOver(), 2000);
// };

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
  };



  /*
  QUIZ QUESTIONS FUNCTION
  populates each question
  */
  
let ac = 0;
const createChoicesEl = function() {
  for (let answerNumber = 0; answerNumber < quizQuestionsArr.length-1;) {
    Object.values(quizQuestionsArr[ac].answer).forEach(val => {
      const choiceEl = document.createElement("li");
      choiceEl.className = "answer-choice";

      const choiceBtn = document.createElement("button");
      choiceBtn.className = "choice-button";
      choiceBtn.setAttribute("data-choice-id", answerBtnId);
      answerBtnId++;

      choiceBtn.textContent = val;
      choiceEl.appendChild(choiceBtn);
      answersEl.appendChild(choiceEl); 
    });
    ac++; 
    answerNumber++;
  };
};

  const quizQuestions = function() { 
    let question = quizQuestionsArr[q].question;
    console.log("Here is the Question: ", question);
    questionEl.textContent = question;

    createChoicesEl();

    q++;
    i++;

  };




/*
QUIZ OVER FUNCTION
Ends quiz, shows score, and resets quiz
*/
const quizOver = function() {
  // clear text from game div
  questionEl.innerHTML= "";
  
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
    i = 0;
    q = 0;
    ac = 0;
    quizTimer = 60;
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
  }; 


  
/*
QUIZ BUTTON HANDLER
Controls start button, answer choices, and replay button
*/
const quizButtonHandler = function (event) {
  var targetEl = event.target;

  if (targetEl.matches("#start-btn")) {
    startQuiz();
    console.log("Start Quiz", targetEl);
} if (targetEl.matches("#replay-btn")) {
    quizIntroEl.textContent = "";
    highScoreEl.textContent = "";
    answersEl.textContent = "";
    timerEl.innterHTML = "";
    quizIntro();
  console.log("Try Again", targetEl);
} if (targetEl.matches(".choice-button")) {
    answersEl.innerHTML = "";
     if (i == quizQuestionsArr.length) {
      questionEl.innerHTML = "YOUR HAVE ANSWERED ALL QUIZ QUESTIONS! GAME OVER.";
      console.log("END OF ARRAY. GAME OVER.");
      quizTimer = 2;
    } else {
      quizQuestions();
      console.log("Next Question",targetEl);
    }
  }
};



// STARTS QUIZ
quizIntro();



/*
EVENT LISTENERS
*/

// event listener on start button to call start quiz
quizContainer.addEventListener("click", quizButtonHandler);
// // event listener on answer selection to bring the next question 
// quizQuestionsEl.addEventListener("click", quizButtonHandler);
// // event listener on try again to start quiz intro
// highScoreEl.addEventListener("click", quizButtonHandler);
// // event listener for quesation clicks to


// const quizContainer = document.querySelector("#quiz-container");
// const quizIntroEl = document.querySelector("#quiz-intro");
// const quizQuestionsEl = document.querySelector("#quiz-questions");
// const highScoreEl = document.querySelector("#high-score");
// const startBtn = document.querySelector("#start-btn");
// const timerEl = document.querySelector("#timer");
// const questionEl = document.querySelector("#question");
// const answersEl = document.querySelector("#answer-choices");
// const answerBtn = document.querySelector(".choice-button");
// const answerResponseEl = document.querySelector("#answer-response");
// const quizScore = 0;
// let answerBtnId = 0;
// let quizTimer = 60;




// const quizQuestionsArr = [
//   // copy this object format for each question
// {question: "Where is the correct place to insert JavaScript in an HTML file?", 
//   answer: {
//       choice1:"Both the <head> and the <body> section are correct",
//         choice2: "The <body> section", /*correct answer*/
//         choice3: "the <head> section"
//         }
// },
// {question: "How do you display an alert box with the messagee 'Hello World'?", 
// answer: {
//     choice1: "msgBox('Hello World')",
//       choice2: "alert('Hello WOrld')", /*correct answer*/
//       choice3: "Alexa, make an alert box with 'Hello World'"
//       }
//   }
//   ];
//   // {question: "You have answered all quiz questions", 
//   // answer: {
//   //     choice1: "Click here to end quiz",
//   //       }
//   // }


// /*
// TIMER FUNCTION
// Counts Down from 60
// */

// function countdown() {
//   // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
//   var timeInterval = setInterval(function() {
//     // As long as the `quizTimer` is greater than 1
//     if (quizTimer > 1) {
//       // Set the `textContent` of `timerEl` to show the remaining seconds
//       timerEl.textContent = quizTimer + ' seconds remaining';
//       // Decrement `quizTimer` by 1
//       quizTimer--;
//     } else if (quizTimer === 1) {
//       // When `quizTimer` is equal to 1, rename to 'second' instead of 'seconds'
//       timerEl.textContent = quizTimer + ' second remaining';
//       quizTimer--;
//     } else {
//       // Once `quizTimer` gets to 0, set `timerEl` to an empty string
//       timerEl.textContent = "TIMES UP!";
//       // Use `clearInterval()` to stop the timer
//       clearInterval(timeInterval);
//       // Call the `gameOver()` function
//       quizOver();
//     }
//   }, 1000);
// };



// // const finishAllQuestions = function() {
// //   clearInterval(timeInterval);
// //   questionEl.innerHTML = "YOUR HAVE ANSWERED ALL QUIZ QUESTIONS! GAME OVER.";
// //   console.log("END OF ARRAY. GAME OVER.");
// // setTimeout(quizOver(), 2000);
// // };

// /*
// QUIZ INTRO FUNCTION
// Creates div for directions and start button
// */
// const quizIntro = function () {
// // if buttons are on the page, skip create div, form, and button
//   // creates div and adds directions
//   let quizDirections = document.createElement("h2");  
//     quizDirections.className="directions";
//     quizDirections.textContent= "Answer as many questions as you can in 1 minute. If you get a question wrong, it subtracts 5 seconds from your timer!";
 
//     // creates button
//   let startQuizBtn = document.createElement("button");
//       startQuizBtn.className = "start-btn";
//       startQuizBtn.setAttribute('id', 'start-btn');
//       // adds button text
//       startQuizBtn.textContent = "START QUIZ";

//     // add directions to div
//     quizIntroEl.appendChild(quizDirections);
//     // add button to div
//     quizIntroEl.appendChild(startQuizBtn);
//   };



//   /*
//   QUIZ QUESTIONS FUNCTION
//   populates each question
//   */
// let ac = 0;
// const createChoicesEl = function() {
//   for (let answerNumber = 0; answerNumber < quizQuestionsArr.length-1;) {
//     Object.values(quizQuestionsArr[ac].answer).forEach(val => {
//       const choiceEl = document.createElement("li");
//       choiceEl.className = "answer-choice";

//       const choiceBtn = document.createElement("button");
//       choiceBtn.className = "choice-button";
//       choiceBtn.setAttribute("data-choice-id", answerBtnId);
//       answerBtnId++;

//       choiceBtn.textContent = val;
//       choiceEl.appendChild(choiceBtn);
//       answersEl.appendChild(choiceEl); 
//     });
//     ac++; 
//     answerNumber++;
//   };
// };


//   let q = 0;
//   const quizQuestions = function() { 
//     for (let questionNumber = 0; questionNumber < quizQuestionsArr.length-1;) {
//     let question = quizQuestionsArr[q].question;
//     console.log("Here is the Question: ", question);
//     questionEl.innerHTML = question;

//     createChoicesEl();
//     };
//     questionNumber++;
//     q++;
//   };




// /*
// QUIZ OVER FUNCTION
// Ends quiz, shows score, and resets quiz
// */
// const quizOver = function() {
//   // clear text from game div
//   questionEl.innerHTML= "";
  
//   // create new high score text
//   let highScoreText = document.createElement("h2");
//     highScoreText.textContent = "I WONDER WHAT THE HIGH SCORE WILL BE?!";

//    // creates play again button
//   let playAgainBtn = document.createElement("button");
//     // adds button text
//     playAgainBtn.textContent = "Try Again";
//     playAgainBtn.setAttribute('id', 'replay-btn');

//   // add button to div
//     highScoreEl.appendChild(highScoreText);
//     highScoreEl.appendChild(playAgainBtn);
//     answersEl.textContent = "";
//     questionEl.textContent = "";
  
//   // reset questions and timer
//     i = 0;
//     q = 0;
//     ac = 0;
//     quizTimer = 60;
//   };



// /*
// STARTS QUIZ
// timer starts, questions populate, keeps track of correct answers
// */
// const startQuiz = function() {
//   // clear out quiz intro from the div
//   quizIntroEl.textContent = "";
//   // start timer
//   countdown();
//   quizQuestions();
//   }; 


  
// /*
// QUIZ BUTTON HANDLER
// Controls start button, answer choices, and replay button
// */
// let i = 0;
// const quizButtonHandler = function (event) {
//   var targetEl = event.target;

//   if (targetEl.matches("#start-btn")) {
//     startQuiz();
//     console.log("Start Quiz", targetEl);
// } if (targetEl.matches("#replay-btn")) {
//     quizIntroEl.textContent = "";
//     highScoreEl.textContent = "";
//     answersEl.textContent = "";
//     timerEl.innterHTML = "";
//     quizIntro();
//   console.log("Try Again", targetEl);
// } if (targetEl.matches(".choice-button")) {
//     answersEl.textContent = "";
//     quizQuestions();
//     console.log("Next Question",targetEl);
//   if (i == quizQuestionsArr.length-1) {
//       questionEl.innerHTML = "YOUR HAVE ANSWERED ALL QUIZ QUESTIONS! GAME OVER.";
//       console.log("END OF ARRAY. GAME OVER.");
//       quizTimer = 2;
//     }
//   }
// };



// // STARTS QUIZ
// quizIntro();



// /*
// EVENT LISTENERS
// */

// // event listener on start button to call start quiz
// quizContainer.addEventListener("click", quizButtonHandler);
// // // event listener on answer selection to bring the next question 
// // quizQuestionsEl.addEventListener("click", quizButtonHandler);
// // // event listener on try again to start quiz intro
// // highScoreEl.addEventListener("click", quizButtonHandler);
// // // event listener for quesation clicks to