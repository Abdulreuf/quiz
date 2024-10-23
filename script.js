// Selecting elements from the DOM
const startButton = document.getElementById('start-btn');
const quizPage = document.getElementById('quiz-page');
const startPage = document.getElementById('start-page');  // Selecting start page
const questionTitle = document.getElementById('question-title');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultPage = document.getElementById('result-page');
const resultText = document.getElementById('result-text');
const restartButton = document.getElementById('restart-btn');

// Array of questions
const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Rome', correct: false }
        ]
    },
    {
        question: 'Who is the CEO of Tesla?',
        answers: [
            { text: 'Jeff Bezos', correct: false },
            { text: 'Elon Musk', correct: true },
            { text: 'Bill Gates', correct: false },
            { text: 'Mark Zuckerberg', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Mars', correct: true },
            { text: 'Venus', correct: false },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'What is the largest country in the world by land area?',
        answers: [
            { text: 'Russia', correct: true },
            { text: 'China', correct: false },
            { text: 'Canada', correct: false },
            { text: 'United States', correct: false }
        ]
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: [
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Michelangelo', correct: false }
        ]
    }
];

let shuffledQuestions, currentQuestionIndex;
let correctAnswers = 0;

// Start Quiz Event
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startPage.classList.add('hide'); // Hide the start page when the quiz starts
    quizPage.classList.remove('hide'); // Show the quiz page
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // Shuffle questions
    currentQuestionIndex = 0;
    correctAnswers = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionTitle.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(button, isCorrect) {
    if (isCorrect) {
        button.classList.add('correct');
        correctAnswers++;
    } else {
        button.classList.add('wrong');
    }

    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true; // Disable buttons after selecting
        if (btn !== button && btn.dataset.correct === 'true') {
            btn.classList.add('correct'); // Show correct answer
        }
    });

    nextButton.classList.remove('hide');
}

// Next Button Event
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizPage.classList.add('hide');
    resultPage.classList.remove('hide');
    resultText.innerText = `You got ${correctAnswers} out of ${shuffledQuestions.length} correct!`;
}

// Restart Button Event
restartButton.addEventListener('click', () => {
    resultPage.classList.add('hide');
    startPage.classList.remove('hide');
});
