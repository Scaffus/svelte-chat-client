<script>
    import Login from "./Login.svelte";
    import { auth, db } from "./firebase";
    import { authState } from "rxfire/auth";
    import { groupsMessages, setGroupsMessages } from "./store";
    import Chat from "./Chat.svelte";

    let user = authState(auth);
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
    />
</svelte:head>

<!-- <svelte:window on:beforeunload={saveMessages} on:load={loadMessages} /> -->

<main style="height: 100%; overflow: hidden;">
    {#if $user}
        <Chat user={$user} />
    {:else}
        <Login />
    {/if}
</main>
