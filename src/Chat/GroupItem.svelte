<script>
    import { db } from "../firebase";
    import { doc } from "rxfire/firestore";
    import { writable } from "svelte/store";

    export let groupId;
    export let groupData;
</script>

<div class="card-content p-0">
    <img src="" alt="" />
    <button class="button is-fullwidth">
        {groupData.name}
    </button>
</div>
