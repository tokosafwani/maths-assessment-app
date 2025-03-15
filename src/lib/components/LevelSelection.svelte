<script>
    const levels = [
      { id: "licence1", name: "Licence 1" },
      { id: "licence2", name: "Licence 2" },
      { id: "licence3", name: "Licence 3" },
      { id: "master1", name: "Master 1" },
      { id: "master2", name: "Master 2" },
    ];
  </script>
  
  <div class="flex flex-col gap-4 m-8">
    <h2 class="text-2xl font-bold">Sélectionnez votre niveau</h2>
    {#each levels as level}
      <a
        href={`/${level.id}`}
        class="p-4 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600"
      >
        {level.name}
      </a>
    {/each}
  </div>