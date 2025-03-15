<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let { children } = $props();

	// Define available levels for the dropdown
	const levels = [
		{ id: 'licence1', name: 'Licence 1' },
		{ id: 'licence2', name: 'Licence 2' },
		{ id: 'licence3', name: 'Licence 3' },
		{ id: 'master1', name: 'Master 1' },
		{ id: 'master2', name: 'Master 2' }
	];

	let showQuizMenu = $state(false);

	// Close menu when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const menu = document.getElementById('quiz-menu');
		const button = document.getElementById('quiz-button');

		if (
			showQuizMenu &&
			menu &&
			button &&
			!menu.contains(event.target as Node) &&
			!button.contains(event.target as Node)
		) {
			showQuizMenu = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<header class="bg-teal-600 p-4 text-white">
	<div class="container mx-auto flex items-center justify-between">
		<a href="/" class="text-2xl font-bold">Math Quiz</a>
		<nav>
			<ul class="flex space-x-4">
				<li><a href="/" class="hover:text-teal-100 hover:underline">Home</a></li>
				<li class="relative">
					<button
						id="quiz-button"
						onclick={() => showQuizMenu = !showQuizMenu}
						class="flex items-center hover:text-teal-100 hover:underline"
					>
						Quiz <span class="ml-1">▼</span>
					</button>
					{#if showQuizMenu}
						<div
							id="quiz-menu"
							class="absolute top-full left-0 z-10 mt-1 w-48 rounded-md bg-white py-2 text-teal-800 shadow-lg"
						>
							{#each levels as level}
								<a
									href="/{level.id}"
									class="block px-4 py-2 hover:bg-teal-100"
									onclick={() => (showQuizMenu = false)}
								>
									{level.name}
								</a>
							{/each}
						</div>
					{/if}
				</li>
				{#if $page.params.levelId}
					<li>
						<a href="/{$page.params.levelId}" class="hover:text-teal-100 hover:underline">Topics</a>
					</li>
				{/if}
			</ul>
		</nav>
	</div>
</header>

<main class="container mx-auto py-8">
	{@render children()}
</main>

<footer class="mt-8 bg-cyan-50 p-4 text-cyan-800">
	<div class="container mx-auto text-center">
		<p>© 2025 Math Quiz App</p>
	</div>
</footer>
