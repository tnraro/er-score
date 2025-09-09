<script lang="ts">
  import { goto } from "$app/navigation";
  import LL from "$i18n/i18n-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import NumericUpdown from "$lib/components/ui/numeric/numeric-updown.svelte";
  import Score from "$lib/features/score/score.svelte";
  import { MatchingMode } from "$lib/shared/er-api/shapes.js";
  import { cnBase } from "tailwind-variants";
  import TeamCompositionCharacterAvatarButton from "./team-composition-character-avatar-button.svelte";

  let { data } = $props();
</script>

<main class="mx-auto w-full max-w-250">
  <h2 class="font-bold">팀 조합 검색</h2>
  <dl class="mb-8 grid grid-cols-[max-content_1fr] gap-x-4 text-xs">
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
      <h3 class="font-bold" id="character-picker">실험체 선택기</h3>
      <div class="grid grid-cols-10 gap-2">
        {#each Array.from({ length: 82 }, (_, i) => i + 1) as characterId}
          {@const active = data.characters.includes(characterId)}
          <TeamCompositionCharacterAvatarButton {characterId} {active} />
        {/each}
      </div>
    </section>
    <div class="flex flex-col gap-8">
      <section>
        <h3 class="font-bold">선택한 실험체 조합</h3>
        {#if data.characters.length > 0}
          <div class="flex gap-x-1">
            {#each data.characters as characterId}
              <TeamCompositionCharacterAvatarButton {characterId} active />
            {/each}
            <Button
              variant="secondary"
              onclick={() => {
                goto(`?`);
              }}>초기화</Button
            >
          </div>
        {:else}
          <p class="flex h-8 items-center text-gray-500">
            <a href="#character-picker">실험체 선택기</a>에서 실험체를 골라주세요
          </p>
        {/if}
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
                        <TeamCompositionCharacterAvatarButton {characterId} active />
                      {/each}
                      {#each teamComposition.characters.filter((c) => !data.characters.includes(c)) as characterId}
                        <TeamCompositionCharacterAvatarButton {characterId} />
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
  </div>
</main>
