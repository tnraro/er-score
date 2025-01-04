<script lang="ts">
  import Kad from "$lib/components/ui/kad/kad.svelte";
  import { Lmode } from "$lib/i18n/mode";
  import { Lrank } from "$lib/i18n/rank";
  import { cn } from "$lib/utils/cn";
  import { formatRelativeTime } from "$lib/utils/format-relative-time";
  import type { PageData } from "./$types";
  import UserRecord from "./user-record.svelte";
  import { recordVariants } from "./variants";

  type Props = { me: number } & PageData["matches"][0];
  let { me, records, mode, id, startedAt }: Props = $props();

  const { base } = recordVariants();

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
    <div class={cn(base(), "select-none hover:bg-transparent")}>
      <div class="w-8 text-center text-sm font-bold">{Lrank(mode)}</div>
      <div class="w-8 text-center text-sm font-bold"></div>
      <div class="w-32 text-center text-sm font-bold">이름</div>
      <div class="w-10 text-center text-sm font-bold">점수</div>
      <Kad class="font-bold" k="K" a="A" d="D"></Kad>
    </div>
    {#each sortedRecords as result (result.userId)}
      <UserRecord {...result} {mode} highlight={result.userId === me} />
    {/each}
  </div>
  <!-- <div class="flex-1"></div>
  <Button variant="secondary">자세히</Button> -->
</div>
