<script>
    export let progress = {};
  </script>
  
  <div class="m-8 p-8 border border-gray-300 rounded-lg">
    <h2 class="text-2xl font-bold">Votre Progrès</h2>
    {#each Object.entries(progress) as [level, topics]}
      <div class="mt-4">
        <h3 class="text-xl font-semibold">{level.toUpperCase()}</h3>
        {#each Object.entries(topics) as [topic, score]}
          <p class="mt-2">{topic}: {score}%</p>
        {/each}
      </div>
    {/each}
  </div>