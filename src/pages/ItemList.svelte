<script lang="ts">
  import { fade, slide } from "svelte/transition";

  import type { AnimeItem, Response } from "../Anime";
  import Fa from "svelte-fa";
  import { faTimes } from "@fortawesome/free-solid-svg-icons";
  import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
  import ListItem from "../components/ListItem.svelte";
  import Loading from "../components/Loading.svelte";
  import ErrorMessage from "../components/ErrorMessage.svelte";
import { route } from "@bjornlu/svelte-router";

  export let promise: Promise<Response> = null;
  export let items = [];
</script>

<div class="md:px-2 mt-4 md:mt-8 pb-12" in:fade={{ duration: 100 }}>
  {#if promise}
    {#await promise}
      <div class="absolute inset-0 h-screen flex justify-center">
        <Loading />
      </div>
    {:then value}
      {#if value.data.length > 0}
        <div transition:fade={{ duration: 150 }}>
          <div class="flex flex-wrap gap-4 justify-center">
            {#each value.data as item (item.idMal)}
              <ListItem {item} />
            {/each}
          </div>
        </div>
      {:else}
      <ErrorMessage error="No hay resultados" message="No se han encontrado elementos con '{$route.search.get('q')}'"/>
        <div class="relative h-screen max-h-[60vh]">
          <div
            class="flex justify-center items-center absolute inset-0 flex-col gap-y-2"
          >
            <!-- <Fa icon={faTimesCircle} class="text-[4rem]" /> -->
            <!-- <span class="text-2xl">No items available</span> -->
          </div>
        </div>
      {/if}
    {:catch error}
      {error}
    {/await}
  {:else if items}
    <div transition:fade={{ duration: 150 }}>
      <div class="flex flex-wrap gap-4 justify-center">
        {#each items as item (item.idMal)}
          <ListItem {item} />
        {/each}
      </div>
    </div>
  {/if}
</div>
