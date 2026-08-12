<script lang="ts">
    import Icon from '@iconify/svelte';
    import { searchEngine } from '$lib/state/search.svelte';

    let searchTerm = $state('');

    let search = $derived(
        searchEngine.url + encodeURIComponent(searchTerm)
    );

    function handleSubmit(e: Event) {
        e.preventDefault();

        if (searchTerm) {
            window.location.href = search;
        }

        searchTerm = '';
    }
</script>

<div class="search-container">
	<form class="search-form" onsubmit={handleSubmit}>
		<input bind:value={searchTerm} placeholder="Search The Web" class="search" type="text" />
		<button id="search-btn"><Icon icon="material-symbols:search-rounded"></Icon></button>
	</form>
</div>

<style>
	.search-container {
		display: flex;
		flex-direction: row;
		padding-top: 2rem;
		width: 100%;
	}
	.search-form {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 1rem;
	}
	.search {
		background-color: var(--gray);
		border: 3px solid var(--accent);
		padding: 1rem;
		color: var(--primary-text);
		border-radius: 30px;
		font-size: 1rem;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		outline: none;
		transition: 0.3s ease-in;
		width: 100%;
		flex: 1;
		height: 4rem;
	}
	.search::placeholder {
		color: var(--secondary-text);
		font-size: 1rem;
	}
	.search:focus {
		transition: 0.3s ease-in;
		border: 3px solid var(--primary-text);
	}
	#search-btn {
		width: 4rem;
		height: 4rem;
		background-color: var(--accent);
		border: none;
		border-radius: 30px;
		font-size: 1.5rem;
		color: var(--primary-text);
		flex: 0 0 4rem;
		cursor: pointer;
		border: 3px solid transparent;
		transition: 0.2s ease-in;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	}
	#search-btn:hover {
		border: 3px solid var(--accent);
		background-color: var(--gray);
		transition: 0.2s ease-in;
	}
</style>
