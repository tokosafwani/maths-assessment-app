<script>
    export let levelId;
  
    const topics = {
      licence1: ["Algèbre", "Calcul", "Probabilités"],
      licence2: ["Algèbre Linéaire", "Analyse", "Statistiques"],
      licence3: ["Espaces Probabilisés", "Processus Stochastiques", "Théorie des Graphes"],
      master1: ["Optimisation", "Théorie des Nombres", "Analyse Fonctionnelle"],
      master2: ["Topologie", "Géométrie Algébrique", "Théorie des Catégories"],
    };
  </script>
  
  <div class="flex flex-col gap-4 m-8">
    <h2 class="text-2xl font-bold">Sélectionnez un sujet pour {levelId.toUpperCase()}</h2>
    {#each topics[levelId] as topic}
      <a
        href={`/${levelId}/${topic}`}
        class="p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600"
      >
        {topic}
      </a>
    {/each}
  </div>