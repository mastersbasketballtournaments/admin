<script>
	let { data } = $props();
</script>

<h1>Tournaments</h1>

<ul>
	{#each data.tournaments as tournament}
		<li>{ tournament.id } { tournament.name }</li>
	{/each}
</ul>
