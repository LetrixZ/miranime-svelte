<script lang="ts">
  import { makeRequest, genres } from "../utilts";
  import { route, Link } from "@bjornlu/svelte-router";
  import Loading from "../components/Loading.svelte";
  import { slide } from "svelte/transition";

  let promise = makeRequest("GENRES");
  let visible = false;
  $: visible = $route.matched.length > 1;

  import { genreCollapse } from "../stores";

  $: showCollapse = $genreCollapse;

  import { createLink } from "@bjornlu/svelte-router";

  const link = createLink("/genres/:genre");
  $: if ($link.isExactActive) {
    $genreCollapse = false;
  } else {
    $genreCollapse = true;
  }
</script>

<div class="mx-4 mt-2">
  {#await promise}
    <div class="absolute h-screen inset-0 flex justify-center">
      <Loading />
    </div>
  {:then value}
    {#if showCollapse}
      <div class="collapse-content" transition:slide>
        <div class="flex flex-wrap gap-3 justify-center">
          {#each Object.entries(value.data) as [genre, total]}
            <p class:is-active={$route.params.genre === genre}>
              <Link to="/genres/{genre}">
                <button class="flex group">
                  <span class="genre rounded-l bg-gray-100 group-hover:bg-gray-200 dark:bg-gray-700 dark:group-hover:bg-gray-800 px-1 py-0.5"
                    >{genres[genre]}</span
                  >
                  <span class="total bg-gray-200 group-hover:bg-gray-300 dark:bg-gray-800 dark:group-hover:bg-gray-900 px-2 py-0.5 rounded-r"
                    >{total}</span
                  >
                </button>
              </Link>
            </p>
          {/each}
        </div>
      </div>
    {/if}
  {/await}
  {#if visible}
    <div>
      <slot />
    </div>
  {/if}
</div>

<style lang="postcss">
  .is-active .genre {
    @apply bg-[#F5554A] dark:bg-primary-dark text-white;
  }
</style>
