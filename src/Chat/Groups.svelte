<script>
    import { createEventDispatcher } from "svelte/internal";
    import { auth, db } from "../firebase";
    import GroupItem from "./GroupItem.svelte";

    export let userData;

    let userGroups = userData.groups;
    const dispatch = createEventDispatcher()

    async function getGroupData(id) {
        const doc = await db.collection("groups").doc(id).get();
        const snapshot = doc.data();

        return snapshot;
    }

    function switchToGroup(event) {
        const groupData = event.detail;
        dispatch("current-group-changed", groupData)
    }
</script>

<div class="panel" style="height: 100%;">
    <div class="panel-block">
        <div class="control">
            <button class="card-header-icon" on:click={() => auth.signOut()}>
                <i class="fas fa-right-from-bracket" aria-hidden="true" />
            </button>
        </div>
    </div>
    {#each userGroups as groupId}
        {#await getGroupData(groupId) then groupData}
            <GroupItem
                {groupId}
                {groupData}
                on:switch-to-group={switchToGroup}
            />
        {/await}
    {/each}
</div>
