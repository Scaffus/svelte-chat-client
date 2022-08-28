<script>
    import ChatMessage from "./ChatMessage.svelte";
    import { createEventDispatcher } from "svelte/internal";
    import { privateMessages } from "./store";
    import { fly } from "svelte/transition";

    export let user;
    export let target;

    const dispatch = createEventDispatcher();

    let message_content = "";

    function formatMessage(message) {
        return {
            content: message,
            sender: user.displayName,
            target: target,
            dateSent: new Date().getTime(),
        };
    }

    function sendMessage() {
        if (!message_content) return;
        let message = formatMessage(message_content);
        dispatch("send-message", { message: message, isPublic: false });
    }
</script>

<section>
    <nav class="card">
        <div class="card-header">
            <p class="card-header-title">
                {target}
            </p>
            <button
                class="delete m-3"
                aria-label="close"
                on:click={() => dispatch("close-modal")}
            />
        </div>
        <div class="card-content">
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
                {#if message.sender === target || message.sender === user.displayName}
                    <hr />
                    <div
                        class="card-content p-0 pl-3 m-0"
                        in:fly={{ x: 50, duration: 300 }}
                    >
                        <ChatMessage {...message} />
                    </div>
                {/if}
            {/each}
        </div>
    </nav>
</section>
