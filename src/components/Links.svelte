<script lang="ts">
	import { pinnedSites } from '$lib/state/sites.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const savedSites = localStorage.getItem('pinnedSites');

		if (savedSites !== null) {
			pinnedSites.splice(0, pinnedSites.length, ...JSON.parse(savedSites));
		}
	});
</script>

<div class="links">
	{#each pinnedSites as site}
		{#if site.title && site.link}
			<a href={site.link} class="item">
				<img
					src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url={site.link}&size=64"
					alt="favicon"
					width="64px"
					height="64px"
				/>
				<p>{site.title}</p>
			</a>
		{/if}
	{/each}
</div>

<style>
	.links {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.item {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-direction: column;
		gap: 0.5rem;
		padding-bottom: 1rem;
		color: var(--accent);
		height: 8rem;
		width: 8rem;
		background-color: var(--gray);
		border-radius: 20px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		cursor: pointer;
		text-decoration: none;
	}
</style>
