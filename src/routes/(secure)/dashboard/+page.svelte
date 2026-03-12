<script lang="ts">
	import TournamentsTable from '$lib/components/TournamentsTable.svelte';

	let { data } = $props();
</script>

<h1>Dashboard</h1>

<TournamentsTable
	tournaments={ data.tournaments }
	deleteAction="/tournaments?/delete"
	redirectAfterDelete="/dashboard"
/>
