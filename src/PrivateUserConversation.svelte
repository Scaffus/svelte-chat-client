<script>
    import ChatMessage from "./ChatMessage.svelte";
    import { createEventDispatcher } from "svelte/internal";
    import { fly } from "svelte/transition";
    import { privateMessages } from "./store";

    const dispatch = createEventDispatcher();
    let message_content = "";
    let showModal = true;

    function sendMessage() {
        dispatch("send-private-message", {
            target: target,
            message: message_content,
        });
    }

    export let target;
</script>

<div class="modal" class:is-active={showModal}>
    <div class="modal-background" />
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{target}</p>
            <button
                class="delete"
                aria-label="close"
                on:click={() => dispatch("close-modal")}
            />
        </header>
        <div class="modal-card-body">
            <div class="field has-addons" style="width: 100%;">
                <div class="control is-expanded">
                    <input
                        type="text"
                        class="input"
                        bind:value={message_content}
                        on:keypress={(e) =>
                            e.key == "Enter" ? sendMessage() : null}
                        placeholder="Message"
                    />
                </div>
                <div class="control">
                    <button class="button is-primary" on:click={sendMessage}
                        >Send</button
                    >
                </div>
            </div>
            {#each $privateMessages as message}
                <div
                    class="modal-card-body p-0 pl-3 m-0"
                    in:fly={{ x: 50, duration: 300 }}
                >
                    <ChatMessage {...message} />
                </div>
            {/each}
        </div>
    </div>
</div>
