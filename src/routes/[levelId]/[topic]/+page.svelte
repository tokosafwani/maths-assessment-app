<script>
    import { page } from '$app/stores';
    import Quiz from '$lib/components/Quiz.svelte';
    export let data;
  </script>
  
  <Quiz levelId={$page.params.levelId} topic={$page.params.topic} />