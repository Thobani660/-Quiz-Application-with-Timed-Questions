const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  {
    question: "What is the capital of France?",
    answers: { a: "Paris", b: "London", c: "Berlin", d: "Madrid" },
    correct: "a"
  },
 
];

let currentQuestion = 0;
let score = 0;
let totalQuizTime = 100; // in seconds
let questionTimeLimit = 10; // in seconds

function askQuestion() {
  const { question, answers } = questions[currentQuestion];
  
  console.log(`Question ${currentQuestion + 1}: ${question}`);
  for (const [key, answer] of Object.entries(answers)) {
    console.log(`${key.toUpperCase()}: ${answer}`);
  }

  let remainingTime = questionTimeLimit;
  const interval = setInterval(() => {
    remainingTime--;
    console.log(`Remaining time: ${remainingTime}s`);
    if (remainingTime <= 0) {
      clearInterval(interval);
      console.log("Time's up! Moving to the next question.");
      currentQuestion++;
      if (currentQuestion < questions.length) {
        askQuestion();
      } else {
        endQuiz();
      }
    }
  }, 1000);

  rl.question('Your answer: ', (answer) => {
    clearInterval(interval);
    if (answer.toLowerCase() === questions[currentQuestion].correct) {
      score++;
      console.log("Correct!");
    } else {
      console.log("Incorrect!");
    }
    
    currentQuestion++;
    if (currentQuestion < questions.length) {
      askQuestion();
    } else {
      endQuiz();
    }
  });
}

function startQuiz() {
  console.log("Quiz started! You have 100 seconds to complete.");
  
  // Overall quiz timer
  setTimeout(() => {
    console.log("Quiz time is up!");
    endQuiz();
  }, totalQuizTime * 1000);

  askQuestion();
}

function endQuiz() {
  console.log(`Quiz over! Your final score is ${score}/${questions.length}.`);
  rl.close();
}

startQuiz();
