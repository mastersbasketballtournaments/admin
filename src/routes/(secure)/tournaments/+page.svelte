<script>
	import { enhance } from '$app/forms';

	let { data } = $props();

	const formatDate = new Intl.DateTimeFormat( 'en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	} );
</script>

<h1>Tournaments</h1>

<p><a href="tournaments/add" class="button">Add Tournament</a></p>

<figure>
	<table>
		<thead>
			<tr>
				<th>Tournament</th>
				<th>Country</th>
				<th></th>
			</tr>
		</thead>

		<tbody>
			{#each data.tournaments as tournament}
				<tr>
					<td>
						<a href="/tournaments/{ tournament.id }">{ tournament.name }</a>
						<a href="{ tournament.website}" target="_blank" rel="noopener noreferrer">link</a><br>
						{ formatDate.format( new Date( tournament.dateStart ) ) } - { formatDate.format( new Date( tournament.dateEnd ) ) }</td>
					<td>{ tournament.country }, { tournament.location }</td>
					<td class="align-right">
						<form method="POST" action="?/delete" use:enhance={() => {
							if ( !confirm( `Are you sure you want to delete "${tournament.name}"?` ) ) {
								return () => {}; // cancel submission
							}
						} }>
							<input name="id" type="hidden" value={tournament.id} />
							<button>Delete</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</figure>
