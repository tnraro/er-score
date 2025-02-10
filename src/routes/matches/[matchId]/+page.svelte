<script lang="ts">
  import { page } from "$app/state";
  import { LL, locale } from "$i18n/i18n-svelte";
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import Delimiter from "$lib/components/ui/delimiter/delimiter.svelte";
  import ErItem from "$lib/components/ui/er/er-item.svelte";
  import Numeric from "$lib/components/ui/numeric/numeric.svelte";
  import PreMadeTeam from "$lib/components/ui/pre-made-team/pre-made-team.svelte";
  import ProgressRange from "$lib/components/ui/progress/progress-range.svelte";
  import Progress from "$lib/components/ui/progress/progress.svelte";
  import SearchForm from "$lib/components/ui/search-form/search-form.svelte";
  import { MatchingMode } from "$lib/features/er-api/shapes.js";
  import Score from "$lib/features/score/score.svelte";
  import Rank from "$lib/features/user-records/rank.svelte";
  import UserRecord from "$lib/features/user-records/user-record.svelte";
  import { groupBy } from "$lib/utils/map/group-by.js";
  import { formatNumber } from "$lib/utils/number/format-number.js";
  import { formatRelativeTime } from "$lib/utils/time/format-relative-time.js";

  let { data } = $props();

  let myName = $derived(page.url.searchParams.get("me"));
  let teams = $derived(
    groupBy(
      data.match.records
        .slice()
        .sort((a, b) => b.score - a.score)
        .sort((a, b) => a.rank - b.rank),
      (record) => record.rank,
    ),
  );
  let maxTotalTime = $derived(Math.max(...data.match.records.map((r) => r.totalTime)));
  let endedAt = $derived(new Date(data.match.startedAt.getTime() + maxTotalTime));

  let time = $derived(formatRelativeTime(endedAt, $locale));

  let maxDamageDealtToPlayers = $derived(
    Math.max(...data.match.records.map((r) => r.damageDealtToPlayers)),
  );
  let maxDamageTakenFromPlayers = $derived(
    Math.max(...data.match.records.map((r) => r.damageTakenFromPlayers)),
  );
  let maxHealingAmount = $derived(Math.max(...data.match.records.map((r) => r.healingAmount)));
</script>

<div class="bg-yellow-50 text-center">WIP</div>
<div class="grid place-items-center py-8">
  <SearchForm username={myName} />
</div>

<main class="container mx-auto space-y-8">
  <div class="flex items-baseline text-sm">
    <span class="text-gray-500">
      {$LL.matchingMode[data.match.mode as MatchingMode]()}
      ·
      {time}
      ·
      {endedAt.toLocaleString($locale)}
    </span>
    <span class="flex-1"></span>
    <span>
      <span class="select-none">ID:</span>
      <span>{data.match.matchId}</span>
    </span>
  </div>
  <UserRecord class="sticky top-0 mb-2 flex-wrap border-b bg-white py-2">
    <div class="w-8 text-center text-sm font-bold">
      {data.match.mode === MatchingMode.Cobalt
        ? $LL.userRecords.heading.winLose()
        : $LL.userRecords.heading.rank()}
    </div>
    <div class="w-8 text-center text-sm font-bold"></div>
    <div class="w-32 text-center text-sm font-bold">{$LL.userRecords.heading.name()}</div>
    <div class="w-10 text-center text-sm font-bold">{$LL.userRecords.heading.score()}</div>
    <div class="flex gap-x-2 text-sm">
      <Numeric bold>{$LL.userRecords.heading.k()}</Numeric>
      <Delimiter />
      <Numeric bold>{$LL.userRecords.heading.d()}</Numeric>
      <Delimiter />
      <Numeric bold>{$LL.userRecords.heading.a()}</Numeric>
    </div>
    <div class="flex items-center gap-x-[inherit]">
      <div class="w-[13.5rem] text-center text-sm font-bold">
        {$LL.userRecords.heading.equipments()}
      </div>
      <div class="w-12 text-center text-sm font-bold">
        {$LL.userRecords.heading.damageDealtToPlayers()}
      </div>
      <div class="w-12 text-center text-sm font-bold">
        {$LL.userRecords.heading.damageTakenFromPlayers()}
      </div>
      <div class="w-12 text-center text-sm font-bold">
        {$LL.userRecords.heading.healingAmount()}
      </div>
    </div>
  </UserRecord>
  <div class="flex flex-col gap-y-8">
    {#each teams as [rank, team] (rank)}
      <div class="flex flex-col gap-y-2">
        {#each team as record (record.userId)}
          <UserRecord class="flex-wrap gap-y-2" highlight={record.nickname === myName}>
            <Rank rank={record.rank} mode={data.match.mode} />
            <CharacterAvatar rounded="md" characterId={record.characterId} skin={record.skin} />
            <div class="flex w-32 items-center gap-x-2">
              <PreMadeTeam preMadeTeam={record.preMadeTeamSize} />
              <a
                class="overflow-hidden break-keep text-ellipsis whitespace-nowrap hover:text-blue-500 hover:underline"
                href="/{$locale}/users/{encodeURIComponent(record.nickname)}">{record.nickname}</a
              >
            </div>
            <Score score={record.score} />
            <div class="flex gap-x-2 text-sm">
              <Numeric>{record.kills}</Numeric>
              <Delimiter />
              <Numeric>{record.deaths}</Numeric>
              <Delimiter />
              <Numeric>{record.assists}</Numeric>
            </div>
            <div class="flex items-center gap-x-[inherit]">
              <div class="flex gap-1">
                <ErItem id={record.equipments[0]} size="sm" />
                <ErItem id={record.equipments[1]} size="sm" />
                <ErItem id={record.equipments[2]} size="sm" />
                <ErItem id={record.equipments[3]} size="sm" />
                <ErItem id={record.equipments[4]} size="sm" />
              </div>
              <div class="flex w-12 flex-col">
                <span class="text-right text-xs font-light"
                  >{formatNumber(record.damageDealtToPlayers)}</span
                >
                <Progress
                  class="overflow-hidden rounded-full"
                  value={record.damageDealtToPlayers}
                  max={maxDamageDealtToPlayers}
                >
                  <ProgressRange color="red" />
                </Progress>
              </div>
              <div class="flex w-12 flex-col">
                <span class="text-right text-xs font-light"
                  >{formatNumber(record.damageTakenFromPlayers)}</span
                >
                <Progress
                  class="overflow-hidden rounded-full"
                  value={record.damageTakenFromPlayers}
                  max={maxDamageTakenFromPlayers}
                >
                  <ProgressRange color="blue" />
                </Progress>
              </div>
              <div class="flex w-12 flex-col">
                <span class="text-right text-xs font-light"
                  >{formatNumber(record.healingAmount)}</span
                >
                <Progress
                  class=" overflow-hidden rounded-full"
                  value={record.healingAmount}
                  max={maxHealingAmount}
                >
                  <ProgressRange color="green" />
                </Progress>
              </div>
            </div>
          </UserRecord>
        {/each}
      </div>
    {/each}
  </div>
</main>
<footer class="h-lvh"></footer>
