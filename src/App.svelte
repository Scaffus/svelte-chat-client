<script>
	import Chat from "./Chat.svelte";
	import Login from "./Login.svelte";
	import { authState } from "rxfire/auth";
	import { auth } from "./firebase";

	let user = authState(auth);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
	/>
</svelte:head>

<main>
	<section class="section">
		<div class="container">
			{#if $user}
				<Chat user={$user} />
			{:else}
				<Login />
			{/if}
		</div>
	</section>
</main>
