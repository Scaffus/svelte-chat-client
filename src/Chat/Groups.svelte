<script>
    import { writable } from "svelte/store";
    import { auth, db } from "../firebase";
    import GroupItem from "./GroupItem.svelte";

    export let user;
    export let userData;

    let userGroups = userData.groups;

    async function getGroupData(id) {
        const doc = await db.collection("groups").doc(id).get();
        const snapshot = doc.data();

        return snapshot;
    }
</script>

<div class="card" style="height: 100%;">
    <div class="card-header">
        <button
            class="button is-danger is-outlined is-fullwidth"
            on:click={() => {
                auth.signOut();
            }}>SignOut</button
        >
    </div>
    {#each userGroups as groupId}
        {#await getGroupData(groupId) then groupData}
            <GroupItem {groupId} {groupData} />
        {/await}
    {/each}
</div>
