<script lang="ts">
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';

	let date: any = $state(new Date());

	let hour = $derived(date.getHours());
	let min = $derived(date.getMinutes());

	let hourFormatted = $derived(String(hour).padStart(2, '0'));
	let minFormatted = $derived(String(min).padStart(2, '0'));

	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);
	});
</script>

<div class="clock-container">
	<p class="clock">{hourFormatted}:{minFormatted}</p>
</div>

<style>
	.clock-container {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--gray);
		height: 100%;
		padding: 0rem 4rem 0rem 4rem;
		border-radius: 12px;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	.clock {
		color: var(--primary-text);
		font-size: 5rem;
	}
</style>
