<script>
  import { createEventDispatcher } from "svelte/internal";
  import { fly } from "svelte/transition";
  import { messages } from "../store";
  import MessageItem from "./MessageItem.svelte";

  const dispatch = createEventDispatcher();

  export let currentGroup;
  export let userId;

  dispatch("switch-to-group", currentGroup);
</script>

<div class="panel" style="height: 100%; overflow-x: hidden;">
  <div class="panel-heading">
    <div class="columns">
      <div class="column is-0">
        <figure class="image is-32x32">
          <img
            src="https://www.ui-avatars.com/api/?background=random&name={currentGroup.name}"
            class="is-rounded"
            alt="{currentGroup.name}'s profile picture"
          />
        </figure>
      </div>
      <div class="column ml-4">
        {currentGroup.name}
      </div>
    </div>
  </div>

  <!-- Messages -->
  {#if typeof messages == Array}
    {#each $messages as message}
      <div in:fly={{ x: 50, duration: 200 }}>
        <MessageItem {message} {userId} />
      </div>
    {/each}
  {/if}
</div>

<style>
  .panel {
    box-sizing: border-box;
    overflow: auto;
  }
</style>
