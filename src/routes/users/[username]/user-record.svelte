<script lang="ts">
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import Kad from "$lib/components/ui/kad/kad.svelte";
  import PreMadeTeam from "$lib/components/ui/pre-made-team/pre-made-team.svelte";
  import Rank from "$lib/components/ui/rank/rank.svelte";
  import Score from "$lib/components/ui/score/score.svelte";
  import type { PageData } from "./$types";
  import { recordVariants } from "./variants";

  type Props = { mode: number; highlight: boolean } & PageData["matches"][0]["records"][0];
  let { score, rank, data, mode, highlight }: Props = $props();

  let { base } = $derived(recordVariants({ variant: highlight ? "highlight" : "default" }));
</script>

<div class={base()}>
  <Rank {rank} {mode} />
  <CharacterAvatar rounded="md" characterId={data.characterId} skin={data.skin} />
  <div class="flex w-32 items-center gap-x-2">
    <PreMadeTeam preMadeTeam={data.preMade} />
    <a
      class="overflow-hidden text-ellipsis whitespace-nowrap break-keep hover:text-blue-500 hover:underline"
      href="/users/{encodeURIComponent(data.nickname)}">{data.nickname}</a
    >
  </div>
  <Score {score} />
  <Kad k={data.k} a={data.a} d={data.d} />
</div>
