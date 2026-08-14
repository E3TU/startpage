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
		const url: string = `https://api.openweathermap.org/data/2.5/weather?q=${city.selectedCity}&appid=${apiKey}&units=metric`;

		const res: Response = await fetch(url);

		const data = await res.json();

		weather = {
			temperature: data.main.temp,
			country: data.sys.country,
			city: data.name,
			icon: data.weather[0].icon,
			weatherDesc: data.weather[0].main
		};
	}
</script>

<div class="weather">
	{#if weather}
		<div class="left">
			<Icon class="weather-icon" icon={iconMap[weather?.icon ?? ''] ?? 'mdi:weather-cloudy'} />
			<p class="weatherDesc">{weather.weatherDesc}</p>
		</div>
		<hr class="divider" />
		<div class="right">
			<h1 class="location">{weather.city}, {weather.country}</h1>
			<p class="day">{weekday}</p>
			<p class="temperature">{Math.round(weather.temperature)}°C</p>
		</div>
	{:else}
		<p class="loading">Loading...</p>
	{/if}
</div>

<style>
	.weather {
		display: flex;
		flex-direction: row;
		background-color: var(--gray);
		height: 100%;
		border-radius: 20px;
		align-items: center;
		justify-content: center;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		overflow: hidden;
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
		font-size: 1.25rem;
		font-weight: bold;
	}
	:global(.weather-icon) {
		color: var(--primary-text);
		height: 128px;
		width: 128px;
	}
	.right {
		flex: 1;
		color: var(--primary-text);
		padding-left: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.location {
		font-size: 1.5rem;
		padding-top: 1rem;
	}
	.day {
		padding-top: 0.25rem;
		color: var(--accent);
	}
	.temperature {
		font-size: 4rem;
	}
	.divider {
		border-color: var(--accent);
		height: 70%;
	}
	.loading {
		color: var(--primary-text);
	}
</style>
