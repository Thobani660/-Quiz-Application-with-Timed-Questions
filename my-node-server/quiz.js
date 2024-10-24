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
  {
    question: "What is the largest planet in our solar system?",
    answers: { a: "Earth", b: "Mars", c: "Jupiter", d: "Saturn" },
    correct: "c"
  },
  {
    question: "What is the smallest prime number?",
    answers: { a: "1", b: "2", c: "3", d: "5" },
    correct: "b"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: { a: "Oxygen", b: "Gold", c: "Osmium", d: "Silver" },
    correct: "a"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: { a: "Mark Twain", b: "Jane Austen", c: "William Shakespeare", d: "Charles Dickens" },
    correct: "c"
  },
  {
    question: "What is the capital of Japan?",
    answers: { a: "Seoul", b: "Beijing", c: "Tokyo", d: "Bangkok" },
    correct: "c"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: { a: "Oxygen", b: "Nitrogen", c: "Carbon Dioxide", d: "Hydrogen" },
    correct: "c"
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: { a: "Atlantic Ocean", b: "Indian Ocean", c: "Arctic Ocean", d: "Pacific Ocean" },
    correct: "d"
  },
  {
    question: "What year did the Titanic sink?",
    answers: { a: "1905", b: "1912", c: "1915", d: "1920" },
    correct: "b"
  },
  {
    question: "Which continent is known as the 'Dark Continent'?",
    answers: { a: "Asia", b: "Africa", c: "Australia", d: "South America" },
    correct: "b"
  }
];

let currentQuestion = 0;
let score = 0;
let totalQuizTime = 100;
let questionTimeLimit = 10;

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
