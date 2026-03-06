<script>
	let { data } = $props();

	const formatDate = new Intl.DateTimeFormat( 'en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	} );

	async function deleteRecord( record ) {
		const isConfirmed = window.confirm( `Are you sure you want to delete "${record.name}?"` );

		if ( isConfirmed ) {
			const formData = new FormData();

			formData.append( 'id', record.id );

			const response = await fetch( '?/delete', {
				method: 'POST',
				body: formData,
			} );

			location.href = '/tournaments';
		}
	}
</script>

<h1>Tournaments</h1>

<figure>
	<table>
		<thead>
			<tr>
				<th>Tournament</th>
				<th>Date</th>
				<th>Country</th>
				<th></th>
			</tr>
		</thead>

		<tbody>
			{#each data.tournaments as tournament}
				<tr>
					<td>
						<a href="/tournaments/{ tournament.id }">{ tournament.name }</a>
						<a href="{ tournament.website}" target="_blank" rel="noopener noreferrer">link</a>
					</td>
					<td>{ formatDate.format( new Date( tournament.dateStart ) ) } - { formatDate.format( new Date( tournament.dateEnd ) ) }</td>
					<td>{ tournament.country }, { tournament.location }</td>
					<td class="align-right">
						<button onclick={ () => deleteRecord( tournament ) }>Delete</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</figure>
