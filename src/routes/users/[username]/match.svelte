<script lang="ts">
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import Kad from "$lib/components/ui/kad/kad.svelte";
  import PreMadeTeam from "$lib/components/ui/pre-made-team/pre-made-team.svelte";
  import Rank from "$lib/components/ui/rank/rank.svelte";
  import Score from "$lib/components/ui/score/score.svelte";
  import UserRecord from "$lib/components/ui/user-record/user-record.svelte";
  import { Lmode } from "$lib/i18n/mode";
  import { Lrank } from "$lib/i18n/rank";
  import { makeArray } from "$lib/utils/array/make-array";
  import { formatRelativeTime } from "$lib/utils/time/format-relative-time";
  import type { PageData } from "./$types";

  type Props = { me: number } & PageData["matches"][0];
  let { me, records, mode, teamSize, id, startedAt }: Props = $props();

  let sortedRecords = $derived(records.slice().sort((a, b) => b.score - a.score));

  let myRecord = $derived(records.find((record) => record.userId === me)!);

  let endedAt = $derived(new Date(startedAt.getTime() + myRecord.data.totalTime));

  let time = $derived(formatRelativeTime(endedAt, "ko"));

  let _mode = $derived(Lmode(mode));
</script>

<div class="flex flex-col gap-y-4 rounded-2xl border p-4 shadow-sm">
  <div class="flex items-baseline text-sm">
    <span class="text-zinc-500">
      {_mode}
      ·
      {time}
      ·
      {endedAt.toLocaleString()}
    </span>
    <span class="flex-1"></span>
    <span>
      <span class="select-none">ID:</span>
      <span>{id}</span>
    </span>
  </div>
  <div>
    <UserRecord class="select-none hover:bg-transparent">
      <div class="w-8 text-center text-sm font-bold">{Lrank(mode)}</div>
      <div class="w-8 text-center text-sm font-bold"></div>
      <div class="w-32 text-center text-sm font-bold">이름</div>
      <div class="w-10 text-center text-sm font-bold">점수</div>
      <Kad class="font-bold" k="K" a="A" d="D"></Kad>
    </UserRecord>
    {#each sortedRecords as result (result.userId)}
      <UserRecord highlight={result.userId === me}>
        <Rank rank={result.rank} {mode} />
        <CharacterAvatar
          rounded="md"
          characterId={result.data.characterId}
          skin={result.data.skin}
        />
        <div class="flex w-32 items-center gap-x-2">
          <PreMadeTeam preMadeTeam={result.data.preMade} />
          <a
            class="overflow-hidden text-ellipsis whitespace-nowrap break-keep hover:text-blue-500 hover:underline"
            href="/users/{encodeURIComponent(result.data.nickname)}">{result.data.nickname}</a
          >
        </div>
        <Score score={result.score} />
        <Kad k={result.data.k} a={result.data.a} d={result.data.d} />
      </UserRecord>
    {/each}
    {#if records.length < teamSize}
      {#each makeArray(teamSize - records.length) as _, i (i)}
        <UserRecord>
          <Rank rank={records[0].rank} {mode} />
          <CharacterAvatar rounded="md" characterId={0} />
          <div class="flex items-center text-zinc-500">정보 없음</div>
        </UserRecord>
      {/each}
    {/if}
  </div>
  <!-- <div class="flex-1"></div>
  <Button variant="secondary">자세히</Button> -->
</div>
