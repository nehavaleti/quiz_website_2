const questions = [
  {
    questionId: 1,
    question: "What is JavaScript?",
    optionA: "A markup language",
    optionB: "A programming language",
    optionC: "A styling language",
    optionD: "A database language",
    correctAnswer: 1,
  },
  {
    questionId: 2,
    question: "What does HTML stand for?",
    optionA: "Hyper Text Markup Language",
    optionB: "Home Tool Markup Language",
    optionC: "Hyperlinks and Text Markup Language",
    optionD: "Hyper Tool Markup Language",
    correctAnswer: 0,
  },
  {
    questionId: 3,
    question:
      "Which property is used to change the background color of an element in CSS?",
    optionA: "color",
    optionB: "background-color",
    optionC: "background",
    optionD: "bgcolor",
    correctAnswer: 1,
  },
  {
    questionId: 4,
    question: "What is the purpose of the script tag in HTML?",
    optionA: "To define a JavaScript function",
    optionB: "To link an external JavaScript file",
    optionC: "To style an HTML element",
    optionD: "To create a CSS rule",
    correctAnswer: 1,
  },
  {
    questionId: 5,
    question: "Which of the following is not a JavaScript data type?",
    optionA: "String",
    optionB: "Boolean",
    optionC: "Number",
    optionD: "Array",
    correctAnswer: 3,
  },
  {
    questionId: 6,
    question:
      "Which CSS property is used to control the spacing between lines of text?",
    optionA: "padding",
    optionB: "line-height",
    optionC: "margin",
    optionD: "font-size",
    correctAnswer: 1,
  },
  {
    questionId: 7,
    question: "What is the purpose of the 'class' attribute in HTML?",
    optionA: "To style an HTML element",
    optionB: "To define a JavaScript function",
    optionC: "To link an external CSS file",
    optionD: "To create a CSS rule",
    correctAnswer: 0,
  },
  {
    questionId: 8,
    question: "What does CSS stand for?",
    optionA: "Cascading Style Sheet",
    optionB: "Colorful Style Sheet",
    optionC: "Computer Style Sheet",
    optionD: "Creative Style Sheet",
    correctAnswer: 0,
  },
  {
    questionId: 9,
    question:
      "What is the correct syntax for creating a function in JavaScript?",
    optionA: "function = myFunction()",
    optionB: "function myFunction()",
    optionC: "function:myFunction()",
    optionD: "myFunction() = function",
    correctAnswer: 1,
  },
  {
    questionId: 10,
    question: "Which HTML tag is used to link an external CSS file?",
    optionA: "<link>",
    optionB: "<style>",
    optionC: "<css>",
    optionD: "<script>",
    correctAnswer: 0,
  },
];

//console.log(questions.length);

let index = 0;
let score = 0;

//for timer
var totalTime = 300;
var currentTime = totalTime;
var timerDisplay = document.getElementById("timer");
var timerInterval;
const question_number = document.getElementById("question-id");
const Question = document.getElementById("q");
const option1 = document.getElementById("A");
const option2 = document.getElementById("B");
const option3 = document.getElementById("C");
const option4 = document.getElementById("D");
const radioButtons = document.getElementsByName("option");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  var minutes = Math.floor(currentTime / 60);
  var seconds = currentTime % 60;
  timerDisplay.textContent = formatTime(minutes) + ":" + formatTime(seconds);

  if (currentTime <= 0) {
    clearInterval(timerInterval);
    endQuiz();
    console.log("Time's up!");
  }

  currentTime--;
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

const printQuestions = (questions, index) => {
  question_number.innerText = questions[index].questionId;
  Question.innerHTML = questions[index].question;
  option1.innerText = questions[index].optionA;
  option2.innerText = questions[index].optionB;
  option3.innerText = questions[index].optionC;
  option4.innerText = questions[index].optionD;
};

previousButton.addEventListener("click", (e) => {
  if (index === 0) {
    return;
  }
  index--;
  radioButtons.forEach((i) => {
    i.checked = false;
  });
  printQuestions(questions, index);
  if (index == 9) {
    document.getElementById("next").innerText = "Submit";
  } else {
    document.getElementById("next").innerText = "Next";
  }
});

nextButton.addEventListener("click", (e) => {
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      const selectedOption = parseInt(radioButtons[i].value);
      if (selectedOption === questions[index].correctAnswer) {
        score++;
      }
    }
  }
  index += 1;
  if (index <= 9) {
    radioButtons.forEach((i) => {
      i.checked = false;
    });

    printQuestions(questions, index);
  }
  if (index == 9) {
    document.getElementById("next").innerText = "Submit";
  } else if (index < 9) {
    document.getElementById("next").innerText = "Next";
  }
  if (index == 10) {
    endQuiz();
  }
});

function endQuiz() {
  const result = document.getElementsByTagName("body");
  result[0].innerHTML = `<div class="res"><div class="scor"><h1>You Scored: <span>${score}</span> out of 10</h1></div><div class="res-end"><form method="post"><button type="submit" class="play-again" href="quiz.html"><span class="button-text">Play again!</span></button></form></div></div>`;
}

startTimer();
printQuestions(questions, index);
