<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { page } from "$app/state";
  import LL from "$i18n/i18n-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ls } from "$lib/components/ui/loading-progress/state.svelte";
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  import { MatchingMode } from "$lib/shared/er-api/shapes";
  import Stats from "$lib/features/user-stats/stats.svelte";
  import { numberOrNullable } from "$lib/utils/number/number-or-nullable";
  import { untrack } from "svelte";
  import Match from "./match.svelte";
  import Pagination from "./pagination.svelte";

  let { data } = $props();

  $effect(() => {
    untrack(() => ls.increase(0.5));
    data.isUpdatedPromise.then((isUpdated) => {
      untrack(() => ls.done());
      if (isUpdated) {
        invalidate(`users:${untrack(() => page.params.username)}`);
      }
    });
  });

  let mode = $derived(numberOrNullable(page.url.searchParams.get("mode")) ?? undefined);
  let currentPage = $derived(numberOrNullable(page.url.searchParams.get("page")) ?? 0);

  let Lmode = $derived((mode: MatchingMode) => $LL.matchingMode[mode]());

  function refresh() {
    return ls.do(() => invalidate(`users:${page.params.username}`));
  }
</script>

<div class="grid place-items-center py-8">
  <SearchForm username={data.user.name} />
</div>

<main
  class="container mx-auto flex flex-col gap-8 px-4 sm:w-105 lg:w-auto lg:flex-row-reverse lg:justify-center"
>
  <div class="flex flex-col gap-y-4 lg:w-94">
    <Button class="mx-auto flex w-full py-6" rounded="2xl" onclick={refresh} disabled={ls.show}>
      {$LL.refresh.text()} <kbd class="font-[unset]">{$LL.refresh.keyboard()}</kbd>
    </Button>
    <Stats
      stats={data.stats}
      {mode}
      name={data.user.name}
      level={data.user.level}
      rp={data.user.rp}
    />
  </div>
  <div class="flex flex-col gap-x-2 gap-y-4 lg:w-105">
    <div class="flex overflow-clip rounded-2xl bg-white">
      <a
        class="flex h-12 items-center px-4 transition-colors hover:bg-gray-100 aria-disabled:bg-gray-200"
        aria-disabled={mode == null}
        onclick={(e) =>
          e.currentTarget.getAttribute("aria-disabled") === "true" && e.preventDefault()}
        href={page.url.pathname}>{$LL.matchingMode.all()}</a
      >
      {#each [MatchingMode.Normal, MatchingMode.Rank, MatchingMode.Cobalt, MatchingMode.Union] as m}
        <a
          class="flex h-12 items-center px-4 transition-colors hover:bg-gray-100 aria-disabled:bg-gray-200"
          aria-disabled={mode === m}
          onclick={(e) =>
            e.currentTarget.getAttribute("aria-disabled") === "true" && e.preventDefault()}
          href="{page.url.pathname}?mode={m}">{Lmode(m)}</a
        >
      {/each}
    </div>
    <Pagination pathname={page.url.pathname} maxPages={data.maxPages} {mode} page={currentPage} />
    {#if data.matches.length > 0}
      {#each data.matches as match (match.matchId)}
        <Match {...match} me={data.user} />
      {/each}
    {:else}
      <div class="h-lvh">{$LL.recentMatches.noData()}</div>
    {/if}
    <Pagination pathname={page.url.pathname} maxPages={data.maxPages} {mode} page={currentPage} />
  </div>
</main>
<footer class="flex h-lvh justify-center p-4"></footer>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "F5") {
      e.preventDefault();
      refresh();
    }
  }}
/>
