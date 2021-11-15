<script>
  import { pageName } from './stores.js'

  $: title = $pageName ? `${$pageName} - Miranime` : 'Miranime'

  $: {
    document.title = title
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>