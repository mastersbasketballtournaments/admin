<script>
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<h1>Competitions</h1>

<p><a href="competitions/add" class="button">Add Competition</a></p>

<figure>
	<table>
		<thead>
			<tr>
				<th>Identifier</th>
				<th>Gender</th>
				<th>Age Over</th>
				<th></th>
			</tr>
		</thead>

		<tbody>
			{#each data.competitions as competition}
				<tr>
					<td>
						<a href="/competitions/{ competition.id }">{ competition.identifier }</a>
					</td>
					<td>{ competition.gender }</td>
					<td>{ competition.ageOver }</td>
					<td class="align-right">
						<form method="POST" action="?/delete" use:enhance={() => {
							if ( !confirm( `Are you sure you want to delete "${competition.identifier}"?` ) ) {
								return () => {}; // cancel submission
							}
						} }>
							<input name="id" type="hidden" value={competition.id} />
							<button>Delete</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</figure>
