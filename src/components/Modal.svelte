<script lang="ts">
  import "../animations.css";
  import { route, navigate } from "@bjornlu/svelte-router";
  import { onMount } from "svelte";
  import Fa from "svelte-fa";
  import { faTimes } from "@fortawesome/free-solid-svg-icons";

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let modalOpen;

  let modal;
  let modalBody;
  let mounted = false;

  function openModal() {
    if (mounted) {
      modal.classList.remove("hidden");
      modal.classList.add("fixed");
      document.body.classList.add("overflow-hidden");
    }
  }

  function closeModal() {
    if (modal && modalBody) {
      modal.classList.add("fadeOut");
      modalBody.classList.add("slideDownExit");
      document.body.classList.remove("overflow-hidden");
      setTimeout(() => {
        modal.classList.remove("fixed");
        modal.classList.add("hidden");
        modal.classList.remove("fadeOut");
        modalBody.classList.remove("slideDownExit");
        dispatch("close");
      }, 400);
    }
  }

  onMount(() => {
    mounted = true;
    openModal();
    window.onclick = function (event) {
      if (event.target == modal) {
        closeModal();
      }
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  $: {
    if (modalOpen) {
      openModal();
    } else {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeyDown} />

<div
  bind:this={modal}
  class="animated fadeIn z-10 inset-0 bg-gray-600 bg-opacity-50 overflow-y-hidden h-full w-full"
>
  <div
    bind:this={modalBody}
    class="animated slideUpEnter absolute w-full h-full lg:max-w-[90%] lg:max-h-[95%] xl:max-w-[65%] xl:max-h-[95%] md:inset-x-0 md:bottom-0 m-auto bg-white dark:bg-[#101010] rounded-t-md shadow-lg"
  >
    <div class="absolute right-0 top-0">
      <div
        class="relative z-10 top-0 right-0 text-gray-300 bg-black rounded-full bg-opacity-40 mx-1 my-2 w-6 h-6 hover:bg-opacity-60 md:text-base cursor-pointer hover:text-gray-100"
        on:click={() => closeModal()}
      >
        <Fa class="absolute inset-0 m-auto w-full h-full" icon={faTimes} />
      </div>
    </div>
    <slot />
  </div>
</div>

<!-- end of container -->
<style lang="postcss">
  .no-scrollbar {
    scrollbar-width: 0;
  }

  .no-scrollbar::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
</style>
