<script lang="ts">
  import type { AnimeItem } from "../Anime";
  import { navigate, route } from "@bjornlu/svelte-router";
  import { get } from "svelte/store";

  export let item: AnimeItem;
</script>

<div
  tabindex="0"
  class="item"
  on:click={() => {
    $route.search.append("item", item.idMal.toString());
    navigate($route);
  }}
>
  <div class="image-container">
    <img src={item.poster} alt="{item.title} poster" />
  </div>
  <div class="h-14 md:h-24 flex justify-center items-center">
    <h1
      class="text-base font-medium max-lines text-center duration-100 ease-in-out text-black dark:text-white"
    >
      {item.title}
    </h1>
  </div>
</div>

<style lang="postcss" global>
  .item {
    @apply w-[42.5%] md:w-40 lg:w-56 xl:w-60 cursor-pointer transition-all duration-150 ease-in-out transform
    hover:translate-y-1 hover:scale-110 hover:z-[2];
  }

  .image-container {
    @apply relative pb-[144%];
  }
  .image-container img {
    @apply w-full h-full object-cover absolute rounded-sm shadow-md;
  }

  .max-lines {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  @screen md {
    .max-lines {
      -webkit-line-clamp: 3;
    }
  }
</style>
