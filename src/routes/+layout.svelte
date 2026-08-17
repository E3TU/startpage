<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	import '../app.css';
	import '@fontsource-variable/gabarito/wght.css';

	import { theme } from '$lib/state/theme.svelte';
	import { city } from '$lib/state/city.svelte';
	import { searchEngine } from '$lib/state/search.svelte';
	import { pinnedSites } from '$lib/state/sites.svelte';
	import { background } from '$lib/state/background.svelte';

	let { children } = $props();

	let loaded = $state(false);

	onMount(() => {
		const savedCity = localStorage.getItem('city');
		const savedSearchEngine = localStorage.getItem('searchEngine');
		const savedSites = localStorage.getItem('pinnedSites');
		const savedAccentColor = localStorage.getItem('accentColor');
		const savedBackground = localStorage.getItem('background');

		if (savedBackground === 'color' || savedBackground === 'svg') {
			background.type = savedBackground;
		}

		if (savedCity !== null) {
			city.selectedCity = savedCity;
		}

		if (savedSearchEngine !== null) {
			searchEngine.url = savedSearchEngine;
		}

		if (savedSites !== null) {
			try {
				const sites = JSON.parse(savedSites);

				if (Array.isArray(sites)) {
					pinnedSites.splice(0, pinnedSites.length, ...sites);
				}
			} catch (error) {
				console.error('Failed to load pinned sites:', error);
			}
		}

		if (savedAccentColor !== null) {
			theme.accent = savedAccentColor;
		}

		loaded = true;
	});

	$effect(() => {
		if (!loaded) return;

		localStorage.setItem('city', city.selectedCity);
		localStorage.setItem('searchEngine', searchEngine.url);
		localStorage.setItem('pinnedSites', JSON.stringify(pinnedSites));
		localStorage.setItem('accentColor', theme.accent);
		localStorage.setItem('background', background.type);
	});

	// Apply accent color globally
	$effect(() => {
		document.documentElement.dataset.accent = theme.accent;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
