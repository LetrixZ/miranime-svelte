<script lang="ts">
  import { route } from "@bjornlu/svelte-router";
  import { makeRequest } from "../utilts";
  import ItemList from "./ItemList.svelte";
  import { pageName } from "../stores";

  let promise, currentPage, search, totalPages;

  $: {
    currentPage = parseInt($route.search.get("p")) || 1;
    search = $route.search.get("q");
  }

  $pageName = "Buscador";
  $: {
    if (search && currentPage) {
      promise = makeRequest("SEARCH", { q: search, page: currentPage });
      promise.then((v) => {
        totalPages = v.pages;
        $pageName = `${search} tiene ${v.data.length} resultados`
      });
    }
  }
</script>

<div>
  <ItemList {promise} />
</div>
