<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  let { preMadeTeam } = $props();
</script>

{#if preMadeTeam && preMadeTeam > 1}
  <span
    class="inline-block h-2 w-2 shrink-0 rounded-full bg-gray-300"
    title={$LL.userRecords.preMadeTeamSize({ n: preMadeTeam })}
  ></span>
{/if}
