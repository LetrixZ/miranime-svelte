<script lang="ts">
	import { RouterView, route, navigate } from "@bjornlu/svelte-router";
	import ItemInfo from "./components/ItemInfo.svelte";
	import Modal from "./components/Modal.svelte";
	import Nav from "./components/Nav.svelte";
	import Head from "./Head.svelte";
	import { theme } from "./stores";
	theme.useLocalStorage();

	$: console.log($route);

	$: {
		if ($route.path == "/") navigate("/browse", true);
		if (
			($route.search.get("item") || $route.params.id) &&
			!$route.params["wild"]
		) {
			$modalStatus.visible = true;
			$modalStatus.open = true;
		} else {
			$modalStatus.open = false;
		}
	}

	import { modalStatus } from "./stores";

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key == "T") {
			if ($theme === "dark") $theme = "light";
			else if ($theme === "light") $theme = "dark";
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<Head />
<main class:dark={$theme === "dark"}>
	<div
		class="w-full min-h-screen bg-white dark:bg-[#121212] text-black dark:text-white transition duration-[150] ease-linear"
	>
		<Nav />
		<RouterView />
		{#if $modalStatus.visible}
			<Modal
				modalOpen={$modalStatus.open}
				on:close={() => {
					$modalStatus.visible = false;
					if (!$modalStatus.redirect) {
						$route.search.delete("item");
						if ($route.params.id) navigate("/");
						navigate($route);
					}
				}}
			>
				<ItemInfo id={$route.search.get("item") || $route.params.id} />
			</Modal>
		{/if}
	</div>
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	body {
		scrollbar-width: 0;
	}

	body::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	.nav-item {
		@apply dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-800 inline-flex items-center gap-x-1 p-2 rounded-md transition duration-[150] ease-linear;
	}

	a.link-exact-active .nav-item {
		@apply bg-primary text-white font-medium;
	}
</style>
