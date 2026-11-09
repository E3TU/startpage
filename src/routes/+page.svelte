<script lang="ts">
	import Search from '../components/Search.svelte';
	import Clock from '../components/Clock.svelte';
	import Links from '../components/Links.svelte';
	import Weather from '../components/Weather.svelte';
	import Settings from '../components/Settings.svelte';
	import { background } from '$lib/state/background.svelte';

	import Icon from '@iconify/svelte';

	import { toggleMenu, menu } from '$lib/state/menu.svelte';
</script>

<main class="main-container">
	<div class="widget-container">
		<div class="smallest-item">
			<Clock />
		</div>
		<div class="small-item">
			<Weather />
		</div>
		<div class="item">
			<Links />
			<Search />
		</div>
	</div>
	<button class="open-menu" onclick={toggleMenu} aria-label="Settings">
		<Icon class="settings-icon" icon="material-symbols:settings"></Icon>
	</button>
	{#if menu.open}
		<button class="backdrop" onclick={toggleMenu} aria-label="Close settings"></button>
		<Settings />
	{/if}
	<div class="bottom-spacer"></div>

	{#if background.type === 'svg'}
		<div class="wave" aria-hidden="true">
			<svg viewBox="0 0 1440 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="
					M0 100
					C240 180 480 180 720 100
					C960 20 1200 20 1440 100
					V180
					H0
					Z
				"
				/>
			</svg>
		</div>
	{/if}
</main>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 100vh;
	}
	.widget-container {
		display: flex;
		flex-direction: column;
		width: min(50rem, calc(100% - 2rem));
		height: auto;
		margin-top: clamp(4rem, 15vh, 20rem);
		gap: 2rem;
	}
	.smallest-item,
	.small-item,
	.item {
		flex: 0 0 auto;
		width: 100%;
		height: auto;
	}

	@media (min-width: 640px) {
		.widget-container {
			flex-direction: row;
			flex-wrap: wrap;
		}
		.smallest-item {
			flex: 1;
			height: 12rem;
		}
		.small-item {
			flex: 2;
			height: 12rem;
		}
		.item {
			flex: 0 0 100%;
			height: auto;
		}
	}
	:global(.settings-icon) {
		color: var(--primary-text);
		position: absolute;
		right: 2rem;
		top: 2rem;
		font-size: 2rem;
		cursor: pointer;
		transition: ease-in 0.2s;
		filter: drop-shadow(0 2px 4px var(--shadow-color));
	}
	:global(.settings-icon):hover {
		color: var(--accent);
		transform: rotate(30deg);
	}
	:global(.settings-icon):active {
		transform: scale(0.95);
	}
	.open-menu {
		background-color: transparent;
		outline: none;
		border: none;
		z-index: 10;
	}
	.backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.4);
		border: none;
		cursor: default;
		z-index: 20;
	}
	.bottom-spacer {
		flex: 1;
		width: 100%;
	}
	.wave {
		width: 100%;
		height: clamp(80px, 12vw, 180px);
		flex-shrink: 0;
	}

	.wave svg {
		display: block;
		width: 100%;
		height: 100%;
	}
	.wave path {
		fill: var(--accent);
	}
</style>
