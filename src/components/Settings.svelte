<script lang="ts">
	import Icon from '@iconify/svelte';

	import { toggleMenu } from '$lib/state/menu.svelte';
	import { fade, slide } from 'svelte/transition';

	let openMenu: 'menu1' | 'menu2' | null = $state(null);

	function open(menu: 'menu1' | 'menu2') {
		openMenu = menu;
	}
</script>

<div transition:slide={{ axis: 'x', duration: 500, delay: 100 }} class="settings-menu">
	<div class="top-wrapper">
		<button onclick={toggleMenu} class="close-menu-button">
			<Icon class="close-menu-icon" icon="material-symbols:close-rounded"></Icon>
		</button>
		<h1>Settings</h1>
	</div>
	<div class="settings">
		<div class="customization">
			<h2>Customization</h2>
			<h3>Accent color</h3>
			<div class="color-selector">
				<span id="red" class="color"></span>
				<span id="orange" class="color"></span>
				<span id="purple" class="color"></span>
				<span id="blue" class="color"></span>
				<span id="green" class="color"></span>
			</div>
			<h3>Background</h3>
			<div class="background-selector">
				<label class="radio-buttons">
					<input onchange={() => open("menu1")} name="color" type="radio" checked />
					Single color
				</label>
				{#if openMenu === "menu1"}
					<div class="color-selector">
						<span id="red" class="color"></span>
						<span id="orange" class="color"></span>
						<span id="purple" class="color"></span>
						<span id="blue" class="color"></span>
						<span id="green" class="color"></span>
					</div>
				{/if}
				<label class="radio-buttons">
					<input onchange={() => open("menu2")} name="color" type="radio" />
					Svg background
				</label>
				{#if openMenu == "menu2"}
					<div class="color-selector">
						<span id="red" class="color"></span>
						<span id="orange" class="color"></span>
						<span id="purple" class="color"></span>
						<span id="blue" class="color"></span>
						<span id="green" class="color"></span>
					</div>
				{/if}
			</div>
			<h3>Effects(Frosted glass, opacity, blur)</h3>
			<div class="effect-selector">
				<p>Frosted glass</p>
				<p>Opaque</p>
				<p>Neon effectsb</p>
			</div>
		</div>
		<!-- <h2>Search</h2>
		<h2>Weather</h2>
		<h2>Pinned sites</h2> -->
	</div>
</div>

<style>
	.settings-menu {
		display: flex;
		flex-direction: column;
		position: absolute;
		width: 20rem;
		height: 100vh;
		background-color: var(--gray);
		right: 0;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		padding: 1rem 0rem 0rem 1rem;
	}
	.top-wrapper {
		display: flex;
		align-items: center;
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
	h2 {
		margin-top: 1rem;
		color: var(--secondary-text);
	}
	h3 {
		color: var(--secondary-text);
	}
	.customization {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.color-selector {
		display: flex;
		gap: 1rem;
	}
	.color {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		cursor: pointer;
	}
	#red {
		background-color: var(--red);
	}
	#orange {
		background-color: var(--orange);
	}
	#purple {
		background-color: var(--purple);
	}
	#blue {
		background-color: var(--blue);
	}
	#green {
		background-color: var(--green);
	}
	p {
		color: var(--secondary-text);
	}
	.background-selector {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.radio-buttons {
		display: flex;
		align-items: center;
		cursor: pointer;
		gap: 1rem;
		color: var(--secondary-text);
	}
	.radio-buttons input {
		appearance: none;
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		border: 2px solid #888;
		border-radius: 50%;
		display: grid;
		place-content: center;
		margin: 0;
		cursor: pointer;
		position: relative;
	}
	.radio-buttons input::before {
		content: '';
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--green);
		transform: scale(0);
		transition: transform 0.2s ease;
	}

	.radio-buttons input:checked::before {
		transform: scale(1);
	}

	.radio-buttons:hover input {
		border-color: var(--green);
	}

	.radio-buttons input:focus-visible {
		outline: 3px solid var(--green);
		outline-offset: 3px;
	}
</style>
