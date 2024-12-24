<script lang="ts">
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  import Match from "./match.svelte";
  import Stats from "./stats.svelte";

  let { data } = $props();
</script>

<div class="grid place-items-center py-8">
  <SearchForm username={data.username} />
</div>

<main class="container mx-auto space-y-8">
  <Stats matches={data.matches} username={data.username} />
  <div class="flex flex-wrap justify-center gap-x-2 gap-y-4">
    {#each data.matches as match (match.id)}
      <Match {...match} me={data.username} />
    {/each}
  </div>
</main>
