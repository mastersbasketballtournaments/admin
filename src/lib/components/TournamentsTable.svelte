<script lang="ts">
	import type { Tournament } from '$lib/types';

	let { tournaments, deleteAction = '?/delete', redirectAfterDelete = '/tournaments' } = $props();

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

			await fetch( deleteAction, {
				method: 'POST',
				body: formData,
			} );

			location.href = redirectAfterDelete;
		}
	}
</script>

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
			{#each tournaments as tournament}
				<tr>
					<td>
						<a href="/tournaments/{ tournament.id }">{ tournament.name }</a>
						<a href="{ tournament.website }" target="_blank" rel="noopener noreferrer">link</a><br>
						{ formatDate.format( new Date( tournament.dateStart ) ) } - { formatDate.format( new Date( tournament.dateEnd ) ) }
					</td>
					<td>{ tournament.country }, { tournament.location }</td>
					<td class="align-right">
						<button onclick={ () => deleteRecord( tournament ) }>Delete</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</figure>
