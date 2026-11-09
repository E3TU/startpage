<script lang="ts">
	import Icon from '@iconify/svelte';
	import { fade, slide } from 'svelte/transition';

	import { toggleMenu } from '$lib/state/menu.svelte';
	import { theme } from '$lib/state/theme.svelte';
	import { city } from '$lib/state/city.svelte';
	import { searchEngine } from '$lib/state/search.svelte';
	import { pinnedSites } from '$lib/state/sites.svelte';
	import { background } from '$lib/state/background.svelte';

	const accentColors: string[] = ['red', 'orange', 'purple', 'blue', 'green'];

	let inputCity = $state(city.selectedCity);
	let editSearchEngine = $state(searchEngine.url);

	let editTitles = $state(pinnedSites.map((site) => site.title));

	let editLinks = $state(pinnedSites.map((site) => site.link));

	function saveCity() {
		const value = inputCity.trim();

		if (value !== '') {
			city.selectedCity = value;
		} else {
			inputCity = city.selectedCity;
		}
	}

	function saveSearchEngine() {
		const value = editSearchEngine.trim();

		if (value !== '') {
			searchEngine.url = value;
		} else {
			editSearchEngine = searchEngine.url;
		}
	}

	function saveTitle(i: number) {
		const value = editTitles[i].trim();

		if (value !== '') {
			pinnedSites[i].title = value;
		} else {
			editTitles[i] = pinnedSites[i].title;
		}
	}

	function saveLink(i: number) {
		const value = editLinks[i].trim();

		if (value !== '') {
			pinnedSites[i].link = value;
		} else {
			editLinks[i] = pinnedSites[i].link;
		}
	}
</script>

<div transition:slide={{ axis: 'x', duration: 300, delay: 100 }} class="settings-menu">
	<div class="top-wrapper">
		<button onclick={toggleMenu} class="close-menu-button">
			<Icon class="close-menu-icon" icon="material-symbols:close-rounded" />
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
						class:selected={theme.accent === color}
						style={`background-color: var(--${color});`}
						onclick={() => (theme.accent = color)}
					>
						{#if theme.accent === color}
							<div transition:fade={{ duration: 500 }}>
								<Icon class="verified" icon="material-symbols:check-rounded" />
							</div>
						{/if}
					</button>
				{/each}
			</div>

			<div class="background-selector">
				<h3>Background</h3>
				<label class="radio-buttons">
					<input
						name="background"
						type="radio"
						value="color"
						checked={background.type === 'color'}
						onchange={() => (background.type = 'color')}
					/>
					Single color
				</label>

				<label class="radio-buttons">
					<input
						name="background"
						type="radio"
						value="svg"
						checked={background.type === 'svg'}
						onchange={() => (background.type = 'svg')}
					/>
					Svg background
				</label>
			</div>
		</div>

		<div class="search-engine-container">
			<h2>Search engine</h2>

			<div class="search-engine-flexbox">
				<input
					class="text-input"
					placeholder="Search Engine Link"
					bind:value={editSearchEngine}
					title={editSearchEngine}
					onkeydown={(e) => {
						if (e.key === 'Enter') {
							saveSearchEngine();
							e.currentTarget.blur();
						}
					}}
				/>
			</div>
		</div>

		<div class="pinned-sites">
			<h2>Pinned sites</h2>

			<div class="links">
				{#each pinnedSites as site, i}
					<h3>Site {i + 1}</h3>

					<input
						class="text-input"
						bind:value={editTitles[i]}
						placeholder="Title"
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								saveTitle(i);
								e.currentTarget.blur();
							}
						}}
					/>

					<input
						class="text-input"
						bind:value={editLinks[i]}
						placeholder="Link"
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								saveLink(i);
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

			<input
				class="text-input"
				placeholder="Enter city..."
				bind:value={inputCity}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						saveCity();
						e.currentTarget.blur();
					}
				}}
			/>
		</div>
	</div>
</div>

<style>
	.settings-menu {
		display: flex;
		flex-direction: column;
		position: fixed;
		width: min(20rem, 100%);
		height: 100dvh;
		background-color: var(--gray);
		right: 0;
		top: 0;
		box-shadow: var(--shadow-color) -4px 0 24px;
		padding: 1rem;
		overflow-y: auto;
		z-index: 30;
	}

	.text-input {
		border: 2px solid rgba(255, 255, 255, 0.1);
		outline: none;
		width: 100%;
		height: 2.75rem;
		border-radius: 12px;
		background-color: var(--bg-color);
		color: var(--primary-text);
		font-size: 1rem;
		padding-left: 1rem;
		margin-top: 0.5rem;
		box-shadow: none;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.text-input:focus {
		border-color: var(--accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent);
	}

	.top-wrapper {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	h1 {
		color: var(--primary-text);
		font-size: 1.5rem;
		font-weight: 600;
	}

	h2 {
		margin-top: 1.5rem;
		color: var(--secondary-text);
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	h3 {
		margin-top: 1rem;
		color: var(--secondary-text);
		font-size: 0.9rem;
		font-weight: 500;
	}

	h4 {
		margin-top: 0.5rem;
		color: var(--secondary-text);
		font-size: 0.875rem;
		font-weight: 500;
	}

	.close-menu-button {
		background-color: transparent;
		outline: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 8px;
		transition: background-color 0.2s ease;
	}

	.close-menu-button:hover {
		background-color: rgba(255, 255, 255, 0.08);
	}

	.close-menu-button:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	:global(.close-menu-icon) {
		color: var(--primary-text);
		font-size: 1.75rem;
	}

	.customization-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.color-selector {
		display: flex;
		gap: 0.75rem;
	}

	.color {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		border: none;
		box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
	}

	.color:hover {
		transform: scale(1.1);
	}

	.color:active {
		transform: scale(0.95);
	}

	.color:focus-visible {
		outline: 2px solid var(--primary-text);
		outline-offset: 2px;
	}

	.selected {
		box-shadow:
			inset 0 0 0 2px var(--primary-text),
			0 0 0 2px var(--accent);
	}

	:global(.verified) {
		color: var(--primary-text);
		font-size: 1.25rem;
	}

	.background-selector {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.radio-buttons {
		display: flex;
		align-items: center;
		cursor: pointer;
		gap: 0.75rem;
		color: var(--secondary-text);
		font-size: 0.95rem;
		padding: 0.5rem 0;
	}

	.radio-buttons input {
		appearance: none;
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		border: 2px solid #666;
		border-radius: 50%;
		display: grid;
		place-content: center;
		margin: 0;
		cursor: pointer;
		transition: border-color 0.2s ease;
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

	.radio-buttons input:checked {
		border-color: var(--accent);
	}

	.radio-buttons:hover input {
		border-color: var(--accent);
	}

	.radio-buttons input:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
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
</style>
