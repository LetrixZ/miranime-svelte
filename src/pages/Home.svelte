<script lang="ts">
  import ItemList from "./ItemList.svelte";
  import type { Response } from "../Anime";
  import { makeRequest } from "../utilts";

  let promise;
  $: {
    promise = makeRequest("ONGOINGS");
  }
  
</script>

<div>
  <ItemList {promise} />
</div>
