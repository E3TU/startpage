<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	import '../app.css';
	import '@fontsource-variable/gabarito/wght.css';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
