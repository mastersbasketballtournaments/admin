<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<h1>{ data.competition ? 'Update' : 'Add' } Competition</h1>

{#if form?.error}
	<p class="error">{ form.error }</p>
{/if}

<form method="POST">
	<p>
		<label for="identifier">Identifier *</label>
		<input id="identifier" name="identifier" type="text" value={ data.competition?.identifier || '' } required/>
	</p>

	<p>
		<label>Gender *</label>
		<label><input name="gender" type="radio" value="Men" checked={ data.competition?.gender === 'Men' } /> Men</label>
		<label><input name="gender" type="radio" value="Women" checked={ data.competition?.gender === 'Women' } /> Women</label>
	</p>

	<p>
		<label for="ageOver">Age Over *</label>
		<input id="ageOver" name="ageOver" type="text" value={ data.competition?.ageOver || '' } required/>
	</p>

	<p>
		<button>{ data.competition ? 'Update' : 'Add' } Competition</button>
		<a href="/competitions">cancel</a>
	</p>
</form>
