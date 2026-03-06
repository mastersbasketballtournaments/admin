<script>
	let { data } = $props();
</script>

<h1>Competitions</h1>

<ul>
	{#each data.competitions as competition}
		<li>{ competition.id } { competition.identifier } { competition.gender } { competition.ageOver }</li>
	{/each}
</ul>
