<div class="search-container">
	<input placeholder="Search The Web" class="search" type="text" />
</div>

<style>
	.search-container{
		margin-top: 2rem;
	}
	.search {
		background-color: var(--gray);
		border: 2px solid var(--purple);
		padding: 1rem;
		border-radius: 12px;
		font-size: 1rem;
		width: 100%;
	}
	.search::placeholder {
		color: var(--secondary-text);
	}
	.search:focus {
		border: 2px solid var(--primary-text);
	}
</style>
