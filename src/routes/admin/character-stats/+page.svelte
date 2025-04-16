<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { ls } from "$lib/components/ui/loading-progress/state.svelte";
  import { MatchingMode } from "$lib/features/er-api/shapes";
  import { untrack } from "svelte";
  import type { CharacterStat } from "../../api/character-stats/versions/[version]/mode/[mode]/+server";
  import CharacterStats from "./character-stats.svelte";

  let { data } = $props();

  let version = $state(data.currentVersion);
  let mode = $state<MatchingMode>(MatchingMode.Rank);

  $effect(() => {
    const _v = version;
    const _m = mode;

    untrack(() => update(_v, _m));
  });

  let stat = $state.raw<{ version: string; mode: number; stats: CharacterStat[] }>();

  function update(version: string, mode: number, update = false) {
    ls.do(async () => {
      if (update) {
        const res = await fetch(`/api/character-stats/versions/${version}/mode/${mode}`, {
          method: "POST",
        });
        if (!res.ok) throw res;
      }

      const res = await fetch(`/api/character-stats/versions/${version}/mode/${mode}`);
      if (!res.ok) throw res;
      const body = await res.json();
      stat = body;
    });
  }
</script>

<form
  onsubmit={async (e) => {
    e.preventDefault();
    update(version, mode, true);
  }}
>
  <label>
    버전
    <input bind:value={version} />
  </label>
  <label>
    모드
    <select bind:value={mode}>
      {#each [MatchingMode.Rank, MatchingMode.Normal, MatchingMode.Cobalt] as mode}
        <option value={mode}>{$LL.matchingMode[mode]()}</option>
      {/each}
    </select>
  </label>
  <button>갱신</button>
</form>

{#if stat != null}
  <div class="flex gap-x-4">
    <CharacterStats version={stat.version} mode={stat.mode} stats={stat.stats} />
    <CharacterStats version={stat.version} mode={stat.mode} stats={stat.stats} />
    <CharacterStats version={stat.version} mode={stat.mode} stats={stat.stats} />
  </div>
{/if}
