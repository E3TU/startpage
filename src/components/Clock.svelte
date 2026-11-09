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
		height: 12rem;
		width: 100%;
		border-radius: 16px;
		box-shadow: 0 4px 12px var(--shadow-color);
	}
	.clock {
		color: var(--primary-text);
		font-size: clamp(3rem, 10vw, 5rem);
		font-weight: 700;
		line-height: 1;
	}
	.datemonth {
		color: var(--accent);
		font-size: clamp(1rem, 4vw, 1.5rem);
		font-weight: 600;
		margin-top: 0.25rem;
	}
</style>
