<script lang="ts">
    import { onMount } from 'svelte';
    export let levelId: string;
  
    interface Topic {
      name: string;
      displayName: string;
      level: string;
    }
  
    let topics: Topic[] = [];
    let loading = true;
    let error = false;
  
    async function fetchTopics() {
      try {
        // Fetch topics from the Netlify function
        const response = await fetch(`/.netlify/functions/topics`);
        if (!response.ok) {
          throw new Error(`Failed to fetch topics: ${response.status}`);
        }
        const data = await response.json();
        topics = data;
        loading = false;
      } catch (err) {
        console.error('Error fetching topics:', err);
        error = true;
        loading = false;
      }
    }
  
    // Fetch topics when component mounts
    onMount(() => {
      fetchTopics();
    });
    
    // Filter topics by the current level
    $: levelTopics = topics.filter(topic => topic.level === levelId);
  </script>
  
  <div class="flex flex-col gap-4 m-8">
    <h2 class="text-2xl font-bold">Sélectionnez un sujet pour {levelId.replace(/^\w/, c => c.toUpperCase())}</h2>
    
    {#if loading}
      <div class="text-center p-4">
        <p>Chargement des sujets...</p>
      </div>
    {:else if error}
      <div class="text-center p-4 text-red-600">
        <p>Erreur lors du chargement des sujets. Veuillez réessayer.</p>
      </div>
    {:else if levelTopics.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each levelTopics as topicItem}
          <a
            href={`/${levelId}/${topicItem.name}`}
            class="p-4 bg-teal-600 text-white rounded-lg text-center hover:bg-teal-700 transition-colors"
          >
            {topicItem.displayName}
          </a>
        {/each}
      </div>
    {:else}
      <div class="text-center p-4">
        <p>Aucun sujet disponible pour ce niveau.</p>
      </div>
    {/if}
  </div>