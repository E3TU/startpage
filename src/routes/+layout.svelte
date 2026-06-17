<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	import '../app.css';
	import '@fontsource-variable/gabarito/wght.css';

	import { theme } from '$lib/state/theme.svelte';

	$effect(() => {
		document.documentElement.dataset.accent = theme.accent;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
