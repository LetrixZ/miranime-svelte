<script lang="ts">
  import { Link, route } from "@bjornlu/svelte-router";
  import Fa from "svelte-fa";
  import {
    faList,
    faHome,
    faSearch,
    faCaretRight,
  } from "@fortawesome/free-solid-svg-icons";
  import { genres } from "../utilts";
  import Icon, { addCollection } from "@iconify/svelte";
  import iconPack from "../genreIcons.js";
  addCollection(iconPack);
  import { genreCollapse } from "../stores";
  import { onMount } from "svelte";
  import Search from "../pages/Search.svelte";
  import SearchBox from "./nav/SearchBox.svelte";
  let isMenuOpen = false;
  let search: HTMLElement;
  let mounted;

  $: {
    $route;
    isMenuOpen = false;
  }

  $: {
    isMenuOpen ? openMenu() : closeMenu();
  }

  onMount(() => {
    mounted = true;
    const btn = document.querySelector("button.mobile-menu-button");
    const menu: HTMLElement = document.querySelector(".mobile-menu");
    document.body.addEventListener("resize", () => {
      if (btn.classList.contains("active"))
        menu.style.maxHeight = menu.scrollHeight + "px";
      else menu.style.maxHeight = "0";
    });
  });

  const openMenu = () => {
    if (mounted) {
      const btn = document.querySelector("button.mobile-menu-button");
      const menu: HTMLElement = document.querySelector(".mobile-menu");
      btn.classList.add("active");
      menu.style.maxHeight = menu.scrollHeight + "px";
      isMenuOpen = true;
    }
  };

  const closeMenu = () => {
    if (mounted) {
      const btn = document.querySelector("button.mobile-menu-button");
      const menu: HTMLElement = document.querySelector(".mobile-menu");
      btn.classList.remove("active");
      menu.style.maxHeight = "0";
      isMenuOpen = false;
    }
  };

  let searchText = $route.search.get("q") || "";
</script>

<nav class="md:shadow mb-4 sticky top-0 z-[5] bg-white dark:bg-dark">
  <div class="w-full mx-auto md:px-4 md:py-2">
    <div class="flex justify-between ">
      <div class="hidden md:flex  space-x-2">
        <li class="list-none">
          <Link to="/browse">
            <div class="nav-item">
              <Fa icon={faHome} />
              <span>Inicio</span>
            </div>
          </Link>
        </li>
        <li class="list-none">
          <Link to="/genres">
            <div class="nav-item">
              <Fa icon={faList} />
              <span>Géneros</span>
            </div>
          </Link>
        </li>
        <li class="list-none flex">
          <SearchBox {searchText} />
        </li>
      </div>
      <!-- Secondary Navbar items -->
      <div class="hidden md:flex items-center">
        {#if $route.params.genre}
          <li
            class="list-none cursor-pointer link-exact-active"
            on:click={() => ($genreCollapse = !$genreCollapse)}
          >
            <Link to={$route}>
              <div class="nav-item">
                <span>{genres[$route.params.genre]}</span>
              </div>
            </Link>
          </li>
        {/if}
      </div>
      <!-- Mobile menu button -->
      <div class="md:hidden z-[5] h-12 bg-white dark:bg-[#121212] sticky top-0 flex items-center w-full justify-between px-4 py-2 drop-shadow">
        <button
          class="outline-none mobile-menu-button"
          on:click={() => (isMenuOpen = !isMenuOpen)}
        >
          <svg
            class=" w-6 h-6 text-gray-500 hover:text-primary"
            x-show="!showMenu"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {#if $route.params.genre}
          <li
            class="list-none cursor-pointer link-exact-active text-sm"
            on:click={() => ($genreCollapse = !$genreCollapse)}
          >
            <Link to={$route}>
              <div class="nav-item">
                <span>{genres[$route.params.genre]}</span>
              </div>
            </Link>
          </li>
        {/if}
      </div>
    </div>
  </div>
  <div class="mobile-menu top-12 sticky md:hidden z-[5] bg-white dark:bg-[#121212] w-full max-h-0 overflow-hidden duration-200 ease-in-out drop-shadow">
    <ul class="flex flex-col space-y-1 pb-2">
      <li class="list-none">
        <Link to="/browse">
          <div class="nav-item w-full">
            <Fa icon={faHome} />
            <span>Inicio</span>
          </div>
        </Link>
      </li>
      <li class="list-none">
        <Link to="/genres">
          <div class="nav-item">
            <Fa icon={faList} />
            <span>Géneros</span>
          </div>
        </Link>
      </li>
      <li class="list-none flex">
        <SearchBox {searchText} mobile />
      </li>
    </ul>
  </div>
</nav>

<style lang="postcss" global>
  .nav-item {
    @apply dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-800 inline-flex items-center gap-x-1 p-2 rounded-md transition duration-[150] ease-linear;
  }

  .mobile-menu .nav-item {
    @apply px-4  w-full rounded-none;
  }

  a.link-exact-active .nav-item {
    @apply bg-primary text-white font-medium;
  }

  .mobile-menu .link-exact-active .nav-item {
    @apply bg-opacity-0 font-medium rounded-b-sm text-primary;
  }

  button.active path {
    @apply text-primary;
  }
</style>
