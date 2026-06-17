<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let date: Date = $state(new Date());

	let hour = $derived(date.getHours());
	let min = $derived(date.getMinutes());

	let month = $derived(date.toLocaleString('default', { month: 'short' }));

	let day = $derived(date.getDate());

	let hourFormatted = $derived(String(hour).padStart(2, '0'));
	let minFormatted = $derived(String(min).padStart(2, '0'));

	let interval: number;

	onMount(() => {
		interval = setInterval(() => {
			date = new Date();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="clock-container">
	<p class="clock">{hourFormatted}:{minFormatted}</p>
	<p class="datemonth">{month} {day}</p>
</div>

<style>
	.clock-container {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background-color: var(--gray);
		height: 100%;
		width: 18rem;
		border-radius: 20px;
		border: 3px solid var(--accent);
		/* backdrop-filter: blur(10px); */
	}
	.clock {
		color: var(--primary-text);
		text-shadow: 8px 8px #000;
		font-size: 5rem;
	}
	.datemonth {
		color: var(--primary-text);
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
