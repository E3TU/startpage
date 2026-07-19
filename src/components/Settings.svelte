<script lang="ts">
	import Icon from '@iconify/svelte';

	import { toggleMenu } from '$lib/state/menu.svelte';
	import { fade, slide } from 'svelte/transition';

	import { theme } from '$lib/state/theme.svelte';

	let openMenu: 'menu1' | 'menu2' | null = $state('menu1');

	function open(menu: 'menu1' | 'menu2') {
		openMenu = menu;
	}

	const colors: string[] = ['red', 'orange', 'purple', 'blue', 'green'];

	let selected = $state({
		accent: theme.accent,
		background: theme.accent,
		svg: theme.accent
	});
</script>

<div transition:slide={{ axis: 'x', duration: 300, delay: 100 }} class="settings-menu">
	<div class="top-wrapper">
		<button onclick={toggleMenu} class="close-menu-button">
			<Icon class="close-menu-icon" icon="material-symbols:close-rounded"></Icon>
		</button>
		<h1>Settings</h1>
	</div>
	<div class="settings">
		<div class="customization-container">
			<h2>Customization</h2>
			<h3>Accent color</h3>
			<div class="color-selector">
				{#each colors as color}
					<a
						id={color}
						class="color"
						class:selected={selected.accent === color}
						onclick={() => (selected.accent = color)}
					>
						{#if selected.accent === color}
							<div transition:fade={{ duration: 500, delay: 0 }}>
								<Icon class="verified" icon="material-symbols:check-rounded"></Icon>
							</div>
						{/if}
					</a>
				{/each}
			</div>
			<h3>Background</h3>
			<div class="background-selector">
				<label class="radio-buttons">
					<input onchange={() => open('menu1')} name="color" type="radio" checked />
					Single color
				</label>
				{#if openMenu === 'menu1'}
					<div class="color-selector">
						{#each colors as color}
							<a
								id={color}
								class="color"
								class:selected={selected.background === color}
								onclick={() => (selected.background = color)}
							>
								{#if selected.background === color}
									<div transition:fade={{ duration: 500, delay: 0 }}>
										<Icon class="verified" icon="material-symbols:check-rounded"></Icon>
									</div>
								{/if}
							</a>
						{/each}
					</div>
				{/if}
				<label class="radio-buttons">
					<input onchange={() => open('menu2')} name="color" type="radio" />
					Svg background
				</label>
				{#if openMenu == 'menu2'}
					<div class="color-selector">
						{#each colors as color}
							<a
								id={color}
								class="color"
								class:selected={selected.svg === color}
								onclick={() => (selected.svg = color)}
							>
								{#if selected.svg === color}
									<div transition:fade={{ duration: 500, delay: 0 }}>
										<Icon class="verified" icon="material-symbols:check-rounded"></Icon>
									</div>
								{/if}
							</a>
						{/each}
					</div>
				{/if}
			</div>
			<h3>Effects(Frosted glass, opacity, blur)</h3>
			<div class="effect-selector">
				<label class="radio-buttons">
					<input name="effect" type="radio" checked />
					Frosted glass
				</label>
				<label class="radio-buttons">
					<input name="effect" type="radio" checked />
					Opaque
				</label>
				<label class="radio-buttons">
					<input name="effect" type="radio" checked />
					Neon effects
				</label>
			</div>
		</div>
		<div class="search-engine-container">
			<h2>Search engine</h2>
			<input class="search-engine" placeholder="Search Engine Link" />
		</div>
		<h2>Pinned sites</h2>
		<h2>Weather settings</h2>
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
		padding: 1rem 1rem 0rem 1rem;
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
		color: var(--accent);
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
	.customization-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.color-selector {
		display: flex;
		gap: 1rem;
	}
	.color {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		cursor: pointer;
		transition: 0.5s;
	}
	.selected {
		border: 2px solid var(--primary-text);
		transition: 0.5s;
	}
	:global(.verified) {
		color: var(--primary-text);
		font-size: 1.5rem;
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
		background: var(--accent);
		transform: scale(0);
		transition: transform 0.2s ease;
	}

	.radio-buttons input:checked::before {
		transform: scale(1);
	}

	.radio-buttons:hover input {
		border-color: var(--accent);
	}

	.radio-buttons input:focus-visible {
		outline: 3px solid var(--accent);
		outline-offset: 3px;
	}
	.effect-selector {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.search-engine {
		border: 3px solid var(--accent);
		outline: none;
		width: 100%;
		height: 2.5rem;
		border-radius: 30px;
		background-color: var(--bg-color);
		color: var(--primary-text);
		font-size: 1rem;
		padding-left: 1rem;
		margin-top: 0.5rem;
		box-shadow:
			rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
			rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
		transition: 0.5s ease-in;
	}
	.search-engine:focus {
		border: 3px solid var(--primary-text);
		transition: 0.5s ease-in;
	}
</style>
