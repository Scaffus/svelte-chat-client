<script>
    import { createEventDispatcher } from "svelte/internal";

    export let target;
    const dispatch = createEventDispatcher();

    dispatch("add-sender-to-pm-senders", target);

    function openPrivateConversation() {
        dispatch("open-private-conversation", target);
    }
</script>

<button class="link" on:click={openPrivateConversation}>{target}</button>

<style>
    .link,
    .link:focus {
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-weight: 600;
        text-decoration: underline;
    }

    .link:hover {
        color: #002366;
    }
</style>
