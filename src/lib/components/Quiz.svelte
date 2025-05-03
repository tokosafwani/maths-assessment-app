<script lang="ts">
    import { onMount } from 'svelte';
    export let levelId: string;
    export let topic: string;
  
    interface QuizOption {
      text: string;
      correct: boolean;
    }
  
    interface QuizQuestion {
      question: string;
      options: QuizOption[];
    }
  $: topicDisplayName = '';

    let quizzes: QuizQuestion[] = [];
    let loading = true;
    let error: string | null = null;
  
    let currentQuiz = 0;
    let selectedOption: number | null = null;
    let score = 0;
  
    onMount(async () => {
      try {
     const topicData = await fetch(`/.netlify/functions/topics/byname/${topic}`)
     const topicDataJson = await topicData.json()
     topicDisplayName = topicDataJson.displayName

        const response = await fetch(`/.netlify/functions/quizzes/${levelId}/${topic}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz: ${response.statusText}`);
        }
        const data = await response.json();
        quizzes = data.questions.map((q: {id: number, text: string, options: string[], correctAnswer: number}) => ({
          question: q.text,
          options: q.options.map((text: string, i: number) => ({
            text,
            correct: i === q.correctAnswer
          }))
        }));
        loading = false;
      } catch (err) {
        error = err instanceof Error ? err.message : 'An unknown error occurred';
        loading = false;
      }
    });
  
    function checkAnswer() {
      if (selectedOption !== null && quizzes[currentQuiz].options[selectedOption].correct) {
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
    <h2 class="text-2xl font-bold">Quiz: {topicDisplayName} ({levelId.toUpperCase()})</h2>
    
    {#if loading}
      <p class="mt-4">Chargement du quiz...</p>
    {:else if error}
      <p class="mt-4 text-red-500">Erreur: {error}</p>
    {:else if quizzes.length === 0}
      <p class="mt-4">Aucune question disponible pour ce quiz.</p>
    {:else}
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
        disabled={selectedOption === null}
        class="mt-6 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Vérifier
      </button>
    {/if}
  </div>