// Quiz Logic
function checkAnswers() {
    let score = 0;
    const correctAnswers = {
        q1: "b", q2: "d", q3: "a", q4: "b", q5: "b",
        q6: "b", q7: "a", q8: "a", q9: "a", q10: "a",
        q11: "a", q12: "a" // Add more correct answers as needed
    };

    for (let i = 1; i <= 12; i++) { // Update the loop range as you add more quizzes
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === correctAnswers[`q${i}`]) {
            score++;
        }
    }

    const result = `Vous avez obtenu ${score} sur 12.`;
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
