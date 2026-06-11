<div class="search-container">
	<input placeholder="Search The Web" class="search" type="text" />
</div>

<style>
	.search-container {
		margin-top: 2rem;
	}
	.search {
		background-color: var(--gray);
		border: 2px solid var(--purple);
		padding: 1rem;
		border-radius: 12px;
		font-size: 1rem;
		width: 100%;
				box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px 0px, rgba(0, 0, 0, 0.15) 0px 2px 6px 2px;

	}
	.search::placeholder {
		color: var(--secondary-text);
	}
	.search:focus {
		border: 2px solid var(--primary-text);
	}
</style>
