<script lang="ts">
  import { page } from "$app/state";
  import LL from "$i18n/i18n-svelte.js";
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  import { MatchingMode } from "$lib/shared/er-api/shapes.js";
  import { style } from "$lib/features/user-stats/stats-style.js";
  import Stats from "$lib/features/user-stats/stats.svelte";

  let { data } = $props();

  const modes = $derived.by(() => {
    const result = [];
    const url = new URL(page.url);
    url.searchParams.delete("mode");
    result.push({
      id: -1,
      value: null,
      href: url.href,
      name: $LL.matchingMode.all(),
    });
    for (const m of [
      MatchingMode.Normal,
      MatchingMode.Rank,
      MatchingMode.Cobalt,
      MatchingMode.Union,
    ]) {
      const url = new URL(page.url);
      url.searchParams.set("mode", String(m));
      result.push({
        id: m,
        value: m,
        href: url.href,
        name: $LL.matchingMode[m](),
      });
    }
    return result;
  });

  const c = style();
</script>

<div class="grid place-items-center py-8">
  <SearchForm />
</div>

<div class="mx-auto mb-4 flex overflow-clip rounded-2xl bg-white lg:w-94">
  {#each modes as m (m.id)}
    <a
      class="flex h-12 items-center px-4 transition-colors hover:bg-gray-100 aria-disabled:bg-gray-200"
      aria-disabled={data.mode == m.value}
      onclick={(e) =>
        e.currentTarget.getAttribute("aria-disabled") === "true" && e.preventDefault()}
      href={m.href}>{m.name}</a
    >
  {/each}
</div>
<div class="flex flex-wrap justify-center gap-4">
  {#each data.results as result}
    <div class="lg:w-94">
      {#await result.promise}
        <div class={c.container()}>
          <div class={c.header()}>
            <CharacterAvatar characterId={0} />
            <div class="flex flex-col">
              <div class={c.headerName()}>{result.username}</div>
            </div>
          </div>
        </div>
      {:then { stats, user }}
        <Stats level={user.level} name={user.name} rp={user.rp} {stats} mode={data.mode} />
      {:catch e}
        <div class={c.container()}>
          <div class="font-black">
            {#if e instanceof Response}
              {e.statusText}
            {:else}
              Error
            {/if}
          </div>
        </div>
      {/await}
    </div>
  {/each}
</div>
