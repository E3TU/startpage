<script lang="ts">
	import Icon from '@iconify/svelte';

    import { toggleMenu } from '$lib/state/menu.svelte';
	import { fade, slide } from 'svelte/transition';
</script>

<div transition:slide={{ axis: 'x', duration: 500, delay: 100}} class="settings-menu">
	<div class="top-wrapper">
		<button onclick={toggleMenu} class="close-menu-button">
			<Icon class="close-menu-icon" icon="material-symbols:close-rounded"></Icon>
		</button>
		<h1>Settings</h1>
	</div>
</div>

<style>
	.settings-menu {
		position: absolute;
		width: 20rem;
		height: 100vh;
		background-color: var(--gray);
		right: 0;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	.top-wrapper {
		display: flex;
		align-items: center;
		padding-top: 1rem;
		padding-left: 1rem;
		gap: 1rem;
	}
	h1 {
		color: var(--primary-text);
	}
	.close-menu-button {
		background-color: transparent;
		outline: none;
		border: none;
	}
	:global(.close-menu-icon) {
		color: var(--blue);
		font-size: 2rem;
		cursor: pointer;
	}
</style>
