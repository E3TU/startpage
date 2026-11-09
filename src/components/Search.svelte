<script lang="ts">
	import Icon from '@iconify/svelte';
	import { searchEngine } from '$lib/state/search.svelte';

	let searchTerm = $state('');

	let search = $derived(searchEngine.url + encodeURIComponent(searchTerm));

	function handleSubmit(e: Event) {
		e.preventDefault();

		if (searchTerm) {
			window.location.href = search;
		}

		searchTerm = '';
	}
</script>

<div class="search-container">
	<form class="search-form" onsubmit={handleSubmit}>
		<input bind:value={searchTerm} placeholder="Search The Web" class="search" type="text" />
		<button id="search-btn"><Icon icon="material-symbols:search-rounded"></Icon></button>
	</form>
</div>

<style>
	.search-container {
		display: flex;
		flex-direction: row;
		padding-top: 2rem;
		width: 100%;
	}
	.search-form {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 1rem;
	}
	.search {
		background-color: var(--gray);
		border: 2px solid rgba(255, 255, 255, 0.1);
		padding: clamp(0.5rem, 2vw, 1rem) 1rem;
		color: var(--primary-text);
		border-radius: 16px;
		font-size: clamp(0.9rem, 3vw, 1.1rem);
		box-shadow: 0 4px 12px var(--shadow-color);
		outline: none;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
		width: 100%;
		flex: 1;
		height: clamp(3rem, 10vw, 4rem);
	}
	.search::placeholder {
		color: var(--secondary-text);
		font-size: inherit;
	}
	.search:focus {
		border-color: var(--accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent);
	}
	#search-btn {
		width: clamp(3rem, 10vw, 4rem);
		height: clamp(3rem, 10vw, 4rem);
		background-color: var(--accent);
		border: none;
		border-radius: 16px;
		font-size: clamp(1.2rem, 4vw, 1.5rem);
		color: var(--primary-text);
		flex: 0 0 clamp(3rem, 10vw, 4rem);
		cursor: pointer;
		transition:
			transform 0.2s ease,
			background-color 0.2s ease,
			box-shadow 0.2s ease;
		box-shadow: 0 4px 12px var(--shadow-color);
	}
	#search-btn:hover {
		background-color: color-mix(in srgb, var(--accent) 85%, white);
		box-shadow: 0 6px 16px var(--shadow-color);
	}
	#search-btn:active {
		transform: scale(0.96);
	}
	#search-btn:focus-visible {
		outline: 2px solid var(--primary-text);
		outline-offset: 2px;
	}
</style>
