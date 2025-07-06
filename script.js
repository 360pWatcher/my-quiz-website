document.addEventListener('DOMContentLoaded', function() {
    // --- THIS IS THE QUIZ DATA ---
    // To change the quiz, you only need to edit this section.
    const quizData = [
        {
            question: "What is the capital of France?",
            answers: {
                a: "Berlin",
                b: "Madrid",
                c: "Paris"
            },
            correctAnswer: "c"
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: {
                a: "Mars",
                b: "Jupiter",
                c: "Venus"
            },
            correctAnswer: "a"
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: {
                a: "Atlantic",
                b: "Pacific",
                c: "Indian"
            },
            correctAnswer: "b"
        }
    ];
    // --- END OF QUIZ DATA ---


    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer = document.getElementById('results-container');
    const submitButton = document.getElementById('submit-button');

    function buildQuiz() {
        const output = [];
        quizData.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question-block">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        });
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        quizData.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
            }
        });

        resultsContainer.innerHTML = `You got ${numCorrect} out of ${quizData.length} correct!`;
    }

    buildQuiz();
    submitButton.addEventListener('click', showResults);
});
