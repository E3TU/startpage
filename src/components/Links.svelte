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
		grid-template-columns: repeat(5, 1fr);
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
		border-radius: 20px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		cursor: pointer;
		text-decoration: none;
	}
	.item img {
		width: clamp(40px, 10vw, 64px);
		height: clamp(40px, 10vw, 64px);
	}
	.item p {
		font-size: clamp(0.8rem, 2.5vw, 1rem);
	}

	@media (max-width: 480px) {
		.links {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
