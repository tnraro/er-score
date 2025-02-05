<script lang="ts">
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import Score from "$lib/components/ui/score/score.svelte";
  import { Lmode } from "$lib/i18n/mode";
  import type { UserStats } from "./query-user-stats.server";
  import { style } from "./stats-style";
  import StatsTable from "./stats-table.svelte";

  interface Props {
    stats: UserStats;
    username: string;
  }

  let { stats, username }: Props = $props();

  let mostPlayedCharacterId = $derived.by(() => {
    let stat = stats
      .slice()
      .sort((a, b) => b.count - a.count)
      .at(0);

    return stat?.mostPlayedCharacterId;
  });

  let playedMatches = $derived(stats.reduce((a, x) => a + x.count, 0));

  function formatSd(stat: (typeof stats)[0]) {
    if (stat.count < 3 || stat.scoreSd == null) return "표본 부족";
    if (stat.scoreSd > 1) return "기복 큼";
    if (stat.scoreSd < 0.5) return "기복 작음";
    return "기복 보통";
  }
  const c = style();
</script>

<div class={c.container()}>
  <div class={c.header()}>
    <CharacterAvatar characterId={mostPlayedCharacterId ?? 0} />
    <div class={c.headerName()}>{username}</div>
  </div>
  <div>
    <div class={c.tableLabel()}>
      최근 14일간
      {#if playedMatches >= 100}
        (최대 100경기)
      {/if}
    </div>
    <StatsTable>
      {#each stats as stat (stat.mode)}
        <tr class={c.tableRow()}>
          <td class="text-sm">{Lmode(stat.mode!)}</td>
          <td class="text-center text-sm">{stat.count}</td>
          <td
            ><CharacterAvatar characterId={stat.mostPlayedCharacterId} size="sm" rounded="md" /></td
          >
          <td><Score score={stat.scoreAvg} /></td>
          <td class="text-sm">{formatSd(stat)}</td>
          <td class="text-center text-sm">{stat.rankAvg.toFixed(1)}</td>
          <td class="text-right text-sm">{stat.damageDealtToPlayersAvg.toFixed(0)}</td>
        </tr>
      {/each}
    </StatsTable>
  </div>
</div>
