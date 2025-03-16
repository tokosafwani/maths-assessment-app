<script lang="ts">
    import { onMount } from 'svelte';
    
    let popularQuizzes: any[] = [];
    let loading = true;
    let error: string | null = null;
    
    onMount(async () => {
      try {
        const response = await fetch('/.netlify/functions/popular-quizzes?level=licence3');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch popular quizzes: ${response.statusText}`);
        }
        popularQuizzes = (await response.json()).quizzes;
        loading = false;
      } catch (err) {
        error = err instanceof Error ? err.message : 'An unknown error occurred';
        loading = false;
      }
    });
  </script>
  
  <div class="container mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-6">Bienvenue sur Math Quiz</h1>
      <p class="text-lg mb-4">Testez vos connaissances en mathématiques avec nos quiz interactifs.</p>
    </div>
    
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Quiz Populaires</h2>
      {#if loading}
        <p>Chargement des quiz populaires...</p>
      {:else if error}
        <p class="text-red-500">Erreur: {error}</p>
      {:else if popularQuizzes.length === 0}
        <p>Aucun quiz populaire disponible pour le moment.</p>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {#each popularQuizzes as quiz}
            <a href="/{quiz.id}" class="block p-4 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors">
              <h3 class="font-bold text-xl mb-2">{quiz.title}</h3>
              <p class="text-teal-700 mb-2">{quiz.level}</p>
              <p class="text-sm text-gray-600">{quiz.popularity} étudiants ont participé</p>
            </a>
          {/each}
        </div>
      {/if}
    </div>
    
     
  </div>