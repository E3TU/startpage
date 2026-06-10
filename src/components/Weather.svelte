<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const apiKey = import.meta.env.VITE_API_KEY;

	interface WeatherResponse {
		temperature: number;
		country: string;
		city: string;
	}

	const url: string = `https://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=${apiKey}&units=metric`;

	let weather: WeatherResponse | null = $state(null);

	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	let date: Date = $state(new Date());
	let weekday = $derived(days[date.getDay()]);

	async function fetchWeather() {
		const res = await fetch(url);

		const data = await res.json();

		weather = {
			temperature: data.main.temp,
			country: data.sys.country,
			city: data.name
		};
	}

	let interval: number;

	onMount(() => {
		fetchWeather();
		interval = setInterval(() => {
			date = new Date();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="weather">
	<div class="left">
		<p>Icon</p>
	</div>
	<hr class="divider" />
	<div class="right">
		{#if weather}
			<h1 class="location">{weather.city}, {weather.country}</h1>
			<p class="day">{weekday}</p>
			<p class="temperature">{Math.round(weather.temperature)}°C</p>
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
</div>

<style>
	.weather {
		display: flex;
		flex-direction: row;
		background-color: var(--gray);
		height: 100%;
		border-radius: 12px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	.left {
		flex: 1;
	}
	.right {
		flex: 1;
		color: var(--primary-text);
		padding-left: 1rem;
	}
	.location {
		font-size: 1.5rem;
		padding-top: 1rem;
	}
	.day {
		padding-top: 0.25rem;
	}
	.temperature {
		font-size: 4rem;
	}
	.divider {
		background-color: var(--primary-text);
		margin: 1.5rem 0rem;
	}
</style>
