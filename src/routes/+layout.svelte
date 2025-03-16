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

	// Get current level name for breadcrumb
	let currentLevel = $derived(
		$page.params.levelId ? levels.find(level => level.id === $page.params.levelId)?.name : null
	);
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
							class="absolute top-full right-0 z-10 mt-1 w-48 rounded-md bg-white py-2 text-teal-800 shadow-lg"
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
				 
			</ul>
		</nav>
	</div>
</header>

<!-- Breadcrumb navigation -->
<div class="bg-gray-100 py-2">
	<div class="container mx-auto">
		<nav class="flex" aria-label="Breadcrumb">
			<ol class="inline-flex items-center space-x-1 md:space-x-3">
				<li class="inline-flex items-center">
					<a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-teal-600">
						<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
						</svg>
						Home
					</a>
				</li>
				{#if $page.params.levelId}
					<li>
						<div class="flex items-center">
							<svg class="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
							</svg>
							<a href="/{$page.params.levelId}" class="ml-1 text-sm font-medium text-gray-700 hover:text-teal-600 md:ml-2">
								{currentLevel}
							</a>
						</div>
					</li>
				{/if}
			</ol>
		</nav>
	</div>
</div>

<main class="container mx-auto py-8">
	{@render children()}
</main>

<footer class="mt-8 bg-cyan-50 p-4 text-cyan-800">
	<div class="container mx-auto text-center">
		<p>© 2025 Math Quiz App</p>
	</div>
</footer>
