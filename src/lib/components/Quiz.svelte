<script>
    export let levelId;
    export let topic;
  
    let quizzes = [
      {
        question: "Qu'est-ce qu'un espace probabilisé ?",
        options: [
          { text: "Un ensemble de résultats possibles", correct: false },
          { text: "Un triplet $(\\Omega, \\mathcal{F}, \\mathbf{P})$", correct: true },
          { text: "Une fonction de répartition", correct: false },
          { text: "Une mesure de probabilité", correct: false },
        ],
      },
      {
        question: "Quelle propriété doit vérifier une tribu $\\mathcal{F}$ ?",
        options: [
          { text: "Elle doit contenir l'ensemble vide", correct: false },
          { text: "Elle doit être stable par complémentaire", correct: false },
          { text: "Elle doit être stable par union dénombrable", correct: false },
          { text: "Toutes les réponses ci-dessus", correct: true },
        ],
      },
    ];
  
    let currentQuiz = 0;
    let selectedOption = null;
    let score = 0;
  
    function checkAnswer() {
      if (quizzes[currentQuiz].options[selectedOption].correct) {
        score++;
      }
      if (currentQuiz < quizzes.length - 1) {
        currentQuiz++;
        selectedOption = null;
      } else {
        alert(`Quiz terminé! Votre score est ${score}/${quizzes.length}`);
        window.location.href = "/";
      }
    }
  </script>
  
  <div class="m-8 p-8 border border-gray-300 rounded-lg">
    <h2 class="text-2xl font-bold">Quiz: {topic} ({levelId.toUpperCase()})</h2>
    <h3 class="text-xl mt-4">{quizzes[currentQuiz].question}</h3>
    <div class="mt-6">
      {#each quizzes[currentQuiz].options as option, index}
        <div class="mt-2">
          <input
            type="radio"
            name="option"
            bind:group={selectedOption}
            value={index}
            class="mr-2"
          />
          {option.text}
        </div>
      {/each}
    </div>
    <button
      on:click={checkAnswer}
      class="mt-6 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Vérifier
    </button>
  </div>