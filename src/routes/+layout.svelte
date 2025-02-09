<script lang="ts">
  import { setLocale } from "$i18n/i18n-svelte";
  import LoadingProgress from "$lib/components/ui/loading-progress/loading-progress.svelte";
  import { setGlobalData } from "$lib/global-state.svelte";
  import "../app.css";
  let { children, data } = $props();

  let characters = $derived(new Map(data.staticData.characters.map((c) => [c.code, c])));
  let items = $derived(new Map(data.staticData.items.map((c) => [c.code, c])));

  setLocale(data.locale);

  setGlobalData(() => ({
    characters,
    items,
  }));
</script>

<LoadingProgress />
{@render children()}
