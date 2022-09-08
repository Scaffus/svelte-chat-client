<script>
    import { createEventDispatcher } from 'svelte/internal'

    const dispatch = createEventDispatcher()

    export let groupId;
    export let groupData;

    groupData.id = groupId
</script>

<div class="panel-block">
    <button class="button is-fullwidth" on:click={() => dispatch('switch-to-group', groupData)}>
        {groupData.name}
    </button>
</div>
