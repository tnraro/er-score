<script lang="ts">
  import { setLocale } from "$i18n/i18n-svelte";
  import LoadingProgress from "$lib/components/ui/loading-progress/loading-progress.svelte";
  import { setupStaticData } from "$lib/features/static-data/browser";
  import { onMount } from "svelte";
  import "../app.css";
  let { children, data } = $props();

  setLocale(data.locale);

  onMount(async () => {
    await setupStaticData();
  });
</script>

<LoadingProgress />
{@render children()}
