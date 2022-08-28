<script>
    import { createEventDispatcher } from "svelte/internal";

    export let sender;
    export let content;
    export let dateSent;
    export let target;
    target = null;
    // export let type;

    const dispatch = createEventDispatcher();

    const time = new Intl.DateTimeFormat("en", {
        timeStyle: "medium",
        dateStyle: "short",
    });

    function formatDate(date) {
        let formated_date = time.format(date);
        return formated_date;
    }

    function openPrivateConversation() {
        dispatch("open-private-conversation", sender);
    }
</script>

<section>
    <div class="level">
        <div class="level-left">
            <strong class="level-item"
                ><button class="link" on:click={openPrivateConversation}
                    >{sender}</button
                ></strong
            >
            <p class="level-item">{content}</p>
        </div>
        <i class="level-right has-text-grey-light">{formatDate(dateSent)}</i>
    </div>
</section>

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
