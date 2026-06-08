<script>
	import Search from '../components/Search.svelte';
	import Clock from '../components/Clock.svelte';
	import Links from '../components/Links.svelte';
	import Weather from '../components/Weather.svelte';
</script>

<div class="container">
	<div class="smallest-item">
		<Clock />
	</div>
	<div class="small-item">
		<Weather />
	</div>
	<div class="item">
		<Links />
		<Search />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 50rem;
		height: 25rem;
		/* background-color: aqua; */
		margin: 0 auto;
		margin-top: 20rem;
		gap: 3rem;
	}
	.smallest-item {
		flex: 1;
		height: 12rem;
	}
	.small-item {
		flex: 2;
		height: 12rem;
	}
	.item {
		flex: 0 0 100%;
	}
</style>
