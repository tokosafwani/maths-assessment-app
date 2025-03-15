<script>
    import LevelSelection from '$lib/components/LevelSelection.svelte';
    
    // Sample data for popular quizzes
    const popularQuizzes = [
      { id: 'licence1/probabilites', title: 'Probabilités', level: 'Licence 1', popularity: 245 },
      { id: 'licence2/analyse', title: 'Analyse', level: 'Licence 2', popularity: 198 },
      { id: 'master1/statistiques', title: 'Statistiques', level: 'Master 1', popularity: 176 },
      { id: 'licence3/algebre', title: 'Algèbre', level: 'Licence 3', popularity: 154 },
    ];
  </script>
  
  <div class="container mx-auto">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-6">Bienvenue sur Math Quiz</h1>
      <p class="text-lg mb-4">Testez vos connaissances en mathématiques avec nos quiz interactifs.</p>
    </div>
    
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Quiz Populaires</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each popularQuizzes as quiz}
          <a href="/{quiz.id}" class="block p-4 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors">
            <h3 class="font-bold text-xl mb-2">{quiz.title}</h3>
            <p class="text-teal-700 mb-2">{quiz.level}</p>
            <p class="text-sm text-gray-600">{quiz.popularity} étudiants ont participé</p>
          </a>
        {/each}
      </div>
    </div>
    
     
  </div>