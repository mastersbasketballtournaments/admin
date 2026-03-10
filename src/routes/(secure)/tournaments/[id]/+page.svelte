<script lang="ts">
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();

	let selectedCompetitions = $derived( new Set( data.assignedCompetitions.map( c => c.id ) ) );
</script>

<h1>{ data.tournament ? 'Update' : 'Add' } Tournament</h1>

{#if form?.error}
	<p class="error">{ form.error }</p>
{/if}

<form method="POST">
	<p>
		<label for="name">Name *</label>
		<input id="name" name="name" type="text" value={ data.tournament?.name || '' } required/>
	</p>

	<p>
		<label for="dateStart">Start date *</label>
		<input id="dateStart" name="dateStart" type="date" value={ data.tournament?.dateStart || '' } required/>
	</p>

	<p>
		<label for="dateEnd">End date *</label>
		<input id="dateEnd" name="dateEnd" type="date" value={ data.tournament?.dateEnd || '' } required/>
	</p>

	<p>
		<label for="contact">Contact *</label>
		<input id="contact" name="contact" type="text" value={ data.tournament?.contact || '' } required/>
	</p>

	<p>
		<label for="emailAddress">Email address *</label>
		<input id="emailAddress" name="emailAddress" type="email" value={ data.tournament?.emailAddress || '' } required/>
	</p>

	<p>
		<label for="website">Website</label>
		<input id="website" name="website" type="text" value={ data.tournament?.website || '' }/>
	</p>

	<p>
		<label for="facebook">Facebook</label>
		<input id="facebook" name="facebook" type="text" value={ data.tournament?.facebook || '' }/>
	</p>

	<p>
		<label for="twitter">Twitter</label>
		<input id="twitter" name="twitter" type="text" value={ data.tournament?.twitter || '' }/>
	</p>

	<p>
		<label for="instagram">Instagram</label>
		<input id="instagram" name="instagram" type="text" value={ data.tournament?.instagram || '' }/>
	</p>

	<p>
		<label for="continent">Continent *</label>
		<input id="continent" name="continent" type="text" value={ data.tournament?.continent || '' } required/>
	</p>

	<p>
		<label for="country">Country *</label>
		<input id="country" name="country" type="text" value={ data.tournament?.country || '' } required/>
	</p>

	<p>
		<label for="location">Location *</label>
		<input id="location" name="location" type="text" value={ data.tournament?.location || '' } required/>
	</p>

	<p>Competitions:</p>

	{#each data.competitions as competition}
		<label>
			<input name="chosenCompetitions" type="checkbox" value={ competition.id } checked={ selectedCompetitions.has( competition.id ) }>
			{ competition.identifier }
		</label>
	{/each}

	<p>
		<button>{ data.tournament ? 'Update' : 'Add' } Tournament</button>
		<a href="/tournaments">cancel</a>
	</p>
</form>
