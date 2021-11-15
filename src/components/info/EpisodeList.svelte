<script lang="ts">
  import Sites from "./Sites.svelte";

  export let episodes;
  export let sources;
</script>

<div class="flex flex-wrap flex-row md:flex-col gap-2 justify-evenly px-2">
  {#each Array.from(new Array(episodes || 0), (x, i) => i + 1) as episode}
    <div class="flex flex-col md:flex-row md:justify-between gap-y-2">
      <span class="text-center md:text-left">
        Episodio {episode}
      </span>
      <Sites sites={sources} size={5} {episode} />
    </div>
  {/each}
</div>
