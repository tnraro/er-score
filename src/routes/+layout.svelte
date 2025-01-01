<script lang="ts">
  import LoadingProgress from "$lib/components/ui/loading-progress/loading-progress.svelte";
  import { setGlobalData } from "$lib/global-state.svelte";
  import "../app.css";
  let { children, data } = $props();

  let characters = $derived(new Map(data.staticData.characters.map((c) => [c.code, c])));

  setGlobalData(() => ({
    characters,
  }));
</script>

<LoadingProgress />
{@render children()}
