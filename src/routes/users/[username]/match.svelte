<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import Delimiter from "$lib/components/ui/delimiter/delimiter.svelte";
  import Numeric from "$lib/components/ui/numeric/numeric.svelte";
  import PreMadeTeam from "$lib/components/ui/pre-made-team/pre-made-team.svelte";
  import Score from "$lib/features/score/score.svelte";
  import Rank from "$lib/features/user-records/rank.svelte";
  import UserRecord from "$lib/features/user-records/user-record.svelte";
  import { Lmode } from "$lib/i18n/mode";
  import { Lrank } from "$lib/i18n/rank";
  import { makeArray } from "$lib/utils/array/make-array";
  import { formatRelativeTime } from "$lib/utils/time/format-relative-time";
  import type { PageData } from "./$types";

  type Props = { me: { id: number; name: string } } & PageData["matches"][0];
  let { me, records, mode, teamSize, matchId, startedAt }: Props = $props();

  let sortedRecords = $derived(records.slice().sort((a, b) => b.score - a.score));

  let myRecord = $derived(records.find((record) => record.userId === me.id)!);

  let endedAt = $derived(new Date(startedAt.getTime() + myRecord.totalTime));

  let time = $derived(formatRelativeTime(endedAt, "ko"));

  let _mode = $derived(Lmode(mode));
</script>

<div class="flex flex-col gap-y-4 rounded-2xl bg-white p-4">
  <div class="flex items-baseline text-sm">
    <span class="text-gray-500">
      {_mode}
      ·
      {time}
      ·
      {endedAt.toLocaleString()}
    </span>
    <span class="flex-1"></span>
    <span>
      <span class="select-none">ID:</span>
      <span>{matchId}</span>
    </span>
  </div>
  <div class="flex flex-col gap-y-1">
    <UserRecord class="select-none hover:bg-transparent">
      <div class="w-8 text-center text-sm font-bold">{Lrank(mode)}</div>
      <div class="w-8 text-center text-sm font-bold"></div>
      <div class="w-32 text-center text-sm font-bold">이름</div>
      <div class="w-10 text-center text-sm font-bold">점수</div>
      <div class="flex gap-x-2 text-sm">
        <Numeric bold>K</Numeric>
        <Delimiter />
        <Numeric bold>D</Numeric>
        <Delimiter />
        <Numeric bold>A</Numeric>
      </div>
    </UserRecord>
    {#each sortedRecords as result (result.userId)}
      <UserRecord highlight={result.userId === me.id}>
        <Rank rank={result.rank} {mode} />
        <CharacterAvatar rounded="md" characterId={result.characterId} skin={result.skin} />
        <div class="flex w-32 items-center gap-x-2">
          <PreMadeTeam preMadeTeam={result.preMadeTeamSize} />
          <a
            class="overflow-hidden break-keep text-ellipsis whitespace-nowrap hover:text-blue-500 hover:underline"
            href="/users/{encodeURIComponent(result.nickname)}">{result.nickname}</a
          >
        </div>
        <Score score={result.score} />
        <div class="flex gap-x-2 text-sm">
          <Numeric>{result.kills}</Numeric>
          <Delimiter />
          <Numeric>{result.deaths}</Numeric>
          <Delimiter />
          <Numeric>{result.assists}</Numeric>
        </div>
      </UserRecord>
    {/each}
    {#if records.length < teamSize}
      {#each makeArray(teamSize - records.length) as _, i (i)}
        <UserRecord>
          <Rank rank={records[0].rank} {mode} />
          <CharacterAvatar rounded="md" characterId={0} />
          <div class="flex items-center text-gray-500">정보 없음</div>
        </UserRecord>
      {/each}
    {/if}
  </div>
  <div class="-mt-4 flex-1"></div>
  <Button
    variant="secondary"
    onclick={() => {
      goto(`/matches/${matchId}?me=${encodeURIComponent(me.name)}`);
    }}>자세히</Button
  >
</div>
