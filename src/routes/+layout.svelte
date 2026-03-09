<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { enhance } from '$app/forms';

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<h1>Masters Basketball Tournaments</h1>

	<nav>
		<ul>
			{#if data.user}
				<!-- <li><a class="current" href="/">Home</a></li> -->

				<li><a href="/dashboard">Dashboard</a></li>
				<li><a href="/tournaments">Tournaments</a></li>
				<li><a href="/competitions">Competitions</a></li>
				<li><a href="/register">Register</a></li>
				<li>
					<form method="post" action="/?/signOut" use:enhance>
						<button>Sign out</button>
					</form>
				</li>
			{:else}
				<li><a href="/signin">Sign In</a></li>
			{/if}
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer></footer>
