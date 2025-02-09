<script lang="ts">
  import { LL } from "$i18n/i18n-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import ProgressRange from "$lib/components/ui/progress/progress-range.svelte";
  import Progress from "$lib/components/ui/progress/progress.svelte";
  import Score from "$lib/features/score/score.svelte";
  import { formatNumber } from "$lib/utils/number/format-number";
  import type { MatchingMode } from "../er-api/shapes";
  import type { UserStats } from "./select-user-stats.server";
  import { style } from "./stats-style";
  import StatsTable from "./stats-table.svelte";

  interface Props {
    stats: UserStats;
    mode?: number | null | undefined;
    username: string;
  }

  let { stats, mode, username }: Props = $props();

  let mostPlayedCharacterId = $derived.by(() => {
    let stat = stats
      .slice()
      .sort((a, b) => b.count - a.count)
      .at(0);

    return stat?.characterId;
  });

  let playedMatches = $derived(stats.reduce((a, x) => a + x.count, 0));

  let isOpen = $state(false);

  let Lmode = $derived((mode: MatchingMode) => $LL.matchingMode[mode]?.() ?? mode);

  const previewSize = 3;
  let filteredStats = $derived(isOpen ? stats : stats.slice(0, previewSize));

  let maxDamageDealtToPlayers = $derived(
    Math.max(...stats.map((stat) => stat.damageDealtToPlayersAvg)),
  );

  const c = style();
</script>

<div class={c.container()}>
  <div class={c.header()}>
    <CharacterAvatar characterId={mostPlayedCharacterId ?? 0} />
    <div class={c.headerName()}>{username}</div>
  </div>
  <div>
    <div class={c.tableLabel()}>
      {#if mode == null}
        {$LL.matchingMode.all()}
      {:else}
        {Lmode(mode)}
      {/if}
      · {$LL.stats.recentNDays({ n: 14 })}
      {#if playedMatches >= 100}
        {$LL.stats.limitHint({ limit: 100 })}
      {/if}
    </div>
    <StatsTable>
      {#each filteredStats as stat (stat.characterId)}
        <tr class={c.tableRow()}>
          <td class="text-center text-sm">{stat.count}</td>
          <td><CharacterAvatar characterId={stat.characterId} size="sm" rounded="md" /></td>
          <td><Score score={stat.scoreAvg} /></td>
          <td class="text-center text-sm"
            >{stat.halfRateAvg.toFixed(1)}
            <Progress class="overflow-hidden rounded-full" value={stat.halfRateAvg} max={1}>
              <ProgressRange color="yellow" />
            </Progress></td
          >
          <td class="text-right text-sm">
            <div>
              <span class="text-right text-xs font-light">
                {formatNumber(Math.round(stat.damageDealtToPlayersAvg))}
              </span>

              <Progress
                class="overflow-hidden rounded-full"
                value={stat.damageDealtToPlayersAvg}
                max={maxDamageDealtToPlayers}
              >
                <ProgressRange color="red" />
              </Progress>
            </div>
          </td>
        </tr>
      {/each}
    </StatsTable>
  </div>
  {#if stats.length > previewSize}
    <Button variant="secondary" class="w-full" onclick={() => (isOpen = !isOpen)}
      >{isOpen ? $LL.button.close() : $LL.button.open()}</Button
    >
  {/if}
</div>
