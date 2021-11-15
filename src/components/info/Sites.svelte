<script>
  import jkanime from "../../assets/jkanime.png";
  import otakustv from "../../assets/otakustv.png";
  import monoschinos from "../../assets/monoschinos.png";
  import animeid from "../../assets/animeid.png";
  import tioanime from "../../assets/tioanime.png";

  import { getSite } from "../../utilts";

  const logos = {
    jkanime,
    otakustv,
    monoschinos,
    animeid,
    tioanime,
  };

  export let sites;
  export let size = null;
  export let episode = null;
</script>

<div class="flex gap-x-2 justify-center items-center md:justify-end">
  {#each sites as site}
    <a href={getSite(site, episode)} target="_blank">
      <img
        src={logos[site.source.toLowerCase()]}
        alt="{site.source} logo"
        class:size-3={!size}
        class:size-4={size === 4}
        class:size-5={size === 5}
        class:size-6-={size === 6}
      />
    </a>
  {/each}
</div>
<style lang="postcss">
  .size-3 { @apply w-3 h-3 }
  .size-4 { @apply w-4 h-4 }
  .size-5 { @apply w-5 h-5 }
  .size-6 { @apply w-6 h-6 }
</style>
