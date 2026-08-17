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

<div class="main-container">
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
	<button class="open-menu" onclick={toggleMenu}>
		<Icon class="settings-icon" icon="material-symbols:settings"></Icon>
	</button>
	{#if menu.open}
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
</div>

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
		flex-direction: row;
		flex-wrap: wrap;
		width: min(50rem, calc(100% - 2rem));
		height: auto;
		margin-top: 20rem;
		gap: 2rem;
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
	:global(.settings-icon) {
		color: var(--primary-text);
		position: absolute;
		right: 2rem;
		top: 2rem;
		font-size: 2rem;
		cursor: pointer;
		transition: ease-in 0.5s;
	}
	:global(.settings-icon):hover {
		color: var(--accent);
		transition: ease-in 0.5s;
	}
	.open-menu {
		background-color: transparent;
		outline: none;
		border: none;
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
