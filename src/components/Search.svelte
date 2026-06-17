<script lang="ts">
	let url: string = 'https://search.brave.com/search?q=';
	let searchTerm = $state('');

	let search = $derived(url + encodeURIComponent(searchTerm));

	$effect(() => {
		console.log(searchTerm);
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		window.location.href = search;
		searchTerm = ("");
	}
</script>

<div class="search-container">
	<form onsubmit={handleSubmit}>
		<input
			bind:value={searchTerm}
			placeholder="Search The Web"
			class="search"
			type="text"
		/>
	</form>
</div>

<style>
	.search-container {
		padding-top: 2rem;
	}
	.search {
		background-color: var(--gray);
		border: 3px solid var(--accent);
		padding: 1rem;
		color: var(--primary-text);
		border-radius: 30px;
		font-size: 1rem;
		width: 100%;
		box-shadow:
			rgba(0, 0, 0, 0.3) 0px 1px 2px 0px,
			rgba(0, 0, 0, 0.15) 0px 2px 6px 2px;
		outline: none;
		transition: 0.5s ease-in;
	}
	.search::placeholder {
		color: var(--secondary-text);
		font-size: 1rem;
	}
	.search:focus {
		transition: 0.5s ease-in;
		border: 3px solid var(--primary-text);
	}
</style>
