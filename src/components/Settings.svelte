<script lang="ts">
	import Icon from '@iconify/svelte';

	import { toggleMenu } from '$lib/state/menu.svelte';
	import { fade, slide } from 'svelte/transition';

	import { theme } from '$lib/state/theme.svelte';
	import { city } from '$lib/state/city.svelte';
	import { searchEngine } from '$lib/state/search.svelte';
	import { pinnedSites } from '$lib/state/sites.svelte';
	import { onMount } from 'svelte';

	const accentColors: string[] = ['red', 'orange', 'purple', 'blue', 'green'];

	let selectedAccent = $derived(theme.accent);

	let inputCity: string = $state(city.selectedCity);

	$effect(() => {
		const value = inputCity;

		const timeout = setTimeout(() => {
			city.selectedCity = value;
		}, 700);
		return () => clearTimeout(timeout);
	});

	$effect(() => {
		theme.accent = selectedAccent;
	});

	onMount(() => {
		const savedCity = localStorage.getItem("city");
		const savedSites = localStorage.getItem('pinnedSites');

		if(savedCity !== null) {
			city.selectedCity = savedCity;
			inputCity = savedCity;
		}

		if (savedSites !== null) {
			pinnedSites.splice(0, pinnedSites.length, ...JSON.parse(savedSites));
		}
	});

	$effect(() => {
		localStorage.setItem("city", inputCity);
		localStorage.setItem("pinnedSites", JSON.stringify(pinnedSites));
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
				{#each accentColors as color}
					<button
						id={color}
						class="color"
						class:selected={selectedAccent === color}
						style={`background-color: var(--${color});`}
						onclick={() => (selectedAccent = color)}
					>
						{#if selectedAccent === color}
							<div transition:fade={{ duration: 500, delay: 0 }}>
								<Icon class="verified" icon="material-symbols:check-rounded"></Icon>
							</div>
						{/if}
					</button>
				{/each}
			</div>
			<h3>Background</h3>
			<div class="background-selector">
				<label class="radio-buttons">
					<input name="color" type="radio" checked />
					Single color
				</label>
				<label class="radio-buttons">
					<input name="color" type="radio" />
					Svg background
				</label>
			</div>
			<h3>Effects(Frosted glass, opacity, blur)</h3>
			<div class="effect-selector">
				<label class="radio-buttons">
					<input name="effect" type="radio" checked />
					None
				</label>
				<label class="radio-buttons">
					<input name="effect" type="radio" />
					Frosted glass
				</label>
			</div>
		</div>
		<div class="search-engine-container">
			<h2>Search engine</h2>
			<div class="search-engine-flexbox">
				<input
					class="text-input"
					placeholder="Search Engine Link"
					bind:value={searchEngine.url}
					title={searchEngine.url}
				/>
			</div>
		</div>
		<div class="pinned-sites">
			<h2>Pinned sites</h2>
			<div class="links">
				{#each pinnedSites as site, i}
					<h3>Site {i + 1}</h3>
					<input
						id="link"
						class="text-input"
						bind:value={site.title}
						placeholder="Title"
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								e.currentTarget.blur();
							}
						}}
					/>
					<input
						id="link"
						class="text-input"
						bind:value={site.link}
						placeholder="Link"
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								e.currentTarget.blur();
							}
						}}
					/>
				{/each}
			</div>
		</div>
		<div class="weather-container">
			<h2>Weather settings</h2>
			<h4>City for weather data</h4>
			<input class="text-input" placeholder="Enter city..." bind:value={inputCity} />
		</div>
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
		padding: 1rem 1rem 1rem 1rem;
		overflow-y: scroll;
	}
	.text-input {
		border: 3px solid var(--accent);
		outline: none;
		width: 80%;
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
		transition: 0.3s ease-in;
	}
	.text-input:focus {
		border: 3px solid var(--primary-text);
		transition: 0.3s ease-in;
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
		margin-top: 1rem;
		color: var(--secondary-text);
	}
	h4 {
		margin-top: 0.5rem;
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
		border: none;
	}
	.selected {
		border: 2px solid var(--primary-text);
		transition: 0.5s;
	}
	:global(.verified) {
		color: var(--primary-text);
		font-size: 1.5rem;
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
	.search-engine-flexbox {
		display: flex;
		align-items: center;
		width: 100%;
		gap: 0.5rem;
	}
	.pinned-sites {
		display: flex;
		flex-direction: column;
		color: var(--primary-text);
	}
	.links {
		display: flex;
		flex-direction: column;
		list-style-type: none;
		gap: 0.5rem;
	}
	#link {
		height: 2rem;
		padding-left: 0.5rem;
	}
	#link-btn {
		height: 2rem;
		width: 2rem;
		margin-left: 0.5rem;
	}
</style>
