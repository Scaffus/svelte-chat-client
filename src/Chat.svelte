<script>
    import PublicChat from "./PublicChat.svelte";
    import PrivateChat from "./PrivateChat.svelte";
    import { fly } from "svelte/transition";
    import { io } from "socket.io-client";
    import { publicMessages, privateMessages } from "./store.js";

    export let user;

    let connected = false;

    $: showPrivateConversationModal = false;
    $: private_conversation_target = "";

    const server = io("http://82.121.191.12:3000", {
        transports: ["websocket"],
    });

    server.on("connect", () => {
        connected = server.connected;
        server.emit("client-just-connected", {
            username: user.displayName,
            id: server.id,
        });
    });

    server.on("new-client-connected", (client) => {
        $publicMessages = [
            ...$publicMessages,
            {
                content: `${client.username} just joined the chat`,
                sender: "[System]",
                dateSent: new Date().getTime(),
            },
        ];
    });

    server.on("private-message-received", (message) => {
        addMessageToStore(message, "privateMessages");
    });

    server.on("public-message-received", (message) => {
        $publicMessages = [...$publicMessages, message];
    });

    function sendMessage(event) {
        let { message, isPublic } = event.detail;
        if (isPublic) {
            addMessageToStore(message, "publicMessages");
            server.emit("public-message-sent", message);
        } else {
            addMessageToStore(message, "privateMessages");
            server.emit("private-message-sent", message);
        }
    }

    function addMessageToStore(message, store) {
        if (store === "publicMessages") {
            $publicMessages = [message, ...$publicMessages];
        }
        if (store === "privateMessages") {
            $privateMessages = [message, ...$privateMessages];
        }
    }

    function openPrivateConversationWith(event) {
        private_conversation_target = event.detail;
        showPrivateConversationModal = true;
    }
</script>

<section>
    <div class="columns">
        <div
            class="column"
            class:is-three-fifths={showPrivateConversationModal}
            in:fly={{ y: -100, duration: 500 }}
            out:fly={{ y: -100, duration: 500 }}
        >
            <PublicChat
                {user}
                {connected}
                {server}
                on:send-message={sendMessage}
                on:open-private-conversation-with={openPrivateConversationWith}
            />
        </div>
        {#if showPrivateConversationModal}
            <div
                class="column"
                in:fly={{ y: -100, duration: 500 }}
                out:fly={{ y: -100, duration: 500 }}
            >
                <PrivateChat
                    {user}
                    target={private_conversation_target}
                    {server}
                    on:send-message={sendMessage}
                    on:close-modal={() =>
                        (showPrivateConversationModal = false)}
                />
            </div>
        {/if}
    </div>
</section>
