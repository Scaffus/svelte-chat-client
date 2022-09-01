<script>
    import ChatMessage from "./ChatMessage.svelte";
    import { createEventDispatcher } from "svelte/internal";
    import { publicMessages } from "./store.js";
    import { fly } from "svelte/transition";
    import { auth } from "./firebase";

    export let user;
    export let connected;

    const dispatch = createEventDispatcher();
    let message_content = "";

    function formatMessage(message) {
        return {
            content: message,
            sender: user.displayName,
            dateSent: new Date().getTime(),
        };
    }

    function sendMessage() {
        if (!message_content) return;
        let message = formatMessage(message_content);
        dispatch("send-message", { message: message, isPublic: true });
    }

    function openPrivateConversation(event) {
        private_conversation_target = event.detail;
        showPrivateConversationModal = true;
    }
</script>

<section>
    <nav
        class="card"
        class:has-background-white={connected}
        class:has-background-warning={!connected}
    >
        <div class="card-header">
            <p class="card-header-title">
                Converse
                {#if connected}
                    💬
                {:else}
                    ❌
                {/if}
            </p>
            {#if connected}
                <button
                    on:click={() => auth.signOut()}
                    class="card-header-icon"
                >
                    <i
                        class="fas fa-arrow-right-from-bracket"
                        aria-hidden="true"
                    />
                </button>
            {/if}
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
            {#each $publicMessages as message}
                <hr />
                <div
                    class="card-content p-0 pl-3 m-0"
                    in:fly={{ x: 50, duration: 100 }}
                >
                    <ChatMessage
                        {...message}
                        target={null}
                        on:open-private-conversation={(event) =>
                            dispatch(
                                "open-private-conversation-with",
                                event.detail
                            )}
                    />
                </div>
            {/each}
        </div>
    </nav>
</section>
