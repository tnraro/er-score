<script lang="ts">
  import { invalidate } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ls } from "$lib/components/ui/loading-progress/state.svelte";
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  import Match from "./match.svelte";
  import Stats from "./stats.svelte";

  let { data } = $props();

  function update() {
    return ls.do(() => invalidate(`/users/${data.username}`));
  }
</script>

<div class="grid place-items-center py-8">
  <SearchForm username={data.username} />
</div>

<main class="container mx-auto space-y-8">
  <Stats matches={data.matches} username={data.username} />
  <div>
    <Button class="mx-auto flex" onclick={update} disabled={ls.show}>
      전적 갱신 <kbd class="font-[unset] before:content-['['] after:content-[']']">F5</kbd>
    </Button>
  </div>
  <div class="flex flex-wrap justify-center gap-x-2 gap-y-4">
    {#each data.matches as match (match.id)}
      <Match {...match} me={data.username} />
    {/each}
  </div>
</main>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "F5") {
      e.preventDefault();
      update();
    }
  }}
/>
