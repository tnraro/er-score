<script lang="ts">
  import { setGlobalData } from "$lib/global-state.svelte";
  import "../app.css";
  let { children, data } = $props();

  let characters = $derived(new Map(data.staticData.characters.map((c) => [c.code, c])));

  setGlobalData(() => ({
    characters,
  }));
</script>

{@render children()}
