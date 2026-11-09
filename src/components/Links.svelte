<script lang="ts">
	import { pinnedSites } from '$lib/state/sites.svelte';
</script>

<div class="links">
	{#each pinnedSites as site}
		<a href={site.link} class="item">
			<img
				src="https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url={site.link}&size=64"
				alt="favicon"
				width="64px"
				height="64px"
			/>
			<p>{site.title}</p>
		</a>
	{/each}
</div>

<style>
	.links {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
		gap: 1rem;
	}
	.item {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-direction: column;
		gap: 0.5rem;
		padding-bottom: 1rem;
		color: var(--accent);
		height: clamp(6rem, 18vw, 8rem);
		width: 100%;
		background-color: var(--gray);
		border-radius: 16px;
		box-shadow: 0 4px 12px var(--shadow-color);
		text-decoration: none;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease;
	}
	.item:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 20px var(--shadow-color);
		background-color: color-mix(in srgb, var(--gray) 95%, var(--accent));
	}
	.item:active {
		transform: translateY(-1px) scale(0.98);
	}
	.item:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
	.item img {
		width: clamp(40px, 10vw, 64px);
		height: clamp(40px, 10vw, 64px);
	}
	.item p {
		font-size: clamp(0.8rem, 2.5vw, 1rem);
		font-weight: 500;
		color: var(--primary-text);
	}
</style>
