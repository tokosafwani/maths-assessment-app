<script>
	import TopicSelection from '$lib/components/TopicSelection.svelte';
	import { page } from '$app/stores';
	export let data;
</script>

<TopicSelection levelId={$page.params.levelId} />