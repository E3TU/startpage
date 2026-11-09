<script lang="ts">
	import Icon from '@iconify/svelte';
	import { city } from '$lib/state/city.svelte';

	const iconMap: Record<string, string> = {
		'01d': 'material-symbols:sunny',
		'01n': 'mdi:weather-night',
		'02d': 'carbon:partly-cloudy',
		'02n': 'material-symbols:partly-cloudy-night-outline',
		'03d': 'mdi:weather-cloudy',
		'03n': 'mdi:weather-cloudy',
		'04d': 'mdi:weather-cloudy',
		'04n': 'mdi:weather-cloudy',
		'09d': 'mdi:weather-pouring',
		'09n': 'mdi:weather-pouring',
		'10d': 'material-symbols:rainy-outline',
		'10n': 'material-symbols:rainy-outline',
		'11d': 'mdi:weather-lightning',
		'11n': 'mdi:weather-lightning',
		'13d': 'material-symbols:weather-snowy',
		'13n': 'material-symbols:weather-snowy',
		'50d': 'mdi:weather-fog',
		'50n': 'mdi:weather-fog'
	};

	const apiKey: string = import.meta.env.VITE_API_KEY;

	interface WeatherResponse {
		temperature: number;
		country: string;
		city: string;
		icon: string;
		weatherDesc: string;
	}
	let weather: WeatherResponse | null = $state(null);
	let error: string | null = $state(null);

	const days: string[] = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	let date: Date = $state(new Date());
	let weekday = $derived(days[date.getDay()]);

	$effect(() => {
		const selectedCity = city.selectedCity;

		if (!selectedCity) return;

		fetchWeather(selectedCity);
	});

	$effect(() => {
		const now = new Date();

		const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

		const timeout = setTimeout(() => {
			date = new Date();
		}, tomorrow.getTime() - now.getTime());

		return () => clearTimeout(timeout);
	});

	export async function fetchWeather(selectedCity: string) {
		error = null;
		weather = null;

		const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.selectedCity)}&appid=${apiKey}&units=metric`;

		try {
			const res: Response = await fetch(url);
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message ?? 'Weather unavailable');
			}

			weather = {
				temperature: data.main.temp,
				country: data.sys.country,
				city: data.name,
				icon: data.weather[0].icon,
				weatherDesc: data.weather[0].main
			};
		} catch (err) {
			error = err instanceof Error ? err.message : 'Weather unavailable';
		}
	}
</script>

<div class="weather">
	{#if error}
		<div class="error-state">
			<p class="error-text">{error}</p>
			<button class="retry" onclick={() => fetchWeather(city.selectedCity)}>Retry</button>
		</div>
	{:else if weather}
		<div class="left">
			<Icon class="weather-icon" icon={iconMap[weather?.icon ?? ''] ?? 'mdi:weather-cloudy'} />
			<p class="weatherDesc">{weather.weatherDesc}</p>
		</div>
		<div class="divider"></div>
		<div class="right">
			<h1 class="location">{weather.city}, {weather.country}</h1>
			<p class="day">{weekday}</p>
			<p class="temperature">{Math.round(weather.temperature)}°C</p>
		</div>
	{:else}
		<div class="loading-state">
			<div class="skeleton skeleton-icon"></div>
			<div class="skeleton skeleton-line"></div>
			<div class="skeleton skeleton-line short"></div>
		</div>
	{/if}
</div>

<style>
	.weather {
		display: flex;
		flex-direction: row;
		background-color: var(--gray);
		height: 100%;
		border-radius: 16px;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px var(--shadow-color);
		overflow: hidden;
		min-height: 12rem;
	}
	.left {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		flex: 1;
	}
	.weatherDesc {
		color: var(--accent);
		font-size: clamp(1rem, 3vw, 1.25rem);
		font-weight: 600;
	}
	:global(.weather-icon) {
		color: var(--primary-text);
		height: clamp(64px, 15vw, 128px);
		width: clamp(64px, 15vw, 128px);
	}
	.right {
		flex: 1;
		color: var(--primary-text);
		padding-left: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-width: 0;
	}
	.location {
		font-size: clamp(1rem, 4vw, 1.5rem);
		padding-top: 1rem;
		text-align: center;
		font-weight: 500;
	}
	.day {
		padding-top: 0.25rem;
		color: var(--accent);
		font-weight: 500;
	}
	.temperature {
		font-size: clamp(2.5rem, 8vw, 4rem);
		font-weight: 600;
	}
	.divider {
		width: 1px;
		background-color: rgba(255, 255, 255, 0.08);
		height: 70%;
	}
	.loading-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1rem;
	}
	.skeleton {
		background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 8px;
	}
	.skeleton-icon {
		width: 64px;
		height: 64px;
		border-radius: 50%;
	}
	.skeleton-line {
		width: 8rem;
		height: 1rem;
	}
	.skeleton-line.short {
		width: 4rem;
	}
	.error-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1rem;
		text-align: center;
	}
	.error-text {
		color: var(--primary-text);
		font-size: 0.95rem;
	}
	.retry {
		background-color: var(--accent);
		color: var(--primary-text);
		border: none;
		border-radius: 8px;
		padding: 0.5rem 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: transform 0.2s ease, background-color 0.2s ease;
	}
	.retry:hover {
		background-color: color-mix(in srgb, var(--accent) 85%, white);
	}
	.retry:active {
		transform: scale(0.96);
	}
	@keyframes shimmer {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}
</style>
