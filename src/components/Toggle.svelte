<script>
  export let value = false;
  export let tooltip = null;
</script>

<div class:has-tooltip={tooltip}>
  <div
    class="w-14 h-8 flex items-center  rounded-full p-1 duration-300 cursor-pointer"
    title={tooltip}
    class:bg-gray-300={!value}
    class:bg-primary={value}
    on:click={() => (value = !value)}
  >
    <div
      class="bg-white w-6 h-6 rounded-full shadow-md transform duration-300"
      class:translate-x-6={value}
    />
  </div>
  <span class="text-black dark:text-white tooltip rounded shadow-sm p-1 bg-[#f8f8f8] border dark:bg-[#222222] mt-2">
    {tooltip}
  </span>
</div>

<style lang="postcss">
  .tooltip {
    @apply invisible absolute;
  }

  .has-tooltip:hover .tooltip {
    @apply visible z-50;
  }
</style>
