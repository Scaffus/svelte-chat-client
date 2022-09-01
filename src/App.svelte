<script>
    import Login from "./Login.svelte";
    import { auth, db } from "./firebase";
    import { authState } from "rxfire/auth";
    import Chat from "./Chat.svelte";

    let user = authState(auth);
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
    />
</svelte:head>

<main style="height: 100%; overflow: hidden;">
    {#if $user}
        <Chat user={$user} />
    {:else}
        <Login />
    {/if}
</main>
