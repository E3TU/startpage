<script>
	import Search from '../components/Search.svelte';
	import Clock from '../components/Clock.svelte';
	import Links from '../components/Links.svelte';
	import Weather from '../components/Weather.svelte';
</script>

<div class="container">
	<div class="small-item">
		<Clock />
	</div>
	<div class="small-item">
		<Weather />
	</div>
	<div class="full-item">
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
	}
	.small-item{
		flex: 1;
	}
	.full-item{
		flex: 0 0 100%;
	}
</style>
