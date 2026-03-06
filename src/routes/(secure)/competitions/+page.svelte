<script>
	let { data } = $props();

	async function deleteRecord( record ) {
		const isConfirmed = window.confirm( `Are you sure you want to delete "${record.identifier}?"` );

		if ( isConfirmed ) {
			const formData = new FormData();

			formData.append( 'id', record.id );

			const response = await fetch( '?/delete', {
				method: 'POST',
				body: formData,
			} );

			location.href = '/competitions';
		}
	}
</script>

<h1>Competitions</h1>

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
						<button onclick={ () => deleteRecord( competition ) }>Delete</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</figure>
