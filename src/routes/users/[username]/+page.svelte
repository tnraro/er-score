<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { navigating, page } from "$app/state";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ls } from "$lib/components/ui/loading-progress/state.svelte";
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  import StatsSkeleton from "$lib/domains/user-stats/stats-skeleton.svelte";
  import Stats from "$lib/domains/user-stats/stats.svelte";
  import type { PageData } from "./$types.js";
  import Match from "./match.svelte";

  let { data } = $props();

  type Stat = Awaited<PageData["staleStatsPromise"]>[0];
  let stats = $state.raw<Stat[]>();
  $effect(() => {
    data.staleStatsPromise.then((x) => {
      stats = x;
    });
  });
  type Matches = Awaited<PageData["staleMatchesPromise"]>[0];
  let matches = $state.raw<Matches[]>();
  $effect(() => {
    data.staleMatchesPromise.then((x) => {
      matches = x;
    });
  });
  $effect(() => {
    data.freshPromise.then((x) => {
      if (x?.stats.status === "fulfilled") stats = x.stats.value;
      if (x?.matches.status === "fulfilled") matches = x.matches.value;
      isLoading = false;
    });
  });
  let isLoading = $state(true);
  $effect(() => {
    if (navigating.complete != null) {
      isLoading = true;
    }
  });

  function update() {
    return ls.do(() => invalidate(`/users/${page.params.username}`));
  }
</script>

<div class="grid place-items-center py-8">
  <SearchForm username={data.user.name} />
</div>

<main class="container mx-auto space-y-8">
  {#if stats != null}
    <Stats {stats} username={data.user.name} />
  {:else}
    <StatsSkeleton />
  {/if}
  <div>
    <Button class="mx-auto flex" onclick={update} disabled={ls.show || isLoading}>
      전적 갱신 <kbd class="font-[unset]">[F5]</kbd>
    </Button>
  </div>
  <div class="flex flex-wrap justify-center gap-x-2 gap-y-4">
    {#if matches != null}
      {#if isLoading && matches.length < 6}
        {#each Array.from({ length: 3 }, (_, i) => i) as id (id)}
          <div
            class="flex h-70 w-105 flex-col gap-y-4 rounded-2xl border bg-zinc-50 p-4 shadow-xs"
          ></div>
        {/each}
      {:else}
        {#each matches as match (match.id)}
          <Match {...match} me={data.user} />
        {/each}
      {/if}
    {/if}
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
