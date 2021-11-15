<script lang="ts">
  import Sites from "./Sites.svelte";

  export let episode;
  export let sources;
</script>

<!-- <div class="py-2"> -->
  <!-- <div class="flex flex-col md:flex-row gap-x-4 gap-y-2 flex-wrap justify-center md:justify-between"> -->
  <div class="flex flex-wrap md:justify-start -m-1 justify-center">
    <!-- <div>Episodio {episode}</div> -->
    <!-- <div>avion</div> -->
    <span class="text-center md:text-left md:list-item list-inside text-lg">Episodio {episode}</span>
    <Sites sites={sources} size={5} {episode}/>
  </div>
<!-- </div> -->
