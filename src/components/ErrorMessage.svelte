<script lang="ts">
  export let error = null;
  export let message = null;
</script>

<div class="absolute inset-0 flex items-center text-center justify-center m-auto w-full h-full flex-col">
  {#if error}
  <h1 class="text-4xl font-semibold">{error}</h1>
  {/if}
  {#if message}
  <h2 class="text-2xl">{message}</h2>
  {/if}
</div>