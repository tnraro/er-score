<script lang="ts">
  import { LL } from "$i18n/i18n-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import ProgressRange from "$lib/components/ui/progress/progress-range.svelte";
  import Progress from "$lib/components/ui/progress/progress.svelte";
  import Score from "$lib/features/score/score.svelte";
  import Tier from "$lib/features/tier/tier.svelte";
  import { formatNumber } from "$lib/utils/number/format-number";
  import { MatchingMode } from "../../shared/er-api/shapes";
  import type { UserStats } from "./select-user-stats.server";
  import { style } from "./stats-style";
  import StatsTable from "./stats-table.svelte";

  interface Props {
    stats: UserStats;
    mode?: number | null | undefined;
    name: string;
    level: number | null;
    rp: number | null;
  }

  let { stats, mode, name, level, rp }: Props = $props();

  let mostPlayedCharacterId = $derived.by(() => {
    let stat = stats
      .slice()
      .sort((a, b) => b.count - a.count)
      .at(0);

    return stat?.characterId;
  });

  let playedMatches = $derived(stats.reduce((a, x) => a + x.count, 0));

  let isOpen = $state(false);

  let Lmode = $derived((mode: MatchingMode) => $LL.matchingMode[mode]());

  let statSummary = $derived.by(() => {
    const goodStats = [];
    const badStats = [];
    const grayStats = [];
    for (const stat of stats) {
      const scoreE = e(stat.scoreAvg, 0.5);
      const halfRateE = e(stat.halfRateAvg, 0.5);
      const scale = (scoreE + halfRateE) * 0.5;
      if (scoreE >= 0.5 && halfRateE >= 0.5) {
        goodStats.push({
          characterId: stat.characterId,
          scale,
          scoreE,
          halfRateE,
          count: stat.count,
        });
      } else if (scoreE < 0.5 && halfRateE < 0.5) {
        badStats.push({
          characterId: stat.characterId,
          scale,
          scoreE,
          halfRateE,
          count: stat.count,
        });
      } else {
        grayStats.push({
          characterId: stat.characterId,
          scale,
          scoreE,
          halfRateE,
          count: stat.count,
        });
      }
      function e(x: number, e: number) {
        return (x * stat.count + e * 10) / (stat.count + 10);
      }
    }

    goodStats.sort((a, b) => b.scale - a.scale);
    badStats.sort((a, b) => a.scale - b.scale);
    grayStats.sort((a, b) => a.scale - b.scale);
    return {
      goodStats,
      badStats,
      grayStats,
    };
  });

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
    <div class="flex flex-col">
      {#if level != null}
        <div class="text-xs leading-none">Lv {level}</div>
      {/if}
      <div class="flex items-center gap-x-2">
        <a class={c.headerName()} href="/users/{encodeURIComponent(name)}">{name}</a>
        {#if rp != null}
          <div class="flex gap-x-1 text-sm">
            <Tier {rp} />
          </div>
        {/if}
      </div>
    </div>
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
    <div class="overflow-x-auto px-2">
      <div class="flex">
        {#each statSummary.goodStats as stat, i (stat.characterId)}
          {@const size = statSummary.goodStats.length}
          <div
            class="z-(--z) -ml-2 rounded-full border border-(--b)"
            style:--z={size - i}
            style:--hue="132.35"
            style:--b="oklch(0.5 0.12 var(--hue))"
            style:--bg="oklch({0.75 + (1 - stat.scale) * 0.2}
            {0.25 - (1 - stat.scale) * 0.2} var(--hue))"
            title="score: {stat.scoreE.toFixed(1)} / half rate: {Math.round(
              stat.halfRateE * 100,
            )}% / count: {stat.count}"
          >
            <CharacterAvatar
              characterId={stat.characterId}
              size="sm"
              class="border-2 border-transparent bg-(--bg)"
            />
          </div>
        {/each}
      </div>
      <div class="flex">
        {#each statSummary.badStats as stat, i (stat.characterId)}
          {@const size = statSummary.badStats.length}
          <div
            class="z-(--z) -ml-2 rounded-full border border-(--b)"
            style:--z={size - i}
            style:--hue="28.3"
            style:--b="oklch(0.5 0.12 var(--hue))"
            style:--bg="oklch({0.75 + stat.scale * 0.2}
            {0.25 - stat.scale * 0.2} var(--hue))"
            title="score: {stat.scoreE.toFixed(1)} / half rate: {Math.round(
              stat.halfRateE * 100,
            )}% / count: {stat.count}"
          >
            <CharacterAvatar
              characterId={stat.characterId}
              size="sm"
              class="border-2 border-transparent bg-(--bg)"
            />
          </div>
        {/each}
      </div>
      <div class="flex">
        {#each statSummary.grayStats as stat, i (stat.characterId)}
          {@const size = statSummary.grayStats.length}
          <div
            class="z-(--z) -ml-2 rounded-full border border-(--b)"
            style:--z={size - i}
            style:--b="oklch(0.5 0 0)"
            style:--bg="oklch({0.75 + stat.scale * 0.2} 0 0)"
            title="score: {stat.scoreE.toFixed(1)} / half rate: {Math.round(
              stat.halfRateE * 100,
            )}% / count: {stat.count}"
          >
            <CharacterAvatar
              characterId={stat.characterId}
              size="sm"
              class="border-2 border-transparent bg-(--bg)"
            />
          </div>
        {/each}
      </div>
    </div>
    <StatsTable>
      {#each filteredStats as stat (stat.characterId)}
        <tr class={c.tableRow()}>
          <td class="text-center text-sm">{stat.count}</td>
          <td><CharacterAvatar characterId={stat.characterId} size="sm" rounded="md" /></td>
          <td><Score score={stat.scoreAvg} /></td>
          <td class="text-center text-sm"
            >{Math.round(stat.halfRateAvg * 100)}%
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
