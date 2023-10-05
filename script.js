const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon Dioxide"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion(index) {
    const questionText = document.getElementById('question-text');
    const options = document.querySelectorAll('.option');
    
    questionText.textContent = quizQuestions[index].question;

    for (let i = 0; i < options.length; i++) {
        options[i].textContent = quizQuestions[index].options[i];
        options[i].classList.remove('correct', 'incorrect');
    }
}

function checkAnswer(selectedOption) {
    const correctAnswer = quizQuestions[currentQuestionIndex].answer;
    const resultElement = document.getElementById('result');
    const optionElements = document.querySelectorAll('.option');

    if (selectedOption === correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
        resultElement.style.color = "#28a745";
        optionElements.forEach((element) => {
            if (element.textContent === selectedOption) {
                element.classList.add('correct');
            }
        });
    } else {
        resultElement.textContent = "Incorrect!";
        resultElement.style.color = "#dc3545";
        optionElements.forEach((element) => {
            if (element.textContent === selectedOption) {
                element.classList.add('incorrect');
            }
        });
    }

    document.getElementById('score').textContent = `Score: ${score}`;
    disableOptions();
}

function disableOptions() {
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach((element) => {
        element.disabled = true;
    });
}

function enableOptions() {
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach((element) => {
        element.disabled = false;
    });
}

function displayNextQuestion() {
    enableOptions();
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion(currentQuestionIndex);
        document.getElementById('result').textContent = "";
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score}/${quizQuestions.length}</p>`;

    if (score >= 3) {
        quizContainer.innerHTML += '<img src="winner.gif" alt="Winner">';
    } else {
        quizContainer.innerHTML += '<img src="loser.gif" alt="Loser">';
    }
    document.getElementById('score').textContent = "";
    document.getElementById('next-button').style.display = "none";
}

// Event listeners for option buttons and next button
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function () {
        checkAnswer(this.textContent);
        disableOptions();
    });
});

document.getElementById('next-button').addEventListener('click', function () {
    displayNextQuestion();
});

// Start the quiz
displayQuestion(currentQuestionIndex);
