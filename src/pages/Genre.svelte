<script lang="ts">
  import { route, Link } from "@bjornlu/svelte-router";

  import { slide, fade } from "svelte/transition";
  import { makeRequest } from "../utilts";
  import ItemList from "./ItemList.svelte";
  import { loadedItems } from "../stores";
  let promise;
  let currentPage;
  let totalPages;

  let genre;

  currentPage = parseInt($route.search.get("p")) || 1;
  genre = $route.params.genre;

  $: {
    currentPage = parseInt($route.search.get("p")) || 1;
    genre = $route.params.genre;
  }

  $: {
    if (genre && currentPage) {  
      promise = makeRequest("GENRE", { genre: genre, page: currentPage });
      promise.then((v) => (totalPages = v.pages));
    }
  }

  // $: {
  //   genre = $route.params.genre;
  //   page = parseInt($route.search.get("p")) || 1;
  //   if (
  //     $loadedItems.options.genre === genre &&
  //     $loadedItems.options.page === page
  //   ) {
  //     totalPages = $loadedItems.options.totalPages;
  //     actualPage = $loadedItems.options.page;
  //   } else {
  //     makeRequest("GENRE", {
  //       genre,
  //       page,
  //     }).then((v) => {
  //       $loadedItems.options.genre = genre;
  //       $loadedItems.options.page = page;
  //       $loadedItems.options.totalPages = v.pages;
  //       $loadedItems.data = v.data;
  //     });
  //   }
  // }

  function createSubList(currentPage, totalPages) {
    let pages = [];
    if (totalPages) {
      if (currentPage > 4) {
        pages.push(1);
        pages.push("...");
      }
      if (currentPage > 2) pages.push(currentPage - 2);
      if (currentPage > 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage + 1 <= totalPages) pages.push(currentPage + 1);
      if (currentPage + 2 <= totalPages) pages.push(currentPage + 2);
      if (currentPage < totalPages - 2) {
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  }
</script>

<div transition:fade={{ duration: 150 }}>
  <nav class="px-1 md:px-4 flex flex-wrap gap-x-4 gap-y-2 justify-center py-2">
    {#each createSubList(currentPage, totalPages) as page}
      {#if page === "..."}
        <li
          class="list-none dark:hover:bg-gray-500 dark:bg-gray-700  px-3 py-1 rounded transition duration-75  pointer-events-none"
        >
          {page}
        </li>
      {:else}
        <Link to="/genres/{$route.params?.genre}?p={page}">
          <li
            class="cursor-pointer list-none dark:hover:bg-gray-500 dark:bg-gray-700 px-3 py-1 rounded transition duration-75"
            class:is-active={currentPage === page}
          >
            {page}
          </li>
        </Link>
      {/if}
    {/each}
  </nav>
  <ItemList {promise} />
</div>

<style lang="postcss">
  .is-active {
    @apply bg-primary;
  }
</style>
