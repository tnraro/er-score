<script>
  import CharacterAvatar from "$lib/components/ui/character-avatar/character-avatar.svelte";
  import Score from "$lib/components/ui/score/score.svelte";
  import TextSkeleton from "../skeleton/text-skeleton.svelte";
  import { style } from "./stats-style";
  import StatsTable from "./stats-table.svelte";

  const c = style();
</script>

<div class={c.container()}>
  <div class={c.header()}>
    <CharacterAvatar characterId={0} />
    <div class={c.headerName()}><TextSkeleton ch={7} /></div>
  </div>
  <div>
    <div class={c.tableLabel()}>최근 14일간</div>
    <StatsTable>
      {#each Array.from({ length: 2 }, (_, i) => i) as id (id)}
        <tr class={c.tableRow()}>
          <td><TextSkeleton size="sm" ch={2} /></td>
          <td><TextSkeleton size="sm" ch={2} align="center" /></td>
          <td><CharacterAvatar characterId={0} size="sm" rounded="md" /></td>
          <td><Score /></td>
          <td><TextSkeleton size="sm" ch={5} /></td>
          <td><TextSkeleton size="sm" ch={3} align="center" /></td>
          <td><TextSkeleton size="sm" ch={5} align="end" /></td>
        </tr>
      {/each}
    </StatsTable>
  </div>
</div>
