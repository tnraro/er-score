<script lang="ts">
  import { goto } from "$app/navigation";
  import LL from "$i18n/i18n-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import NumericUpdown from "$lib/components/ui/numeric/numeric-updown.svelte";
  import Score from "$lib/features/score/score.svelte";
  import { MatchingMode } from "$lib/shared/er-api/shapes.js";
  import { cnBase } from "tailwind-variants";

  let { data } = $props();
</script>

<main class="mx-auto w-full max-w-250">
  <h2 class="font-bold">팀 조합 검색</h2>
  <dl class="grid grid-cols-[max-content_1fr] gap-x-4 text-xs">
    <dt>버전</dt>
    <dd>{data.version}</dd>
    <dt>모드</dt>
    <dd>{$LL.matchingMode[MatchingMode.Rank]()}</dd>
    {#if data.updatedAt != null}
      <dt>갱신 시각</dt>
      <dd>
        <time datetime={data.updatedAt.toISOString()}
          >{Intl.DateTimeFormat(data.locale, { dateStyle: "short", timeStyle: "short" }).format(
            data.updatedAt,
          )}</time
        >
      </dd>
    {/if}
  </dl>
  <div class="flex flex-wrap justify-center gap-8">
    <section>
      <h3 class="font-bold">실험체 선택기</h3>
      <div class="grid grid-cols-10 gap-2">
        {#each Array.from({ length: 82 }, (_, i) => i + 1) as characterId}
          {@const active = data.characters.includes(characterId)}
          <Button
            variant="secondary"
            class={cnBase("size-8 active:[&>img]:opacity-80", {
              "bg-yellow-300 active:bg-yellow-400": active,
            })}
            onclick={() => {
              const params = new URLSearchParams(location.search);
              const id = characterId as unknown as string;
              if (active) {
                params.delete("character", id);
              } else {
                params.append("character", id);
              }
              goto(`?${params.toString()}`);
            }}
          >
            <CharacterAvatar {characterId} rounded="md" />
          </Button>
        {/each}
      </div>
    </section>
    <section>
      <h3 class="font-bold">검색 결과</h3>
      <table class="border-separate border-spacing-x-4 border-spacing-y-2">
        <thead>
          <tr>
            <th>실험체 조합</th>
            <th>점수</th>
            <th>순위</th>
            <th>
              승률
              <div class="text-xs font-normal">(조정됨)</div>
            </th>
            <th>
              얻은 RP
              <div class="text-xs font-normal">(조정됨)</div>
            </th>
            <th>경기수</th>
          </tr>
        </thead>
        <tbody>
          {#if data.teamCompositions.length > 0}
            {#each data.teamCompositions as teamComposition (teamComposition.characters.join(","))}
              <tr>
                <td>
                  <div class="flex gap-x-1">
                    {#each data.characters.filter( (c) => data.characters.includes(c), ) as characterId}
                      <Button
                        variant="secondary"
                        class="size-8 bg-yellow-300 active:bg-yellow-400 active:[&>img]:opacity-80"
                        onclick={() => {
                          const params = new URLSearchParams(location.search);
                          params.delete("character", characterId as unknown as string);
                          goto(`?${params.toString()}`);
                        }}
                      >
                        <CharacterAvatar {characterId} rounded="md" />
                      </Button>
                    {/each}
                    {#each teamComposition.characters.filter((c) => !data.characters.includes(c)) as characterId}
                      <Button
                        variant="secondary"
                        class="size-8 active:[&>img]:opacity-80"
                        onclick={() => {
                          const params = new URLSearchParams(location.search);
                          params.append("character", characterId as unknown as string);
                          goto(`?${params.toString()}`);
                        }}
                      >
                        <CharacterAvatar {characterId} rounded="md" />
                      </Button>
                    {/each}
                  </div>
                </td>
                <td class="text-right">
                  <Score score={teamComposition.score} />
                </td>
                <td class="text-right">{teamComposition.rpGainRank}위</td>
                <td
                  class={cnBase("text-right", {
                    "text-green-600": teamComposition.avgHalfRate > 0.75,
                    "text-red-600": teamComposition.avgHalfRate < 0.5,
                  })}>{(teamComposition.avgHalfRate * 100) | 0}%</td
                >
                <td class="text-right">
                  <NumericUpdown
                    class="justify-end"
                    value={teamComposition.avgRpGain}
                    render={(x) => `${x.toFixed(1)}RP`}
                  />
                </td>
                <td
                  class={cnBase("text-right", {
                    "text-gray-400": teamComposition.count === 5,
                  })}>{teamComposition.count}경기</td
                >
              </tr>
            {/each}
          {:else}
            <tr>
              <td colspan="6" class="p-4 text-center text-gray-500">검색 결과가 없습니다.</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </section>
  </div>
</main>
