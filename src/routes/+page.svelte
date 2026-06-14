<script lang="ts">
	import Search from '../components/Search.svelte';
	import Clock from '../components/Clock.svelte';
	import Links from '../components/Links.svelte';
	import Weather from '../components/Weather.svelte';
	import Settings from '../components/Settings.svelte';

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
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		height: auto;
	}
	.widget-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 50rem;
		height: auto;
		overflow: hidden;
		margin-top: 20rem;
		gap: 3rem;
	}
	.smallest-item {
		flex: 1;
		height: auto;
	}
	.small-item {
		flex: 2;
		height: auto;
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
		color: var(--green);
		transition: ease-in 0.5s;
	}
	.open-menu {
		background-color: transparent;
		outline: none;
		border: none;
	}
</style>
