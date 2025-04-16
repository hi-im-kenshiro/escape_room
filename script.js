const questions = [
    {
        question: "What color is the sky on a clear day?",
        answers: ["Red", "Blue", "Green", "Yellow"],
        correct: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
        correct: 2
    },
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "What is 10 * 10?",
        answers: ["10", "100", "1000", "20"],
        correct: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Saturn", "Jupiter", "Neptune"],
        correct: 2
    },
    {
        question: "What is the square root of 81?",
        answers: ["7", "8", "9", "10"],
        correct: 2
    },
    {
        question: "Who was the first President of the United States?",
        answers: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
        correct: 2
    },
    {
        question: "What is the boiling point of water in Celsius?",
        answers: ["90", "100", "110", "120"],
        correct: 1
    },
    {
        question: "How many continents are there?",
        answers: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "Who painted the Mona Lisa?", 
        answers: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], 
        correct: 1 
    }
];

let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;
let timer;
let timeLeft = 60;

function startGame() {
    document.getElementById('game-intro').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    resetTimer();
    showQuestion();
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 60;
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
    
    if (timeLeft <= 0) {
        clearInterval(timer);
        handleTimeOut();
    }
}

function handleTimeOut() {
    alert("Time's up! The correct answer was: " + questions[currentQuestion].answers[questions[currentQuestion].correct]);
    nextQuestion();
}

function showQuestion() {
    selectedAnswer = null;
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = `${currentQuestion + 1}. ${question.question}`;
    
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.textContent = answer;
        answerElement.onclick = () => selectAnswer(index);
        answersContainer.appendChild(answerElement);
    });
}

function selectAnswer(index) {
    selectedAnswer = index;
    const answers = document.querySelectorAll('.answer-option');
    
    answers.forEach((answer, i) => {
        answer.style.backgroundColor = i === index ? 'rgba(243, 156, 18, 0.3)' : 'rgba(255, 255, 255, 0.1)';
        answer.style.borderLeft = i === index ? '4px solid #f39c12' : '4px solid transparent';
    });
}

function submitAnswer() {
    if (selectedAnswer === null) {
        alert("Please select an answer!");
        return;
    }

    clearInterval(timer);
    
    const question = questions[currentQuestion];
    const answers = document.querySelectorAll('.answer-option');
    
    // Highlight correct answer
    answers[question.correct].style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
    answers[question.correct].style.borderLeft = '4px solid #2ecc71';
    
    if (selectedAnswer === question.correct) {
        score++;
    } else {
        answers[selectedAnswer].style.backgroundColor = 'rgba(231, 76, 60, 0.5)';
        answers[selectedAnswer].style.borderLeft = '4px solid #e74c3c';
    }
    
    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        resetTimer();
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById('quiz-container').innerHTML = `
        <div class="result-container">
            <h2>Quiz Completed!</h2>
            <p>Your score: ${score}/${questions.length}</p>
            <p>Percentage: ${Math.round((score / questions.length) * 100)}%</p>
            <button onclick="location.reload()">Play Again</button>
        </div>
    `;
}