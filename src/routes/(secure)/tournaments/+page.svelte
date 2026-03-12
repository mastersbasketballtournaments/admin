<script>
	import { enhance } from '$app/forms';
	import TournamentsTable from '$lib/components/TournamentsTable.svelte';

	let { data } = $props();

	const formatDate = new Intl.DateTimeFormat( 'en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	} );
</script>

<h1>Tournaments</h1>

<p><a href="tournaments/add" class="button">Add Tournament</a></p>

<TournamentsTable
	tournaments={ data.tournaments }
	deleteAction="?/delete"
	redirectAfterDelete="/dashboard"
/>
