<script lang="ts">
  import { locale } from "$i18n/i18n-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { cnBase } from "tailwind-variants";
  import Score from "../score/score.svelte";

  interface Props {
    version: string;
    characters: number[];
  }
  let { version, characters }: Props = $props();

  let s = $state("idle");
  let data = $state<{
    score: number;
    avgHalfRate: number;
  } | null>(null);
  let error = $state<string | null>(null);

  let searchParams = $derived(
    `?version=${version}&${characters.map((characterId) => `character=${characterId}`).join("&")}`,
  );
</script>

{#if s === "idle"}
  <Button
    variant="secondary"
    onclick={async () => {
      s = "pending";
      try {
        const res = await fetch(`/api/team-compositions${searchParams}`);
        if (!res.ok) throw res;
        data = await res.json();
      } catch {
        error = "에러 발생";
      } finally {
        s = "done";
      }
    }}>팀 조합 확인</Button
  >
{:else if s === "pending"}
  <p class="h-8 border px-2">불러오는 중...</p>
{:else if error != null}
  <p class="h-8 border px-2">{error}</p>
{:else if data != null}
  <div class="flex h-8 items-center justify-between gap-x-4 rounded-md border px-2">
    <div class="font-bold">팀 조합 통계</div>
    <dl class="flex items-center gap-x-2">
      <dt class="text-sm">팀 점수</dt>
      <dd>
        <Score score={data.score} />
      </dd>
      <dt class="text-sm">팀 승률</dt>
      <dd
        class={cnBase("text-right", {
          "text-green-600": data.avgHalfRate > 0.75,
          "text-red-600": data.avgHalfRate < 0.5,
        })}
      >
        {(data.avgHalfRate * 100) | 0}%
      </dd>
    </dl>
    <a class="underline" href="/{$locale}/stats/team-compositions{searchParams}">통계로 이동</a>
  </div>
{/if}
