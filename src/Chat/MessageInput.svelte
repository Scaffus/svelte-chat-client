<script>
    import { createEventDispatcher } from "svelte/internal";

    const dispatch = createEventDispatcher();
    let message;

    function sendMessage() {
        if (message == "") return;
        if (dispatch("send-message", message)) message = "";
    }
</script>

<div class="field has-addons">
    <div class="control is-expanded">
        <input
            type="text"
            class="input p-2"
            on:keypress={(e) => (e.key == "Enter" ? sendMessage() : null)}
            bind:value={message}
        />
    </div>
    <div class="control">
        <button class="button is-primary" on:click={sendMessage}>Send</button>
    </div>
</div>
