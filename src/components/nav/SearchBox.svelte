<script lang="ts">
  import { Link, navigate } from "@bjornlu/svelte-router";
  import Fa from "svelte-fa";
  import { faSearch } from "@fortawesome/free-solid-svg-icons";
  import MediaQuery from "svelte-media-query";
  import { onMount } from "svelte";
  export let searchText = "";
  export let mobile = false;

  const onSubmit = () => {
    navigate("/search?" + new URLSearchParams({ q: searchText }));
    searchBox.blur()
  };

  let searchBox;

  onMount(() => {
    if (!mobile) document.addEventListener('keydown', onKeyPress)
  })

  const onKeyPress = (e) => {    
    if (searchBox) {
      if (e.key === "/" && document.activeElement !== searchBox) {
        e.preventDefault();
        searchBox.focus();
      }
    }
  };
</script>

<div class="hidden md:flex space-x-2">
  <Link to={{ path: "/search", search: { q: searchText } }}>
    <span class="nav-item h-full">
      <Fa icon={faSearch} />
    </span>
  </Link>
  <form class="w-full" on:submit|preventDefault={onSubmit}>
    <input
      bind:this={searchBox}
      bind:value={searchText}
      class="w-[20vw] border-2 rounded bg-gray-200 focus:bg-white text-black px-1 h-full"
    />
    <input type="submit" style="display: none" />
  </form>
</div>

<div class="flex md:hidden space-x-2 w-full px-4">
  <form class="w-full" on:submit|preventDefault={onSubmit}>
    <input
      bind:value={searchText}
      class="w-full h-10 border-2 rounded bg-white text-black px-1"
    />
    <input type="submit" style="display: none" />
  </form>
  <Link to={{ path: "/search", search: { q: searchText } }}>
    <span class="nav-item h-full text-xl">
      <Fa icon={faSearch} />
    </span>
  </Link>
</div>
