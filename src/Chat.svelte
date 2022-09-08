<script>
  import MessageInput from "./Chat/MessageInput.svelte";
  import Messages from "./Chat/Messages.svelte";
  import Groups from "./Chat/Groups.svelte";
  import Welcome from "./Welcome.svelte";
  import { db } from "./firebase";
  import { io } from "socket.io-client";
  import { messages, groupsMessages } from "./store";

  export let user;

  let currentGroup = "default";

  const server = io("http://192.168.1.24:3000", {
    transports: ["websocket"],
  });

  async function getUserData() {
    const doc = await db.collection("users").doc(user.uid).get();
    const snapshot = doc.data();

    return snapshot;
  }

  const userDataPromise = getUserData();

  // IO
  server.on("connect", () => {
    server.emit("client-connected", {
      userName: user.displayName,
      userId: user.uid,
    });
    // setCurrentGroup({ detail: { id: "default" } });
  });

  // Switches group and saves messages
  function setCurrentGroup(event) {
    currentGroup = event.detail;
    server.emit("join-group", user.uid, currentGroup.id);
    if (groupsMessages[currentGroup.id] != undefined)
      $messages = groupsMessages[currentGroup.id];
    else $messages = [];
  }

  function sendMessage(event) {
    const message_content = event.detail;
    let message = {
      senderId: user.uid,
      senderName: user.displayName,
      group: currentGroup.id,
      content: message_content,
      date: new Date().getTime(),
    };
    $messages = [...$messages, message];
    server.emit("send-message", message);
  }

  server.on("message-received", (message) => {
    if (message.senderId != user.uid) $messages = [...$messages, message];
  });

  server.on("group-messages", (groupMessages, groupId) => {
    groupsMessages[groupId] = groupMessages;
    $messages = groupMessages;
  });
</script>

{#await userDataPromise}
  <h1>Loading User Data...</h1>
{:then userData}
  <div class="tile is-ancestor m-1" style="height: 100%;">
    <div class="tile is-3 is-parent">
      <div class="tile is-child outlined p-0">
        <Groups {userData} on:current-group-changed={setCurrentGroup} />
      </div>
    </div>
    <div class="tile is-vertical is-parent" style="height: 100%;">
      <div class="tile is-child outlined fixed-height">
        {#if currentGroup === undefined}
          <Welcome userName={user.displayName} />
        {:else}
          <Messages userId={user.uid} {currentGroup} />
        {/if}
      </div>
      <div class="tile is-child is-12 box p-0">
        <MessageInput on:send-message={sendMessage} />
      </div>
    </div>
  </div>
{/await}

<style>
  .outlined {
    border: 1px solid #dbdbdb;
    border-radius: 4px;
  }

  .fixed-height {
    box-sizing: border-box;
  }
</style>
