<script lang="ts">
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import { cnBase } from "tailwind-variants";
  import Score from "../score/score.svelte";

  interface Props {
    score: number;
    avgHalfRate: number;
    characters: number[];
    version: string;
  }
  let { score, avgHalfRate, characters, version }: Props = $props();
</script>

<a
  class="flex h-8 items-center justify-between gap-x-4 rounded-md border px-2 hover:bg-gray-50 active:bg-gray-100"
  href="/stats/team-compositions?version={version}&{characters
    .map((characterId) => `character=${characterId}`)
    .join('&')}"
>
  <div class="font-bold">팀 조합</div>
  <div class="flex gap-x-0.5">
    {#each characters as characterId}
      <CharacterAvatar {characterId} size="sm" rounded="md" />
    {/each}
  </div>
  <dl class="flex items-center gap-x-2">
    <dt class="text-sm">팀 점수</dt>
    <dd>
      <Score {score} />
    </dd>
    <dt class="text-sm">팀 승률</dt>
    <dd
      class={cnBase("text-right", {
        "text-green-600": avgHalfRate > 0.75,
        "text-red-600": avgHalfRate < 0.5,
      })}
    >
      {(avgHalfRate * 100) | 0}%
    </dd>
  </dl>
</a>
