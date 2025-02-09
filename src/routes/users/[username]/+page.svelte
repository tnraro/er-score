<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ls } from "$lib/components/ui/loading-progress/state.svelte";
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  import { MatchingMode } from "$lib/features/er-api/shapes";
  import Stats from "$lib/features/user-stats/stats.svelte";
  import { Lmode } from "$lib/i18n/mode";
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
        invalidateAll();
      }
    });
  });

  let mode = $derived(numberOrNullable(page.url.searchParams.get("mode")) ?? undefined);
  let currentPage = $derived(numberOrNullable(page.url.searchParams.get("page")) ?? 0);

  function update() {
    return ls.do(() => invalidateAll());
  }
</script>

<div class="grid place-items-center py-8">
  <SearchForm username={data.user.name} />
</div>

<main
  class="container mx-auto flex flex-col gap-8 px-4 sm:w-105 lg:w-auto lg:flex-row-reverse lg:justify-center"
>
  <div class="flex flex-col gap-y-4 lg:w-94">
    <Button class="mx-auto flex w-full py-6" rounded="2xl" onclick={update} disabled={ls.show}>
      전적 갱신 <kbd class="font-[unset]">[F5]</kbd>
    </Button>
    <Stats stats={data.stats} {mode} username={data.user.name} />
  </div>
  <div class="flex flex-col gap-x-2 gap-y-4 lg:w-105">
    <div class="flex overflow-clip rounded-2xl bg-white">
      <a
        class="flex h-12 items-center px-4 transition-colors hover:bg-gray-100 aria-disabled:bg-gray-200"
        aria-disabled={mode == null}
        onclick={(e) =>
          e.currentTarget.getAttribute("aria-disabled") === "true" && e.preventDefault()}
        href={page.url.pathname}>전체</a
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
      <div class="h-lvh">정보가 없습니다.</div>
    {/if}
    <Pagination pathname={page.url.pathname} maxPages={data.maxPages} {mode} page={currentPage} />
  </div>
</main>
<footer class="flex h-lvh justify-center p-4"></footer>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "F5") {
      e.preventDefault();
      update();
    }
  }}
/>
