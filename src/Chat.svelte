<script>
    import Messages from "./Chat/Messages.svelte";
    import Groups from "./Chat/Groups.svelte";
    import MessageInput from "./Chat/MessageInput.svelte";
    import { writable } from "svelte/store";
    import { db } from "./firebase";

    export let user;

    async function getUserData() {
        const doc = await db.collection("users").doc(user.uid).get();
        const snapshot = doc.data();

        return snapshot;
    }

    const userDataPromise = getUserData();
</script>

{#await userDataPromise}
    <h1>Loading User Data...</h1>
{:then userData}
    <div class="tile is-ancestor m-1" style="height: 100%;">
        <div class="tile is-3 is-parent">
            <div class="tile is-child outlined p-0">
                <Groups {user} {userData}/>
            </div>
        </div>
        <div class="tile is-vertical is-parent">
            <div class="tile is-child outlined">
                <Messages />
            </div>
            <div class="tile is-child is-12 box p-0">
                <MessageInput />
            </div>
        </div>
    </div>

    <style>
        .outlined {
            border: 1px solid #dbdbdb;
            border-radius: 4px;
        }
    </style>
{/await}
