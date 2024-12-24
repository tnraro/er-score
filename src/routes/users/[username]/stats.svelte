<script lang="ts">
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import Kad from "$lib/components/ui/kad/kad.svelte";
  import Score from "$lib/components/ui/score/score.svelte";
  import { MatchingMode } from "$lib/er-score";
  import { Lmode } from "$lib/i18n/mode";
  import { groupBy } from "$lib/utils/group-by";
  import type { PageData } from "./$types";

  interface Props {
    matches: PageData["matches"];
    username: string;
  }

  let { matches, username }: Props = $props();

  let myRecords = $derived(
    matches.map((game) => game.results.find((r) => r.username === username)!),
  );

  let mostPlayedCharacter = $derived.by(() => {
    const chars = [...groupBy(myRecords, (x) => x.characterId).values()].sort(
      (a, b) => b.length - a.length,
    )[0];
    const skinCode = [...groupBy(chars, (x) => x.skin).values()].sort(
      (a, b) => b.length - a.length,
    )[0]?.[0].skin;

    return {
      characterId: chars[0].characterId,
      skinCode,
    };
  });

  let stats = $derived.by(() => {
    const stats = myRecords.reduce(
      (acc, r) => {
        const agg = acc[r.mode as MatchingMode];

        agg.score += r.score;
        agg.rank += r.rank;
        agg.k += r.k;
        agg.a += r.a;
        agg.d += r.d;
        agg.count += 1;

        return acc;
      },
      {
        [MatchingMode.Cobalt]: {
          score: 0,
          rank: 0,
          k: 0,
          a: 0,
          d: 0,
          count: 0,
        },
        [MatchingMode.Normal]: {
          score: 0,
          rank: 0,
          k: 0,
          a: 0,
          d: 0,
          count: 0,
        },
        [MatchingMode.Rank]: {
          score: 0,
          rank: 0,
          k: 0,
          a: 0,
          d: 0,
          count: 0,
        },
      },
    );

    return Object.entries(stats)
      .map(([mode, agg]) => ({
        mode: Number(mode) as MatchingMode,
        score: agg.score / agg.count,
        rank: agg.rank / agg.count,
        k: agg.k / agg.count,
        a: agg.a / agg.count,
        d: agg.d / agg.count,
        count: agg.count,
      }))
      .filter((x) => x.count > 0)
      .sort((a, b) => b.count - a.count);
  });
</script>

<div class="mx-auto max-w-max space-y-4 rounded-xl border p-4 shadow-sm">
  <div class="flex items-center gap-x-2">
    <CharacterAvatar {...mostPlayedCharacter} />
    <h1 class="font-extrabold">{username}</h1>
  </div>
  <div>
    <h2 class="text-sm text-zinc-500">최근 {matches.length}판</h2>
    <table class="border-separate border-spacing-x-2">
      <thead class="select-none">
        <tr class="text-sm">
          <th>모드</th>
          <th>점수</th>
          <th><Kad k="K" a="A" d="D" valueStyle="w-7" /></th>
        </tr>
      </thead>
      <tbody>
        {#each stats as stat (stat.mode)}
          <tr>
            <td class="text-sm">{Lmode(stat.mode)}</td>
            <td> <Score score={stat.score} /></td>
            <td>
              <Kad
                k={stat.k.toFixed(1)}
                a={stat.a.toFixed(1)}
                d={stat.d.toFixed(1)}
                valueStyle="w-7"
              /></td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
