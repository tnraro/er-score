<script lang="ts">
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import Score from "$lib/components/ui/score/score.svelte";
  import { Lmode } from "$lib/i18n/mode";
  import type { PageData } from "./$types";

  interface Props {
    stats: PageData["stats"];
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
</script>

<div class="mx-auto max-w-max space-y-4 rounded-xl border p-4 shadow-sm">
  <div class="flex items-center gap-x-2">
    <CharacterAvatar characterId={mostPlayedCharacterId ?? 0} />
    <h1 class="font-extrabold">{username}</h1>
  </div>
  <div>
    <h2 class="text-sm text-zinc-500">
      최근 14일간
      {#if playedMatches >= 100}
        (최대 100경기)
      {/if}
    </h2>
    <table class="border-separate border-spacing-x-4">
      <thead class="select-none">
        <tr class="text-sm">
          <th>모드</th>
          <th>횟수</th>
          <th></th>
          <th>점수</th>
          <th>기복</th>
          <th>평균 순위</th>
          <th>평균 딜</th>
        </tr>
      </thead>
      <tbody>
        {#each stats as stat (stat.mode)}
          <tr>
            <td class="text-sm">{Lmode(stat.mode!)}</td>
            <td class="text-center text-sm">{stat.count}</td>
            <td
              ><CharacterAvatar
                characterId={stat.mostPlayedCharacterId}
                size="sm"
                rounded="md"
              /></td
            >
            <td><Score score={stat.scoreAvg} /></td>
            <td class="text-sm">{formatSd(stat)}</td>
            <td class="text-center text-sm">{stat.rankAvg.toFixed(1)}</td>
            <td class="text-right text-sm">{stat.damageToPlayerAvg.toFixed(0)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
