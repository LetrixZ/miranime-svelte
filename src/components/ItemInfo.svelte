<script lang="ts">
  import { slide, fade } from "svelte/transition";
  import Fa from "svelte-fa";
  import { faPlay } from "@fortawesome/free-solid-svg-icons";
  import "../animations.css";
  import { createEventDispatcher } from "svelte";
  import type { AnimeItem } from "../utilts";
  import { seasons, makeRequest } from "../utilts";
  import GenreChips from "./info/GenreChips.svelte";
  import Loading from "./Loading.svelte";
  import Sites from "./info/Sites.svelte";
  import ErrorMessage from "./ErrorMessage.svelte";
  import { route } from "@bjornlu/svelte-router";
  import { pageName } from "../stores";
  import EpisodeItem from "./info/EpisodeItem.svelte";
import EpisodeList from "./info/EpisodeList.svelte";

  // Declarations
  export let id: string = null;
  let showTrailer = false;
  let scrollY;
  let imgContainer;

  const onScroll = (e) => {
    scrollY = e.target.scrollTop;
  };

  let promise: Promise<AnimeItem>;
  if (id) {
    promise = makeRequest("ITEM", { idMal: id });
    promise.then((v) => {
      $pageName = v.title;
    });
  }

  $: {
    if (showTrailer) {
      imgContainer?.classList.remove("to-normal");
      imgContainer?.classList.add("to-wide");
    } else {
      imgContainer?.classList.remove("to-wide");
      imgContainer?.classList.add("to-normal");
    }
  }
</script>

{#await promise}
  <div class="h-full flex justify-center">
    <Loading />
  </div>
{:then selectedItem}
  {#if selectedItem}
    <div class="overflow-auto h-full no-scrollbar" on:scroll={onScroll}>
      <div
        bind:this={imgContainer}
        class="item-cover relative animated ease-in-out"
      >
        <img
          src={selectedItem.banner || selectedItem.poster}
          class="w-full h-full object-cover absolute bottom-0 sm:hidden"
          style="height: {100 - scrollY * 0.05}%"
          alt="Anime cover"
        />
        <img
          src={selectedItem.banner || selectedItem.poster}
          class="w-full h-full object-cover absolute bottom-0 hidden sm:block"
          alt="Anime cover"
        />
        <div class="w-full h-full absolute bg-black opacity-0" />
        <div class="bg-black bg-opacity-25 w-full h-full absolute">
          <div
            class="absolute bottom-0 right-0 left-0 text-white text-center p-2"
          >
            <h1
              class="text-2xl lg:text-3xl xl:text-[2.5rem] font-medium font-display mb-2"
            >
              {selectedItem.title}
            </h1>
          </div>
          {#if selectedItem.trailer}
            <div class="absolute top-0 h-full w-full flex">
              <div class="m-auto">
                <button
                  class="text-white group text-center flex flex-col justify-center items-center"
                  on:click={() => (showTrailer = true)}
                >
                  <Fa
                    class="text-[2rem]  group-hover:text-primary"
                    icon={faPlay}
                  />
                  <span>Play trailer</span>
                </button>
              </div>
            </div>
          {/if}
          {#if showTrailer && selectedItem.trailer}
            <div
              class="absolute inset-0 w-full h-full animated"
              transition:fade
            >
              <iframe
                title="{selectedItem.title} trailer"
                src="{selectedItem.trailer}&autoplay=0"
                allowfullscreen
                class="w-full h-full"
              />
            </div>
          {/if}
        </div>
      </div>
      {#if showTrailer}
        <div class="absolute w-full text-left mx-4 mt-4">
          <button
            class="rounded-full font-medium text-white text-sm px-2 py-1 duration-100  ease-in-outbg-primary hover:bg-red-600 dark:bg-gray-800 dark:hover:bg-gray-700"
            transition:fade={{ duration: 150 }}
            on:click={() => (showTrailer = false)}
          >
            Hide trailer
          </button>
        </div>
      {/if}
      <div class="info px-4 md:px-12 py-3">
        <div class="text-center">
          <p class="font-semibold text-sm uppercase text-gray-800 dark:text-gray-200">Sinónimos</p>
          {#each [...new Set(selectedItem.synonyms)].splice(0, 3) as synonym}
            <p class="">{synonym}</p>
          {/each}
        </div>
        <div
          class="flex justify-between my-2 flex-wrap flex-col md:flex-row items-center gap-y-4 mt-2"
        >
          <div class="order-1 md:order-0 flex flex-col gap-y-2">
            <p
              class="text-gray-800 dark:text-gray-200 text-sm font-semibold text-center md:text-left"
            >
              <span class="uppercase">{seasons[selectedItem.season]}</span>
              {selectedItem.year}
            </p>
            <GenreChips genreList={selectedItem.genres} />
          </div>
          <div class="flex gap-y-2 flex-col order-0 md:order-1">
            <span
              class="text-gray-800 dark:text-gray-200 text-sm font-semibold text-center uppercase md:text-right"
              >Disponible en</span
            >
            <Sites sites={selectedItem.sites} size={6} />
          </div>
        </div>
        <p class="md:text-lg font-normal">
          <!-- {selectedItem.synopsis} -->
        </p>
        <hr class="my-4"/>
        <EpisodeList episodes={selectedItem.episodes} sources={selectedItem.sites}/>
        <!-- {#each Array.from(new Array(selectedItem.episodes || 0), (x, i) => i + 1) as number} -->
          <!-- <EpisodeItem episode={number} sources={selectedItem.sites} /> -->
        <!-- {/each} -->
      </div>
    </div>
  {:else}{/if}
{:catch error}
  <ErrorMessage
    error="No existe este anime"
    message="No se han encontrado un anime con MAL ID '{id}'"
  />
{/await}

<style lang="postcss" global>
  .no-scrollbar {
    scrollbar-width: 0;
  }

  .no-scrollbar::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .no-trailer {
    @apply pb-[100%] sm:pb-[40%];
  }

  .trailer {
    @apply pb-[56.25%];
  }

  :root {
    --pb: 70%;
  }

  @screen sm {
    :root {
      --pb: 40%;
    }
  }

  @keyframes normal {
    from {
      padding-bottom: 56.25%;
    }
    to {
      padding-bottom: var(--pb);
    }
  }

  .to-normal {
    animation-name: normal;
  }

  @keyframes wide {
    from {
      padding-bottom: var(--pb);
    }
    to {
      padding-bottom: 56.25%;
    }
  }

  .to-wide {
    animation-name: wide;
  }
</style>
