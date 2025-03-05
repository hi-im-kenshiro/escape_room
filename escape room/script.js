const levels = [
    {
        question: "What is 2 + 2?",
        answer: "4"
    },
    {
        question: "What color is the sky on a clear day?",
        answer: "blue"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answer: "Shakespeare"
    },
    {
        question: "What is the capital of France?",
        answer: "Paris"
    },
    {
        question: "What is 10 * 10?",
        answer: "100"
    },
    {
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter"
    },
    {
        question: "What is the square root of 81?",
        answer: "9"
    },
    {
        question: "Who was the first President of the United States?",
        answer: "George Washington"
    },
    {
        question: "What is the boiling point of water in Celsius?",
        answer: "100"
    },
    {
        question: "How many continents are there?",
        answer: "7"
    }
];

let currentLevel = 0;

const levelNumber = document.getElementById('level-number');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const messageElement = document.getElementById('message');
const submitButton = document.getElementById('submit-btn');

function loadQuestion(level) {
    questionElement.textContent = levels[level].question;
    answerInput.value = '';
    messageElement.textContent = '';
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = levels[currentLevel].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        currentLevel++;
        if (currentLevel < levels.length) {
            levelNumber.textContent = currentLevel + 1;
            loadQuestion(currentLevel);
        } else {
            messageElement.textContent = "Congratulations! You've completed all the levels!";
            submitButton.disabled = true;
        }
    } else {
        messageElement.textContent = "Incorrect answer. Try again!";
    }
}

submitButton.addEventListener('click', checkAnswer);

// Initialize the quiz
loadQuestion(currentLevel);