<script lang="ts">
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';

	let date: any = $state(new Date());

	let hour = $derived(date.getHours());

	let min = $derived(date.getMinutes());


	onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
		}, 1000);
	});
</script>

<div class="clock-container">
	<p class="clock">{hour}:{min}</p>
</div>
