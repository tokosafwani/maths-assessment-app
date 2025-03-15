// Quiz Logic
function checkAnswers() {
    let score = 0;
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');

    if (q1 && q1.value === "b") score++;
    if (q2 && q2.value === "a") score++;

    const result = `You scored ${score} out of 2.`;
    document.getElementById("quiz-result").innerText = result;
}

// Flashcard Logic
function flipCard(card) {
    card.classList.toggle("flipped");
}

// Exercise Logic
function checkExercise1() {
    const answer = document.getElementById("exercise1-answer").value;
    const result = document.getElementById("exercise1-result");
    if (answer === "0.5" || answer === "1/2") {
        result.innerText = "Correct!";
    } else {
        result.innerText = "Incorrect. The correct answer is 0.5 or 1/2.";
    }
}

function checkExercise2() {
    const answer = document.getElementById("exercise2-answer").value;
    const result = document.getElementById("exercise2-result");
    if (answer === "1/6") {
        result.innerText = "Correct!";
    } else {
        result.innerText = "Incorrect. The correct answer is 1/6.";
    }
}

// Progress Logic
let quizzesCompleted = 0;
let totalScore = 0;

function updateProgress() {
    document.getElementById("quizzes-completed").innerText = quizzesCompleted;
    const average = quizzesCompleted > 0 ? (totalScore / quizzesCompleted) * 100 : 0;
    document.getElementById("average-score").innerText = `${average.toFixed(2)}%`;
}

// Example: Update progress after a quiz
function completeQuiz(score) {
    quizzesCompleted++;
    totalScore += score;
    updateProgress();
}
