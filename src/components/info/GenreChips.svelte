<script lang="ts">
  import { Link, navigate } from "@bjornlu/svelte-router";

  import { createEventDispatcher } from "svelte";
  import { modalStatus } from "../../stores";
  import { genres } from "../../utilts";

  export let genreList: string[];
  const dispatcher = createEventDispatcher();
</script>

<p class="flex flex-wrap md:justify-start -m-1 justify-center">
  {#each genreList as genre}
    <Link
      class="max-w-full flex-initial text-[0.75rem] uppercase font-normal rounded-full px-3 py-1 m-1 text-white
  cursor-pointer duration-100 ease-in-out bg-primary hover:bg-red-600 visited:text-white"
      to="/genres/{genre}"
      customHandler={() => ($modalStatus.redirect = true)}
    >
      {genres[genre]}
    </Link>
  {/each}
</p>
