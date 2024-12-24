<script lang="ts">
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import Kad from "$lib/components/ui/kad/kad.svelte";
  import Rank from "$lib/components/ui/rank/rank.svelte";
  import Score from "$lib/components/ui/score/score.svelte";
  import type { PageData } from "./$types";
  import { recordVariants } from "./variants";

  type Props = { highlight: boolean } & PageData["matches"][0]["results"][0];
  let { rank, score, skin, username, characterId, k, a, d, mode, highlight }: Props = $props();

  let { base, name } = $derived(recordVariants({ variant: highlight ? "highlight" : "default" }));
</script>

<div class={base()}>
  <Rank {rank} {mode} />
  <CharacterAvatar rounded="md" {characterId} {skin} />
  <a class={name()} href="/users/{encodeURIComponent(username)}">{username}</a>
  <Score {score} />
  <Kad {k} {a} {d} />
</div>
