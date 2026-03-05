<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Sign In</h1>

<form method="POST">
	<p>
		<label for="email">Email address</label>
		<input id="email" name="email" type="email" >
	</p>

	<p>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" >
	</p>

	<p>
		<input type="submit" value="Sign in">
	</p>
</form>
